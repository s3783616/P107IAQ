import React, { Component } from "react";
import { connect } from "react-redux";
import { getSearchedData } from "../../actions/dataActions";
import { Alert, Form, FormControl, Button } from "react-bootstrap";

class Select extends Component {
  state = {
    deviceid: null,
  };

  handleChange = (e) => {
    e.preventDefault();
    this.setState({ deviceid: e.target.value });
  };

  onSearchSubmit = (e) => {
    e.preventDefault();
    this.props.onSearchSubmit(this.state.deviceid);
  };

  render() {
    return (
      <div>
        <div className="p-4 d-flex flex-column h-100">
          <span className="mb-2">Choose Device ID</span>
          <Form className="d-flex">
            <select
              deviceID={this.state.deviceid}
              onChange={this.handleChange}
              style={{ height: "40px", width: "1120px" }}
            >
              <option value=" "></option>
              <option value="25758">25758 (RMIT Building 12, Floor 9)</option>
              <option value="26203">26203 (RMIT Building 12, Floor 10)</option>
            </select>
            <Button
              variant="outline-primary"
              onClick={(e) => this.onSearchSubmit(e)}
            >
              Search
            </Button>
          </Form>

          <div className="d-flex"></div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { datas: state.datas };
};
export default connect(mapStateToProps, { getSearchedData })(Select);
