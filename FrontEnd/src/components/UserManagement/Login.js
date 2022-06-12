import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Form } from "react-bootstrap";
import { login } from "../../actions/securityActions";
import { Link } from "react-router-dom";
import { Alert } from "react-bootstrap";
import classnames from "classnames";
import Header from "../Layout/Header";
import "../scss/custom.css";

// login class
class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      errors: {},
      message: "",
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    window.localStorage.removeItem("message");
    if (this.props.security.validToken) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.security.validToken) {
      this.props.history.push("/dashboard");
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  // submit login request
  onSubmit(e) {
    e.preventDefault();
    const LoginRequest = {
      username: this.state.username,
      password: this.state.password,
    };

    this.props.login(LoginRequest);
  }

  // set user input to corresponding state
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  //  display invalid username and password error
  renderErrorMessage() {
    const error = this.props.errors.error;

    if (error.Message !== "undefined") {
      return (
        <Alert className="mt-4" key="danger" variant="danger">
          Username and Password do not match!
        </Alert>
      );
    }
  }

  render() {
    return (
      <div>
        <Header />
        <div
          className="hero d-flex align-items-center auth py-5"
          style={{ height: 650 }}
        >
          <div className="row w-100 mx-0">
            <div className="col-lg-5 mx-auto">
              <div className="auth-form-light text-left py-5 px-4 px-sm-5">
                {/* Login page title */}
                <h1 className="display-3">Login</h1>
                <h4>Hello! let's get started</h4>
                <h6 className="font-weight-light">Sign in to continue.</h6>
                {this.props.errors.error ? this.renderErrorMessage() : ""}
                <Form className="pt-3" onSubmit={this.onSubmit}>
                  <Form.Group className="d-flex search-field">
                    {/* username placeholder */}
                    <Form.Control
                      type="email"
                      placeholder="Username"
                      size="lg"
                      className={classnames("form-control form-control-lg")}
                      name="username"
                      value={this.state.username}
                      onChange={this.onChange}
                    />
                  </Form.Group>
                  <Form.Group className="d-flex search-field my-2">
                    {/* password placeholder */}
                    <Form.Control
                      type="password"
                      className={classnames("form-control form-control-lg")}
                      placeholder="Password"
                      size="lg"
                      name="password"
                      value={this.state.password}
                      onChange={this.onChange}
                    />
                  </Form.Group>

                  <div className="mt-4">
                    {/* submit button */}
                    <input
                      type="submit"
                      className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                    />
                  </div>

                  <div className="my-3 d-flex justify-content-between align-items-center">
                    <div className="form-check">
                      <label className="form-check-label text-muted">
                        <input type="checkbox" className="form-check-input" />
                        <i className="input-helper"></i>
                        Keep me signed in
                      </label>
                    </div>
                    <a
                      href="!#"
                      onClick={(event) => event.preventDefault()}
                      className="auth-link text-black"
                    >
                      Forgot password?
                    </a>
                  </div>
                  <div className="text-center mt-4 font-weight-light">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-primary">
                      Create
                    </Link>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  security: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  security: state.security,
  errors: state.errors,
});

export default connect(mapStateToProps, { login })(Login);
