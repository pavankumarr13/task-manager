import React from "react";
import "./AddTaskInput.css";

const AddTaskInput = React.forwardRef(
  ({ title, name, type, placeholder, min, error, register }, ref) => {
    return (
      <div className="input-group">
        <label className="label">{title}</label>
        <input
          name={name}
          className="input"
          type={type}
          placeholder={placeholder}
          min={min}
          ref={ref}
          {...register}
          aria-invalid={error ? "true" : "false"}
        />
        {error && <p className="text-red-600">{error}</p>}
        <div></div>
      </div>
    );
  }
);

export default AddTaskInput;
