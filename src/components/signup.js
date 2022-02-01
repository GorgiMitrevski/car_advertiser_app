import React, { Component } from "react";

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user_signup_fields: {
        email: '',
        username: '',
        password: '',
        password_confirm: '',
      },
      emptyFields: false
    };
  }

  onInputchange = (event) => { // handle inputs
    this.setState((prevState) => ({
      user_signup_fields: {
        ...prevState.user_signup_fields,
        [event.target.name]: event.target.value,
      }
    }));
  };

  signUp = (event) => { // do signup actions
    if (
      this.state.user_signup_fields.email === "" ||
      this.state.user_signup_fields.username === "" ||
      this.state.user_signup_fields.password === "" ||
      this.state.user_signup_fields.password_confirm === ""
    ) { // validation
      this.setState({ emptyFields: true });
      // toast.error("Marked fields are required!");
      event.preventDefault();
      return;
    }

    // TODO: check if user with same email exists
    // for (let i = 0; i < this.props.projects.length; i++) {
      // if (this.props.projects[i].Name === this.state.user_signup_fields.Name) {
      //   toast.error("Project with same name already exists !");
      //   event.preventDefault();
      //   return;
      // }
    // }

    // TODO: do API call and after success navigate user to DASHBOARD

    // toast.success("User successfully signed up");
    this.setState({ emptyFields: false });
    event.preventDefault();
  };

  render() {
    return (
      <div>
        <form onSubmit={this.signUp}>
          <h2> Sign Up </h2>
          <div className="form-fields-labels-wrapper">
            <div className="form-group-wrapper">
              <label> Email: </label>
              <input name="email" type="email" placeholder="Enter your email"
                className={this.state.user_signup_fields.email === '' && this.state.emptyFields ? "border-error" : ""}
                value={this.state.user_signup_fields.email}
                onChange={this.onInputchange}
              />
            </div>
            
            <div className="form-group-wrapper">
              <label> Username: </label>
              <input name="username" type="text" placeholder="Enter your username"
                className={this.state.user_signup_fields.username === '' && this.state.emptyFields ? "border-error" : ""}
                value={this.state.user_signup_fields.username}
                onChange={this.onInputchange}
              />
            </div>
            
            <div className="form-group-wrapper">
              <label > Password: </label>
              <input name="password" type="password" placeholder="Enter your password"
                className={this.state.user_signup_fields.password === '' && this.state.emptyFields ? "border-error" : ""}
                value={this.state.user_signup_fields.password}
                onChange={this.onInputchange}
              />
            </div>
            
            <div className="form-group-wrapper">
              <label> Confirm Password: </label>
              <input name="password_confirm" type="password" placeholder="Repeat your email"
                className={this.state.user_signup_fields.password_confirm === '' && this.state.emptyFields ? "border-error" : ""}
                value={this.state.user_signup_fields.password_confirm}
                onChange={this.onInputchange}
              />
            </div>
            
            <button type="submit" className="custom-btn"> Signup </button>
          </div>
        </form>
      </div>
    );
  }
}

export default SignUp;
