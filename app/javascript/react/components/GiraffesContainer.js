import React, { useState, useEffect } from "react";
import GiraffeIndexTile from "./GiraffeIndexTile";

const GiraffesContainer = (props) => {
  const [giraffes, setGiraffes] = useState([]);

  useEffect(() => {
    fetch("/api/v1/giraffes")
      .then((response) => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
            error = new Error(errorMessage);
          throw error;
        }
      })
      .then((response) => response.json())
      .then((body) => {
        setGiraffes(body);
      })
      .catch((error) => console.error(`Error in fetch: ${error.message}`));
  }, []);

  const giraffeList = giraffes.map((giraffeObject) => {
    return <GiraffeIndexTile key={giraffeObject.id} data={giraffeObject} />;
  });

  return (
    <div className="grid-container">
      <div className="grid-x">{giraffeList}</div>
    </div>
  );
};

export default GiraffesContainer;
