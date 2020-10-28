import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Dropzone from 'react-dropzone'

const GiraffeNewForm = (props) => {
  const [formFields, setFormFields] = useState({
    name: "",
    description: "",
    image: ""
  });

  const [shouldRedirect, setShouldRedirect] = useState(false);

  const [errors, setErrors] = useState("");

  let errorsDiv = null;

  const handleChange = (event) => {
    setFormFields({
      ...formFields,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const handleFileUpload = (acceptedFiles) => {
    setFormFields({
      ...formFields,
      image: acceptedFiles[0]
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    let body = new FormData()
    body.append("name", formFields.name)
    body.append("description", formFields.description)
    body.append("image", formFields.image)

    fetch("/api/v1/giraffes", {
      method: "POST",
      body: body, 
      credentials: "same-origin",
      headers: {
        "Accept": "application/json",
        "Accept": "image/jpeg"
      }
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
    return <Redirect to="/" />;
  }

  if (errors !== "") {
    errorsDiv = (
      <div className="grid-x align-center">
        <div className="callout alert cell shrink">{errors}</div>
      </div>
    );
  }

  return (
    <div className="grid-container">
      <form onSubmit={handleSubmit}>
        {errorsDiv}

        <div className="grid-x grid-margin-x align-middle">
          <label className="cell small-4 text-right" htmlFor="name">
            Name:
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
            Description:
          </label>
          <input
            className="cell small-4 field"
            type="text"
            name="description"
            id="description"
            onChange={handleChange}
            value={formFields.description}
          />
        </div>
        <Dropzone onDrop={handleFileUpload}>
          {({getRootProps, getInputProps}) => (
            <section className="text-center">
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop your long necked deer</p>
              </div>
            </section>
          )}
        </Dropzone>

        <div className="grid-x align-center">
          <input
            className="cell shrink"
            type="submit"
            value="Add to the Herd"
          />
        </div>
      </form>
    </div>
  );
};

export default GiraffeNewForm;
