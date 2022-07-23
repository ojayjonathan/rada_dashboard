import { Content, ContentMetadata, ContentType } from "../../../types/types";

export class EditorData {
  content: Content = [];

  metadata: Partial<ContentMetadata> = {};
  constructor(metadata: Partial<ContentMetadata> = {}, content:Content = []) {
    this.content = content;
    this.metadata = metadata;
  }

 
  isEditorValid() {
    if (this.content.length === 0 || !this.metadata.thumbnail) return false;
    if (!this.metadata.thumbnail) return false;
    if (!this.metadata.title) return false;
    return true;
  }
  appendData(data: any) {
    if (data.type === ContentType.List) {
      const listContent = data.bodyContent.trim().split("\n");
      this.content.push({ ...data, bodyContent: listContent });
    } else {
      this.content.push({ ...data, bodyContent: [data.bodyContent] });
    }
  }

  generateFinalContent() {
    return {
      metadata: this.metadata,
      content: this.content,
    };
  }
  generateFormData = async () => {
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

    for (let i = 0; i < this.content.length; ++i) {
      let _contentItem = this.content[i];
      //Add all images to the form
      if (_contentItem.insert.image) {
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
      } else {
        content_.push(_contentItem);
      }
    }
    let _metadata = {
      title: this.metadata.title,
      category: this.metadata.category,
    };

    form.append(
      "data",
      JSON.stringify({
        content: content_,
        metadata: _metadata,
      })
    );
    form.append(
      "thumbnail",
      this.metadata.thumbnail,
      this.metadata.thumbnail.name
    );
    return form;
  };
}
