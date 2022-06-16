import React, { Component } from "react";
import { connect } from "react-redux";
import { getSearchedData } from "../../../actions/dataActions";
import Select from "./Select";
import "../../scss/Dashboard.css";
import Sidebar from "../../Layout/Sidebar";
import Header from "../../Layout/Header";
import Score from "./Score";
import Notification from "./Notification";

// Dashboard class
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.state = {
      device: " ", // state to store device id
    };
  }

  onSearchSubmit(deviceid) {
    this.props.getSearchedData(deviceid); // make request to get Airdata in raw format
    this.setState({ device: deviceid });
  }

  componentDidMount() {
    const orders = this.props.sensordata.data;
    const orders2 = this.props.sensordata.graphdata;
    // if user first login and has not choose a device
    if (orders === undefined) {
      // if user get back to dashboard page from other page and has not choose a device
      if (orders2 === undefined) {
        this.props.getSearchedData(this.state.device);
      } else {
        this.props.getSearchedData(orders2[orders2.length - 1].device_id);
        this.setState({ device: orders2[orders2.length - 1].device_id });
      }
    }
    // if user choose a device
    else {
      // the json request does not get any air data due to network delay
      if (orders.length === 1) {
        this.props.getSearchedData(orders[0].device_id); // device id is in the first element in json array
      } else {
        this.props.getSearchedData(orders[orders.length - 1].device_id);
        this.setState({ device: orders[orders.length - 1].device_id });
      }
    }
    // update the airdata by making a data request every one minute and re-render the page
    this.interval = setInterval(
      () => this.props.getSearchedData(this.state.device),
      60000
    );
  }

  // clean up timer
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
          <div style={{ height: "calc(100% - 40px)" }}>
            <div style={{ height: "calc(100% - 10px)", overflowY: "scroll" }}>
              {/*page title*/}
              <div className="d-flex">
                <div className="mr-auto ml-5 mt-4">
                  <h3>Dashboard</h3>
                </div>
              </div>
              {/*Select element for user to choose device*/}
              <div className="d-flex card-section">
                <div className="cards-container">
                  <div className="card-bg w-100 border d-flex flex-column">
                    <Select onSearchSubmit={this.onSearchSubmit} />
                  </div>
                </div>
              </div>
              <div className="d-flex card-section">
                <div className="cards-container-2">
                  {/*AirData Score board*/}
                  <div className="card-bg w-100 border d-flex flex-column">
                    <div className="p-4 d-flex flex-column h-100">
                      <Score />
                    </div>
                  </div>
                  {/*AirData Notification board*/}
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
// selecting the AirData from the store that dashboard needs.
// It is called every time the store state changes
const mapStateToProps = (state) => {
  return { sensordata: state.datas }; // return json object of AirData
};

export default connect(mapStateToProps, {
  getSearchedData,
})(Dashboard);
