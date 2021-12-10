import React from "react";
import { Content } from "../../utils/constants";

function InputBox({ type, name, onChange, title }) {
  const inputType = type === Content.Img ? "file" : "text";
  return (
    <div className="mb-3">
      <label className="form-label" id="label">
        {title}
      </label>
      {type !== Content.Text && type !== Content.List ? (
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
}

export default InputBox;
