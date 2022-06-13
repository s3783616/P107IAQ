import React, { Component } from "react";
import { connect } from "react-redux";
import { getSearchedData } from "../../../actions/dataActions";
import { Form, Button } from "react-bootstrap";

// Select Input Control class
class Select extends Component {
  state = {
    deviceid: " ",
  };

  // set device id when user click on select options
  handleChange = (e) => {
    e.preventDefault();
    this.setState({ deviceid: e.target.value });
  };

  // make a request to get Airdata in raw format when user click on search button
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
              deviceid={this.state.deviceid}
              onChange={this.handleChange}
              style={{ height: "40px", width: "1250px" }}
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

// selecting the AirData from the store that select component needs.
// It is called every time the store state changes
const mapStateToProps = (state) => {
  return { datas: state.datas }; // return json object of AirData
};
export default connect(mapStateToProps, { getSearchedData })(Select);
