import React, { useState } from "react"

const GiraffeNewForm = (props) => {
  const [formFields, setFormFields] = useState({
    name: "",
    description: "",
  })

  const handleChange = (event) => {
    setFormFields({
      ...formFields, 
      [event.currentTarget.name]: event.currentTarget.value
    })
  }
  const onSubmit = (event) => {
    event.preventDefault()

  }




  return (
    <div>
        <form>
            <div>
              <label htmlFor="name"> Name: </label>
              <label htmlFor="description"> Description: </label>
            </div> 
            <div>
              <input type="text" 
                name="name" id="name" onChange = {handleChange} value = {formFields.name}/>
              <input type="text" name="description" id="description" onChange = {handleChange} value = {formFields.description}/>
            </div>

            <input type="submit" value ="Add to the Herd"/> 

        </form>

    </div>
  );
};

export default GiraffeNewForm;

