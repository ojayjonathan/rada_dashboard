import { Content } from "../../../utils/constants";

export class Editor {
  content = [];

  // metadata -  title, category,thumbnail
  metadata = {};

  /**
   *
   * @param {title:String,bodyContent: String,type: String } data
   */
  isEditorValid() {
    if (this.content.length == 0 || !this.metadata.thumbnail) return false;
    if (!this.metadata.thumbnail) return false;
    if (!this.metadata.title) return false;
    return true;
  }
  appendData(data) {
    if (data.type === Content.List) {
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
  generateFormData() {
    const form = new FormData();
    this.content = this.content.map((contentItem) => {
      let _content = contentItem;
      //Add all images to the form
      if (contentItem.type === Content.Img) {
        const file = _content.bodyContent[0];
        form.append(file.name, file, file.name);
        _content.bodyContent = [file.name];
      }
      return _content;
    });
    let _metadata = {
      title: this.metadata.title,
      category: this.metadata.category,
    };
    console.log(
      "----gdjhdhf----",
      JSON.stringify({
        content: this.content,
        metadata: _metadata,
      })
    );
    form.append(
      "data",
      JSON.stringify({
        content: this.content,
        metadata: _metadata,
      })
    );
    form.append(
      "thumbnail",
      this.metadata.thumbnail,
      this.metadata.thumbnail.name
    );
    return form;
  }
}
