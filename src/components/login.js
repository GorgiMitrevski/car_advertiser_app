import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

function LogIn() {
  const navigate = useNavigate();

  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let [empty_fields, setEmptyFields] = useState(false);

  const onInputchange = event => { // handle inputs
    if(event.target.name == 'setEmail') {
      setEmail(event.target.value);
    } else {
      setPassword(event.target.value);
    }
  };

  const logIn = event => { // do login actions
    event.preventDefault();
    console.log('email: ', email);
    console.log('password: ', password);

    if ( email === "" || password === "" ) { // validation
      setEmptyFields(true);
      // TODO: set toaster "Marked fields are required"
      return;
    }
    
    // TODO: replace DUMMY data with data from DB
    // DUMMY test
    // get all users from DB
    let all_users = localStorage.getItem('all_users');
    if(!all_users) {
      // TODO: send toaster notification that user does not exist (table is empty)
      console.log('User with that email does not exist !');
      return;
    }

    let find_user_by_email = JSON.parse(all_users).find(el => el.email == email);

    if(find_user_by_email == null) {
      // TODO: send toaster notification that user does not exist (table is empty)
      console.log('User with that email does not exist !');
      return;
    }
    
    if(find_user_by_email.password != password) {
      // TODO: set toaster notification that password do not match
      console.log('Password does not match with that email !');
      return;
    }

    localStorage.setItem( 'current_user', JSON.stringify(email) );

    // user successfully logged in - navigate to /dashboard
    navigate('/dashboard');
    // TODO: set toaster notification successfully logged in
    
    setEmptyFields(false);
    return;
  };

  return (
    <div>
      <form onSubmit={logIn}>
        <h2> Login </h2>
        <div className="form-fields-labels-wrapper">
          <div className="form-group-wrapper">
            <label> Email: </label>
            <input name="setEmail" type="email" placeholder="Enter your email"
              className={email === '' && empty_fields ? "border-error" : ""}
              value={email}
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
