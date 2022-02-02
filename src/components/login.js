import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';

function LogIn() {
  const navigate = useNavigate();

  let [username, setUsername] = useState('');
  let [password, setPassword] = useState('');
  let [empty_fields, setEmptyFields] = useState(false);

  const onInputchange = event => { // handle inputs
    if(event.target.name == 'setUsername') {
      setUsername(event.target.value);
    } else {
      setPassword(event.target.value);
    }
  };

  const logIn = event => { // do login actions
    event.preventDefault();

    if ( username === "" || password === "" ) { // validation
      setEmptyFields(true);
      toast.error("Market fields are required");
      return;
    }

    
    axios({
      url: "http://localhost:8080/authenticate",
      method: "POST",
      data: {
        username: username,
        password: password
      }
    }).then(res => {
      if(res.status = 200) {
        localStorage.setItem('token', JSON.stringify(res.data.token));
        localStorage.setItem('current_username', username);
        toast.success("Successfully logged in");
        navigate('/dashboard');
      } else {
        toast.error("Something went wrong, please try again");
      }
    }).catch(err => {
      toast.error("Invalid credentials");
    })
    
    setEmptyFields(false);
  };

  return (
    <div>
      <form onSubmit={logIn}>
        <h2> Login </h2>
        <div className="form-fields-labels-wrapper">
          <div className="form-group-wrapper">
            <label> Username: </label>
            <input name="setUsername" type="text" placeholder="Enter your username"
              className={username === '' && empty_fields ? "border-error" : ""}
              value={username}
              onChange={onInputchange}
            />
          </div>
          
          <div className="form-group-wrapper">
            <label > Password: </label>
            <input name="setPassword" type="password" placeholder="Enter your password"
              className={password === '' && empty_fields ? "border-error" : ""}
              value={password}
              onChange={onInputchange}
            />
          </div>
          
          <button type="submit" className="custom-btn"> Login </button>
        </div>
      </form>
    </div>
  );
}

export default LogIn;
