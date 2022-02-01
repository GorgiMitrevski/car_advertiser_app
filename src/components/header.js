import React, { Component } from "react";
import { Link } from "react-router-dom";

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user_logged_in: false
    };
  }

  navigate_login_or_logout = () => {
    console.log('this.state.user_logged_in: ', this.state.user_logged_in);
    this.setState({user_logged_in: !this.state.user_logged_in});
    // TODO: do functionality for login(navigate to login) and logout(remove login user from localStorage)
  }

  render() {
    return (
      <header className="app-header">
        {/* <Link to="/signup"> Sign up </Link>
        <Link to="/dashboard"> All cars listing </Link> */}
        <ul>
          <li> <Link to="/signup"> Sign up </Link> </li>
          <li> <Link to="/dashboard"> Dashboard </Link> </li>
          <li className="right-item">
            <a className="header-log-btn" onClick={this.navigate_login_or_logout}> {this.state.user_logged_in ? "Logout" : "Login" } </a>
          </li>
        </ul>

        {/* <div className="header-right-items">
          <a className="header-log-btn" onClick={this.navigate_login_or_logout}> {this.state.user_logged_in ? "Logout" : "Login" } </a>
        </div> */}
      </header>
    );
  }
}

export default Header;
