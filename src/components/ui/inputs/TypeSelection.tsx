import { HtmlHTMLAttributes } from "react";
import { ContentType } from "../../../types/types";
interface Props extends HtmlHTMLAttributes<HTMLSelectElement> {}

function TypeSelection({ onChange }: Props) {
  return (
    <div className="mb-3">
      <label className="form-label" id="label">
        Content Type
      </label>
      <select className="form-select" name="type" id="type" onChange={onChange}>
        <option value={ContentType.Text}>Text</option>
        <option value={ContentType.Img}>Image</option>
        <option value={ContentType.List}>List</option>
      </select>
    </div>
  );
}

export default TypeSelection;
