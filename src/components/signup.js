import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();

  let [name, setName] = useState('');
  let [username, setUsername] = useState('');
  let [password, setPassword] = useState('');
  let [email, setEmail] = useState('');
  let [empty_fields, setEmptyFields] = useState(false);

  const onInputChange = event => { // handle inputs
    if(event.target.name == 'setEmail') {
      setEmail(event.target.value);
    } else if(event.target.name == 'setUsername') {
      setUsername(event.target.value);
    } else if(event.target.name == 'setPassword') {
      setPassword(event.target.value);
    } else {
      setName(event.target.value);
    }
  };


  const signUp = (event) => { // do signup actions
    event.preventDefault();
    
    if ( email === "" || username === "" || password === "" || name === "" ) { // validation
      setEmptyFields(true);
      // toast.error("Marked fields are required!");
      return;
    }

    let new_user = { name: name, username: username, email: email, password: password};

    axios({
      url: "http://localhost:8080/signup",
      method: "POST",
      // headers: {
        // authorization: `Bearer ${token}`,
      // },
      data: new_user
    }).then(res => {
      axios({
        url: "http://localhost:8080/authenticate",
        method: "POST",
        data: {
          username: username,
          password: password
        }
      }).then(res_authenticate => {
        if(res_authenticate.status = 200) {
          localStorage.setItem('token', JSON.stringify(res_authenticate.data.token));
          // toast.success("User successfully signed up");
          navigate('/login', { replace: true });
        } else {
          console.log('error - something is wrong');
        }
      })
    })

    setEmptyFields(false);
  };

  return (
    <div>
      <form onSubmit={signUp}>
        <h2> Sign Up </h2>
        <div className="form-fields-labels-wrapper">
          
          <div className="form-group-wrapper">
            <label> Name: </label>
            <input name="setName" type="text" placeholder="Enter your name"
              className={name === '' && empty_fields ? "border-error" : ""}
              value={name}
              onChange={onInputChange}
            />
          </div>
          
          <div className="form-group-wrapper">
            <label> Username: </label>
            <input name="setUsername" type="text" placeholder="Enter your username"
              className={username === '' && empty_fields ? "border-error" : ""}
              value={username}
              onChange={onInputChange}
            />
          </div>
          
          <div className="form-group-wrapper">
            <label> Email: </label>
            <input name="setEmail" type="email" placeholder="Enter your email"
              className={email === '' && empty_fields ? "border-error" : ""}
              value={email}
              onChange={onInputChange}
            />
          </div>
          
          <div className="form-group-wrapper">
            <label > Password: </label>
            <input name="setPassword" type="password" placeholder="Enter your password"
              className={password === '' && empty_fields ? "border-error" : ""}
              value={password}
              onChange={onInputChange}
            />
          </div>
          
          <button type="submit" className="custom-btn"> Signup </button>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
