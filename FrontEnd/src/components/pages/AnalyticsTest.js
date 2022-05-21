import React, { Component, useState } from "react";
import { Alert, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { connect } from "react-redux";
import { get15MinAvgData } from "../../actions/dataActions";
import { Link } from "react-router-dom";
import Search from "../Layout/Search";
import Select2 from "./SelectTest";
import "../scss/Dashboard.css";
import Sidebar from "../Layout/Sidebar";
import Header from "../Layout/Header";

class Analytics extends Component {
  state = {
    refresh: false,
    device: " ",
  };

  constructor(props) {
    super(props);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);

    this.setState({ refresh: false });
  }

  onSearchSubmit(deviceID, dateFrom, dateTo, dataType) {
    this.props.get15MinAvgData(deviceID);
    this.setState({ device: deviceID });
  }

  renderanything() {
    const orders = this.props.sensordata.data2;
    console.log(orders);
    if (orders.message === undefined) {
      return <div>{orders.data[0].score}</div>;
    }
  }
  render() {
    return (
      <div className="dashboard d-flex">
        <div>
          <Sidebar />
        </div>
        <div
          style={{
            flex: "1 1 auto",
            display: "flex",
            flexFlow: "column",
            height: "100vh",
            overflowY: "hidden",
          }}
        >
          <Header />
          <div style={{ height: "100%" }}>
            <div style={{ height: "calc(100% - 64px)", overflowY: "scroll" }}>
              <div className="d-flex">
                <div className="mr-auto ml-5 mt-4">
                  <h3>Dashboard</h3>
                </div>
              </div>

              <div className="d-flex card-section">
                <div className="cards-container">
                  <div className="card-bg w-100 border d-flex flex-column">
                    <Select2 onSearchSubmit={this.onSearchSubmit} />
                    {console.log(this.props.sensordata.data2)}
                    {this.props.sensordata.data2 ? this.renderanything() : ""}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return { sensordata: state.datas };
};
export default connect(mapStateToProps, {
  get15MinAvgData,
})(Analytics);
