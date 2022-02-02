import React, { useState, useEffect } from 'react';
import axios from "axios";
import { toast } from "react-toastify";

function AddCarModal(props) {

  let [manufacturer, setManufacturer] = useState('BMW');
  let [model, setModel] = useState('');
  let [description, setDescription] = useState('');
  let [price, setPrice] = useState('');
  let [email, setEmail] = useState('');
  let [empty_fields, setEmptyFields] = useState(false);

  useEffect(() => {
    if(props.current_car_for_update) {
      setManufacturer(props.current_car_for_update.manufacturer);
      setModel(props.current_car_for_update.model);
      setDescription(props.current_car_for_update.description);
      setPrice(props.current_car_for_update.price);
      setEmail(props.current_car_for_update.email);
    }
  }, []);

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
        toast.error("Marked fields are required");
        return;
      }

      // check if it is for updating car or adding new car
      let user_name = localStorage.getItem('current_username');
      let api_url = `http://localhost:8080/users/${user_name}/cars`;
      let method_type = 'POST';
      if(props.current_car_for_update) {
        api_url = `http://localhost:8080/users/${user_name}/cars/${props.current_car_for_update.id}`;
        method_type = 'PUT';
      }

      axios({
        url: api_url,
        method: method_type,
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
          if(props.current_car_for_update) {
            toast.success("Car successfully updated");
          } else {
            toast.success("Successfully posted new car");
          }
          setManufacturer('');
          setModel('');
          setDescription('');
          setPrice('');
          props.closeModal();
        } else {
          toast.error("Something went wrong, please try again");
        }
      })
      
      setEmptyFields(false);
  }

  return (
    <div className="modal">
      <div className="modal-body">
        <form onSubmit={addNewCar}>
          <h2> {props.current_car_for_update ? `Update car with id ${props.current_car_for_update.id}` : 'Add new car - post' } </h2>
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
              <textarea name="setDescription" className="description-text-area" rows="2" cols="20"
                className={description === '' && empty_fields ? "border-error" : ""}
                value={description}
                onChange={onInputchange}
              />
            </div>

            <div className="form-group-wrapper">
              <label > Email: </label>
              <input name="setEmail" type="email" placeholder="Enter contact email"
                value={email}
                onChange={onInputchange}
              />
            </div>
            
            <button type="button" className="custom-btn tab-btn" onClick={props.closeModal}> Cancel </button>
            <button type="submit" className="custom-btn"> {props.current_car_for_update ? 'Update car' : 'Add car'} </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddCarModal;

