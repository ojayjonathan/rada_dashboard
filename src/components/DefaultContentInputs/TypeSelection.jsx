import React from "react";
import { Content } from "../../utils/constants";

function TypeSelection({ onChange }) {
  return (
    <div className="mb-3">
      <label className="form-label" id="label">
        Content Type
      </label>
      <select className="form-select" name="type" id="type" onChange={onChange}>
        <option value={Content.Text}>Text</option>
        <option value={Content.Img}>Image</option>
        <option value={Content.List}>List</option>
      </select>
    </div>
  );
}

export default TypeSelection;
