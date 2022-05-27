import React, { Component } from "react";
import { Alert } from "react-bootstrap";
import { connect } from "react-redux";
import { getSearchedData } from "../../../actions/dataActions";
import Select from "./Select";
import "../../scss/Dashboard.css";
import Sidebar from "../../Layout/Sidebar";
import Header from "../../Layout/Header";
import Score from "./Score";
import Notification from "./Notification";

class Dashboard extends Component {
  state = {
    refresh: false,
    device: " ",
  };

  constructor(props) {
    super(props);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);

    this.setState({ refresh: false });
  }

  onSearchSubmit(deviceid) {
    this.props.getSearchedData(deviceid);
    this.setState({ device: deviceid });
  }

  searchDeviceError() {
    if (
      this.state.device === "26203" ||
      this.state.device === "25758" ||
      this.state.device === " "
    ) {
      return null;
    } else {
      return (
        <Alert key="danger" variant="danger" className="text-center">
          Device {this.state.device} does not exist!
        </Alert>
      );
    }
  }

  componentDidMount() {
    const orders = this.props.sensordata.data;
    const orders2 = this.props.sensordata.graphdata;
    if (orders === undefined) {
      if (orders2 === undefined) {
        this.props.getSearchedData(this.state.device);
      } else {
        this.props.getSearchedData(orders2[orders2.length - 1].device_id);
        this.setState({ device: orders2[orders2.length - 1].device_id });
      }
    } else {
      if (orders.length === 1) {
        this.props.getSearchedData(orders[0].device_id);
      } else {
        this.props.getSearchedData(orders[orders.length - 1].device_id);
        this.setState({ device: orders[orders.length - 1].device_id });
      }
    }
    this.interval = setInterval(
      () => this.props.getSearchedData(this.state.device),
      60000
    );
  }

  componentWillUnmount() {
    clearInterval(this.interval);
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
            <div style={{ height: "calc(100% - 50px)", overflowY: "scroll" }}>
              <div className="d-flex">
                <div className="mr-auto ml-5 mt-4">
                  <h3>Dashboard</h3>
                </div>
              </div>

              <div className="d-flex card-section">
                <div className="cards-container">
                  <div className="card-bg w-100 border d-flex flex-column">
                    <Select onSearchSubmit={this.onSearchSubmit} />
                  </div>
                </div>
              </div>
              {this.searchDeviceError()}
              <div className="d-flex card-section">
                <div className="cards-container-2">
                  <div className="card-bg w-100 border d-flex flex-column">
                    <div className="p-4 d-flex flex-column h-100">
                      <Score />
                    </div>
                  </div>
                  <div className="card-bg w-100 border d-flex flex-column">
                    <div className="p-4 d-flex flex-column h-100">
                      <div className="d-flex align-items-center justify-content-between">
                        <Notification />
                      </div>
                    </div>
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
  getSearchedData,
})(Dashboard);
