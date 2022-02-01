import React, { Component } from "react";

class LogIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user_login_fields: {
        email: '',
        password: ''
      },
      emptyFields: false
    };
  }

  onInputchange = (event) => { // handle inputs
    this.setState((prevState) => ({
      user_login_fields: {
        ...prevState.user_login_fields,
        [event.target.name]: event.target.value,
      }
    }));
  };

  logIn = (event) => { // do login actions
    if (
      this.state.user_login_fields.email === "" ||
      this.state.user_login_fields.password === ""
    ) { // validation
      this.setState({ emptyFields: true });
      // toast.error("Marked fields are required!");
      event.preventDefault();
      return;
    }

    // TODO: do API call for login to check if entered email and password match

    // toast.success("User successfully logged in!");
    this.setState({ emptyFields: false });
    event.preventDefault();
  };

  render() {
    return (
      <div>
        <form onSubmit={this.logIn}>
          <h2> Login </h2>
          <div className="form-fields-labels-wrapper">
            <div className="form-group-wrapper">
              <label> Email: </label>
              <input name="email" type="email" placeholder="Enter your email"
                className={this.state.user_login_fields.email === '' && this.state.emptyFields ? "border-error" : ""}
                value={this.state.user_login_fields.email}
                onChange={this.onInputchange}
              />
            </div>
            
            <div className="form-group-wrapper">
              <label > Password: </label>
              <input name="password" type="password" placeholder="Enter your password"
                className={this.state.user_login_fields.password === '' && this.state.emptyFields ? "border-error" : ""}
                value={this.state.user_login_fields.password}
                onChange={this.onInputchange}
              />
            </div>
            
            <button type="submit" className="custom-btn"> Login </button>
          </div>
        </form>
      </div>
    );
  }
}

export default LogIn;
