import React from "react";
import GiraffeNewForm from "./GiraffeNewForm";

const GiraffeNewPage = (props) => {
  return (
    <div className="cell auto page">
      <h1 className="text-center"> Add a New Giraffe </h1>
      <GiraffeNewForm />
    </div>
  );
};

export default GiraffeNewPage;
