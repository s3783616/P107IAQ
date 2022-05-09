import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Form } from "react-bootstrap";
import { createNewUser } from "../../actions/securityActions";
import { Link } from "react-router-dom";
import Header from "../Layout/Header";
import "../scss/custom.css";

class Register extends Component {
  constructor() {
    super();

    this.state = {
      username: "",
      fullName: "",
      password: "",
      confirmPassword: "",
      errors: {},
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    const newUser = {
      username: this.state.username,
      fullName: this.state.fullName,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
    };

    this.props.createNewUser(newUser, this.props.history);
  }

  onChange(e) {
    console.log(e.target);
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <div>
        <Header />
        <div className="hero d-flex align-items-center auth py-5">
          <div className="row w-100 mx-0">
            <div className="col-lg-5 mx-auto">
              <div className="auth-form-light text-left py-5 px-4 px-sm-5">
                <h1 classname="display-3">Register</h1>
                <h4>New here?</h4>
                <h6 className="font-weight-light">
                  Signing up is easy. It only takes a few steps
                </h6>
                <Form className="pt-3" onSubmit={this.onSubmit}>
                  <Form.Group className="d-flex search-field my-2">
                    <Form.Control
                      type="email"
                      placeholder="Username"
                      size="lg"
                      className="form-control form-control-lg"
                      name="username"
                      value={this.state.username}
                      onChange={this.onChange}
                    />
                  </Form.Group>
                  <Form.Group className="d-flex search-field my-2">
                    <Form.Control
                      type="text"
                      placeholder="Full Name"
                      size="lg"
                      className="form-control form-control-lg"
                      name="fullName"
                      value={this.state.fullName}
                      onChange={this.onChange}
                    />
                  </Form.Group>
                  <Form.Group className="d-flex search-field my-2">
                    <Form.Control
                      type="password"
                      className="form-control form-control-lg"
                      placeholder="Password"
                      size="lg"
                      name="password"
                      value={this.state.password}
                      onChange={this.onChange}
                    />
                  </Form.Group>
                  <Form.Group className="d-flex search-field my-2">
                    <Form.Control
                      type="password"
                      className="form-control form-control-lg"
                      placeholder="Confirm Password"
                      size="lg"
                      name="confirmPassword"
                      value={this.state.confirmPassword}
                      onChange={this.onChange}
                    />
                  </Form.Group>
                  <div className="mb-4">
                    <div className="form-check">
                      <label className="form-check-label text-muted">
                        <input type="checkbox" className="form-check-input" />
                        <i className="input-helper"></i>I agree to all Terms &
                        Conditions
                      </label>
                    </div>
                  </div>
                  <div className="mt-4">
                    <input
                      type="submit"
                      className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                    />
                  </div>
                  <div className="text-center mt-4 font-weight-light">
                    Already have an account?{" "}
                    <Link to="/login" className="text-primary">
                      Login
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

Register.propTypes = {
  createNewUser: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
});
export default connect(mapStateToProps, { createNewUser })(Register);
