import React, { HtmlHTMLAttributes } from "react";
import { ContentType } from "../../../types/types";
interface InputProps
  extends HtmlHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  type: ContentType;
  name: string;
}
const InputBox: React.FC<InputProps> = ({ type, name, onChange, title }) => {
  const inputType = type == ContentType.Img ? "file" : "text";
  return (
    <div className="mb-3">
      <label className="form-label" id="label">
        {title}
      </label>
      {type !== ContentType.Text && type !== ContentType.List ? (
        <input
          className="form-control"
          type={inputType}
          name={name}
          id={name}
          onChange={onChange}
          accept="image/png, image/jpeg,image/jpg"
        />
      ) : (
        <textarea
          rows={7}
          className="form-control"
          name={name}
          id={name}
          onChange={onChange}
        ></textarea>
      )}
    </div>
  );
};

export default InputBox;
