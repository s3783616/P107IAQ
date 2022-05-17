import React, { Component } from "react";
import { connect } from "react-redux";
import { getSearchedData } from "../../actions/dataActions";
import { Alert, Form, FormControl, Button } from "react-bootstrap";

class Search extends Component {
  // dateNow = new Date().toISOString();
  // dateNext = new Date(new Date().getTime() + 10 * 60000).toISOString();
  state = {
    deviceID: undefined,
  };

  onSearchTextChange = (e) => {
    e.preventDefault();
    this.setState({ deviceID: e.target.value });
  };

  onSearchSubmit = (e) => {
    e.preventDefault();

    this.props.onSearchSubmit(this.state.deviceID);
  };

  render() {
    return (
      <div>
        <div className="p-4 d-flex flex-column h-100">
          <span className="mb-2">Enter Device ID</span>
          <Form className="d-flex">
            <FormControl
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onChange={(e) => this.onSearchTextChange(e)}
            />
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
export default connect(mapStateToProps, { getSearchedData })(Search);
