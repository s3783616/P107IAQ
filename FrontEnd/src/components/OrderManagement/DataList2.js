import React, { Component } from "react";
import { CDBContainer } from "cdbreact";
import { Alert, Form, FormControl, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { getSearchedData } from "../../actions/dataActions";
import { Link } from "react-router-dom";
import Search from "../Layout/Search";
import "../scss/Dashboard.css";
import Sidebar from "../Layout/Sidebar";
import Header from "../Layout/Header";

class DataList2 extends Component {
  state = {
    refresh: false,
  };

  constructor(props) {
    super(props);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.setState({ refresh: false });
  }

  onSearchSubmit(deviceID, dateFrom, dateTo, dataType) {
    this.props.getSearchedData(deviceID);
  }

  componentDidMount() {
    this.props.getSearchedData(null);
  }

  renderOrderItems() {
    const orders = this.props.sensordata.data;
    console.log(orders.data[0]);

    return <h5>{orders.data[0].score}</h5>;
  }

  render() {
    return (
      <div className={"w-75 mx-auto"}>
        <h1 className={"mb-5"}>Orders</h1>
        <Search onSearchSubmit={this.onSearchSubmit} />

        {this.props.sensordata.data ? this.renderOrderItems() : ""}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return { sensordata: state.datas };
};
export default connect(mapStateToProps, {
  getSearchedData,
})(DataList2);
