import React, { useState } from 'react';

function SignUp() {

  let [email, setEmail] = useState('');
  let [username, setUsername] = useState('');
  let [password, setPassword] = useState('');
  let [password_confirm, setPasswordConfirm] = useState('');
  let [empty_fields, setEmptyFields] = useState(false);

  const onInputChange = event => { // handle inputs
    if(event.target.name == 'setEmail') {
      setEmail(event.target.value);
    } else if(event.target.name == 'setUsername') {
      setUsername(event.target.value);
    } else if(event.target.name == 'setPassword') {
      setPassword(event.target.value);
    } else {
      setPasswordConfirm(event.target.value);
    }
  };


  const signUp = (event) => { // do signup actions
    event.preventDefault();
    console.log('email: ', email);
    console.log('username: ', username);
    console.log('password: ', password);
    console.log('password_confirm: ', password_confirm);
    
    if ( email === "" || username === "" || password === "" || password_confirm === ""
    ) { // validation
      setEmptyFields(true);
      // toast.error("Marked fields are required!");
      return;
    }

    // TODO: replace DUMMY data with data from DB ---- do API call and after success navigate user to DASHBOARD
    // DUMMY test
    let new_user = {email: email, username: username, password: password, password_confirm: password_confirm};

    let db_users = localStorage.getItem('all_users');
    let all_users = db_users ? JSON.parse(db_users) : [];
    // console.log('all_users: ', JSON.parse(all_users));

    all_users.push(new_user);
    localStorage.setItem('all_users', JSON.stringify(all_users) );
    // end DUMMY test

    // toast.success("User successfully signed up");
    setEmptyFields(false);
  };

  return (
    <div>
      <form onSubmit={signUp}>
        <h2> Sign Up </h2>
        <div className="form-fields-labels-wrapper">
          <div className="form-group-wrapper">
            <label> Email: </label>
            <input name="setEmail" type="email" placeholder="Enter your email"
              className={email === '' && empty_fields ? "border-error" : ""}
              value={email}
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
            <label > Password: </label>
            <input name="setPassword" type="password" placeholder="Enter your password"
              className={password === '' && empty_fields ? "border-error" : ""}
              value={password}
              onChange={onInputChange}
            />
          </div>
          
          <div className="form-group-wrapper">
            <label> Confirm Password: </label>
            <input name="setPasswordConfirm" type="password" placeholder="Repeat your email"
              className={password_confirm === '' && empty_fields ? "border-error" : ""}
              value={password_confirm}
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
