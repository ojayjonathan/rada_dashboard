import { Content } from "../../../utils/constants";

export class Editor {
  content = [];
  metadata = {};

  /**
   *
   * @param {title:String,bodyContent: String,type: String } data
   */
  appendData(data) {
    if (data.type === Content.List) {
      const listContent = data.bodyContent.trim().split("\n");
      this.content.push({ ...data, bodyContent: listContent });
    } else {
      this.content.push({ ...data, bodyContent: [data.bodyContent] });
    }
    console.log(this.content);
  }

  generateFinalContent() {
    return {
      metadata: this.metadata,
      content: this.content,
    };
  }
}
