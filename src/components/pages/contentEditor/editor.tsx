import { Content, ContentMetadata } from "../../../types/types";

export const generateFormData = async ({
  content,
  metadata,
  ...others
}: {
  content: Content;
  metadata: ContentMetadata;
  [key: string]: any;
}) => {
  const rand_ = () => {
    let s = "";
    const c = "FGHYJTGKUIILUKYTJXCVKBLUKLrft6OIUY";
    for (let i = 0; i < 5; ++i) {
      s += c[Math.floor(Math.random() * c.length)];
    }
    return s;
  };

  const form = new FormData();
  let content_ = [];

  for (let i = 0; i < content.length; ++i) {
    let _contentItem = content[i];
    //Add all images to the form
    if (_contentItem.insert.image) {
      try {
        let blob: any;
        await fetch(_contentItem.insert.image)
          .then((res) => {
            return res.blob();
          })
          .then((blob_) => {
            blob = blob_;
          });

        const file = new File([blob], `${rand_()}.jpg`, { type: blob.type });
        form.append(file.name, file, file.name);
        content_.push({
          insert: {
            image: file.name,
          },
        });
      } catch (e) {
        content_.push(_contentItem);
      }
    } else {
      content_.push(_contentItem);
    }
  }
  let _metadata = {
    title: metadata.title,
    category: metadata.category,
  };

  form.append(
    "data",
    JSON.stringify({
      content: content_,
      metadata: _metadata,
    })
  );

  if (metadata.thumbnail instanceof File) {
    form.append("thumbnail", metadata.thumbnail, metadata.thumbnail.name);
  }
  for (const key in others) {
    form.append(key, others[key]);
  }
  return form;
};
