import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { logout } from "../../actions/securityActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Logo from "../../img/logo.png";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchType: "Title",
      search: null,
      term: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  myChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({ [nam]: val });
  };

  handleSubmit(e) {
    this.props.history.push(
      `/search/${this.state.searchType}/${this.state.search}`
    );
  }
  onSearchTermChange = (e) => {
    this.setState({ term: e.target.value });
  };

  onSearchSubmit = (e) => {
    e.preventDefault();
    this.props.getBooksBySearchTerm(this.state.term.toLowerCase());
  };

  onResetClick = (e) => {
    e.preventDefault();
    window.location.reload();
  };

  render() {
    const { validToken } = this.props.security;
    const guestLinks = (
      <ul className="navbar-nav justify-content-end">
        <li className="nav-item">
          <a className="nav-link" href="http://localhost:3000/login">
            Login
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="http://localhost:3000/register">
            Sign Up
          </a>
        </li>
      </ul>
    );
    const userLinks = (
      <ul className="navbar-nav">
        <li className="nav-item ml-auto">
          <a
            href="http://localhost:3000/login"
            className="nav-link"
            onClick={logout()}
          >
            Log Out
          </a>
        </li>
      </ul>
    );

    return (
      <div
        className={"container-fluid navbar navbar-expand-lg navbar-dark"}
        style={{ backgroundColor: "black" }}
      >
        <div className={"row w-100 justify-content-start"}>
          <div className={"col"}>
            <a className="navbar-brand ms-4" href="/dashboard">
              <img src={Logo} style={{ width: "100px" }} />
            </a>
          </div>

          <div className={"col"}>{validToken ? userLinks : guestLinks}</div>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  security: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    security: state.security,
  };
}

export default withRouter(connect(mapStateToProps)(Header));
