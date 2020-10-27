import React from "react";
import RadioButton from "./RadioButton";

const RatingRadioGroup = (props) => {
  const radioGroup = [..."12345"].map((num) => {
    return (
      <RadioButton
        key={num}
        className="cell small-2"
        name="rating"
        value={num}
        handleFieldChange={props.handleFieldChange}
        state={props.state}
      />
    );
  });

  return <>{radioGroup}</>;
};

export default RatingRadioGroup;
