import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Dropzone from "react-dropzone";

const GiraffeNewForm = (props) => {
  const [formFields, setFormFields] = useState({
    name: "",
    description: "",
    image: "",
  });

  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [giraffeId, setGiraffeId] = useState(-1);

  const [errors, setErrors] = useState("");

  let errorsDiv = null;
  let photoUploaded = null;

  const handleChange = (event) => {
    setFormFields({
      ...formFields,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const handleFileUpload = (acceptedFiles) => {
    setFormFields({
      ...formFields,
      image: acceptedFiles[0],
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let body = new FormData();
    body.append("name", formFields.name);
    body.append("description", formFields.description);
    body.append("image", formFields.image);

    fetch("/api/v1/giraffes", {
      method: "POST",
      body: body,
      credentials: "same-origin",
      headers: {
        Accept: "application/json",
        Accept: "image/jpeg",
      },
    })
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
        if (body.id) {
          setGiraffeId(body.id);
          setShouldRedirect(true);
        } else if (body.errors) {
          setErrors(body.errors);
        } else {
          console.error("ERROR: Unexpected server response");
        }
      })
      .catch((error) => console.error(`Error in fetch: ${error.message}`));
  };

  if (shouldRedirect) {
    return <Redirect to={`/giraffes/${giraffeId}`} />;
  }

  if (errors !== "") {
    errorsDiv = (
      <div className="grid-x align-center">
        <div className="callout alert cell shrink">{errors}</div>
      </div>
    );
  }

  if (formFields.image != "") {
    photoUploaded = (
      <div className="grid-x align-center text-center">
        <h5 className="cell shrink">Photo Uploaded: {formFields.image.path}</h5>
      </div>
    );
  }

  return (
    <div className="grid-container">
      <form onSubmit={handleSubmit}>
        {errorsDiv}

        <div className="grid-x grid-margin-x align-middle">
          <label className="cell small-4 text-right" htmlFor="name">
            <h3>Name:</h3>
          </label>
          <input
            className="cell small-4 field"
            type="text"
            name="name"
            id="name"
            onChange={handleChange}
            value={formFields.name}
          />
        </div>
        <div className="grid-x grid-margin-x align-middle">
          <label className="cell small-4 text-right" htmlFor="description">
            <h3>Description:</h3>
          </label>
          <div className="cell small-4">
            <textarea
              id="description"
              name="description"
              onChange={handleChange}
              value={formFields.description}
            />
          </div>
        </div>
        <Dropzone onDrop={handleFileUpload}>
          {({ getRootProps, getInputProps }) => (
            <section className="grid-x shrink align-center text-center">
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <h5 id="drop-zone" className="cell callout">
                  Click here or drag 'n' drop to upload your long necked deer
                  photo
                </h5>
              </div>
            </section>
          )}
        </Dropzone>

        {photoUploaded}

        <div className="grid-x align-center">
          <input
            id="submit-giraffe"
            className="cell shrink button"
            type="submit"
            value="Add to the Herd"
          />
        </div>
      </form>
    </div>
  );
};

export default GiraffeNewForm;
