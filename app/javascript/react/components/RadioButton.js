import React from "react";

const RadioButton = (props) => {
  return (
    <div className={props.className}>
      <label className="grid-x align-middle">
        <input
          className="cell shrink radio"
          type="radio"
          value={props.value}
          name={props.name}
          onChange={props.handleFieldChange}
          checked={props.state === props.value}
        />
        <h5 className="cell shrink">{props.value}</h5>
      </label>
    </div>
  );
};

export default RadioButton;
