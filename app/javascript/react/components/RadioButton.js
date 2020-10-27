import React from "react";

const RadioButton = (props) => {
  return (
    <div className={props.className}>
      <label>
        <input
          type="radio"
          value={props.value}
          name={props.name}
          onChange={props.handleFieldChange}
          checked={props.state === props.value}
        />
        {props.value}
      </label>
    </div>
  );
};

export default RadioButton;
