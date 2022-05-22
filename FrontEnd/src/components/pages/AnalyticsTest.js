import React, { Component, useState, Fragment } from "react";
import {
  Alert,
  Button,
  OverlayTrigger,
  Tooltip,
  ButtonGroup,
} from "react-bootstrap";
import { connect } from "react-redux";
import { getSearchedData, get15MinAvgData } from "../../actions/dataActions";
import { Link } from "react-router-dom";
import "../scss/Dashboard.css";
import Sidebar from "../Layout/Sidebar";
import Header from "../Layout/Header";
import Chart from "react-apexcharts";

class AnalyticsTest extends Component {
  state = {
    refresh: false,
    dataType: " ",
    oneMinDataType: "",
  };

  constructor(props) {
    super(props);
    this.handleChange5Min = this.handleChange5Min.bind(this);
    this.handleChange15Min = this.handleChange15Min.bind(this);
    this.setState({ refresh: false });
    this.state = {
      series: [
        {
          name: "Awair Score",
          data: [
            [new Date("2018-02-12").getTime(), 34],
            [new Date("2018-02-14").getTime(), 76],
            [new Date("2018-02-16").getTime(), 55],
            [new Date("2018-02-17").getTime(), 88],
          ],
        },
        {
          name: "Awair asd",
          data: [
            [new Date("2018-02-12").getTime(), 34],
            [new Date("2018-02-14").getTime(), 76],
            [new Date("2018-02-16").getTime(), 55],
            [new Date("2018-02-17").getTime(), 88],
          ],
        },
      ],
      options: {
        chart: {
          height: 350,
          type: "line",
          zoom: {
            enabled: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "straight",
          width: 1,
        },
        title: {
          text: " ",
          align: "left",
        },
        grid: {
          row: {
            colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
            opacity: 0.5,
          },
        },
        xaxis: {
          type: "datetime",
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return val.toFixed(1);
            },
          },
          x: {
            show: true,
            format: "dd/MM hh:mm TT",
          },
        },

        yaxis: {
          tickAmount: 3,
          labels: {
            formatter: function (val) {
              return val.toFixed(1);
            },
          },
          title: {
            text: "Score",

            style: {
              fontSize: "14px",

              fontWeight: 600,
            },
          },
        },
      },
      deviceid: " ",
    };
  }

  handleChange5Min() {
    const orders = this.props.sensordata.data;
    const orders2 = this.props.sensordata.graphdata;
    console.log(this.state.deviceid);
    let deviceid = " ";
    if (orders !== undefined) {
      if (orders.length > 1) {
        deviceid = orders[1].device_id;

        this.props.get15MinAvgData(deviceid, "5-min-avg");
        this.setState({ deviceid: deviceid, dataType: "5-min-avg" });
      }
    } else {
      this.props.get15MinAvgData(this.state.deviceid, "5-min-avg");
      console.log(deviceid);
    }
  }

  handleChange15Min() {
    const orders = this.props.sensordata.data;
    const orders2 = this.props.sensordata.graphdata;
    console.log(this.state.deviceid);
    console.log(orders);
    let deviceid = " ";
    if (orders !== undefined) {
      console.log("qwer");
      if (orders.length > 1) {
        console.log("qwer2");
        deviceid = orders[1].device_id;
        console.log(deviceid);
        this.props.get15MinAvgData(deviceid, "15-min-avg");
        this.setState({ deviceid: deviceid, dataType: "15-min-avg" });
      }
    } else {
      this.props.get15MinAvgData(this.state.deviceid, "15-min-avg");
    }
  }

  renderanything() {
    const orders = this.props.sensordata.data;

    if (orders.length > 1) {
      const deviceid = orders[1].device_id;
      console.log(this.state.dataType);
      this.props.get15MinAvgData(deviceid, this.state.dataType);
    }
  }

  renderanything2() {
    const orders = this.props.sensordata.graphdata;
    console.log(orders);
    if (orders.length > 1) {
      return (
        <div>
          <div>{orders[0][0].score}</div>
          <div>{this.state.dataType}</div>
        </div>
      );
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
            <div style={{ height: "calc(100% - 40px)", overflowY: "scroll" }}>
              <div className="d-flex">
                <div className="mr-auto ml-5 mt-4">
                  <h3>Dashboard</h3>
                </div>
              </div>

              <div className="d-flex card-section">
                <div className="cards-container">
                  <div className="card-bg w-100 border d-flex flex-column">
                    <ButtonGroup aria-label="Basic example">
                      <Button variant="secondary">1-min avg</Button>
                      <Button
                        onClick={this.handleChange5Min}
                        variant="secondary"
                      >
                        5-min avg
                      </Button>
                      <Button
                        onClick={this.handleChange15Min}
                        variant="secondary"
                      >
                        15-min avg
                      </Button>
                    </ButtonGroup>
                    {this.state.dataType}
                    {this.props.sensordata.data ? this.renderanything() : ""}
                    {this.props.sensordata.graphdata
                      ? this.renderanything2()
                      : ""}
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
  get15MinAvgData,
})(AnalyticsTest);
