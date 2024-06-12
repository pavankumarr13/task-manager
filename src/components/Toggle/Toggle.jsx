import React from "react";
import "./Toggle.css";

const Toggle = ({ onOptionsChange, selected }) => {
  return (
    <div className="hidden md:flex gap-3  ">
      <label className="radio-button">
        <input
          type="radio"
          name="example-radio"
          value="list"
          checked={selected === "list"}
          onChange={onOptionsChange}
        />
        <span className="radio"></span>
        List View
      </label>

      <label className="radio-button">
        <input
          type="radio"
          name="example-radio"
          value="board"
          checked={selected === "board"}
          onChange={onOptionsChange}
        />
        <span className="radio"></span>
        Board View
      </label>
    </div>
  );
};

export default Toggle;
