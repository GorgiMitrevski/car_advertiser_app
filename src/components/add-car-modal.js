import React, { useState } from 'react';
import axios from "axios";

function AddCarModal(props) {

  let [manufacturer, setManufacturer] = useState('BMW');
  let [model, setModel] = useState('');
  let [description, setDescription] = useState('');
  let [price, setPrice] = useState('');
  let [email, setEmail] = useState('');
  let [empty_fields, setEmptyFields] = useState(false);

  const onInputchange = event => { // handle inputs
    if(event.target.name == 'setManufacturer') {
      setManufacturer(event.target.value);
    } else if(event.target.name == 'setModel') {
      setModel(event.target.value);
    } else if(event.target.name == 'setDescription') {
      setDescription(event.target.value);
    } else if(event.target.name == 'setPrice') {
      setPrice(event.target.value);
    } else {
      setEmail(event.target.value);
    }
  };

  const addNewCar = event => {
      event.preventDefault();
  
      if ( manufacturer === "" || model === "" || description === "" || price === "" ) { // validation
        setEmptyFields(true);
        // toast.success("Marked fields are required!");
        console.log('empty fields');
        return;
      }
  
      let user_name = localStorage.getItem('current_username');
      axios({
        url: `http://localhost:8080/users/${user_name}/cars`,
        method: "POST",
        headers: {
          authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
        },
        data: {
          manufacturer: manufacturer,
          model: model,
          description: description,
          price: price,
          email: email,
          dateBuild: new Date()
        }
      }).then(res => {
        if(res.status = 200) {
          console.log('success posted new car');
          setManufacturer('');
          setModel('');
          setDescription('');
          setPrice('');
          props.closeModal();
        } else {
          console.log('error - something is wrong');
        }
      })
      
      setEmptyFields(false);
  }

  return (
    <div className="modal">
      <div className="modal-body">
        <form onSubmit={addNewCar}>
          <h2> Add new car - post </h2>
          <div className="form-fields-labels-wrapper">
            <div className="form-group-wrapper">
              <label> Manufacturer: </label>
              <select name="setManufacturer" value={manufacturer} onChange={onInputchange}>
                <option value="BMW"> BMW </option>
                <option value="PEUGEOT"> PEUGEOT </option>
                <option value="FIAT"> FIAT </option>
                <option value="KIA"> KIA </option>
                <option value="TOYOTA"> TOYOTA </option>
                <option value="CHEVROLET"> CHEVROLET </option>
              </select>
            </div>
            
            <div className="form-group-wrapper">
              <label > Model: </label>
              <input name="setModel" type="text" placeholder="Enter car model"
                className={model === '' && empty_fields ? "border-error" : ""}
                value={model}
                onChange={onInputchange}
              />
            </div>

            <div className="form-group-wrapper">
              <label > Price: </label>
              <input name="setPrice" type="text" placeholder="Enter car price"
                className={price === '' && empty_fields ? "border-error" : ""}
                value={price}
                onChange={onInputchange}
              />
            </div>

            <div className="form-group-wrapper">
              <label > Description: </label>
              <input name="setDescription" type="text" placeholder="Enter car description"
                className={description === '' && empty_fields ? "border-error" : ""}
                value={description}
                onChange={onInputchange}
              />
            </div>

            <div className="form-group-wrapper">
              <label > Email: </label>
              <input name="setEmail" type="text" placeholder="Enter contact email"
                className={email === '' && empty_fields ? "border-error" : ""}
                value={email}
                onChange={onInputchange}
              />
            </div>
            
            <button type="submit" className="custom-btn"> Add car </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddCarModal;

