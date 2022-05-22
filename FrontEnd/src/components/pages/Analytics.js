import React, { Component, useState } from "react";
import { Alert, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { connect } from "react-redux";
import { getSearchedData, get15MinAvgData } from "../../actions/dataActions";
import { Link } from "react-router-dom";
import Search from "../Layout/Search";
import Select2 from "./SelectTest";
import "../scss/Dashboard.css";
import Sidebar from "../Layout/Sidebar";
import Header from "../Layout/Header";
import Chart from "react-apexcharts";

class Analytics extends Component {
  state = {
    refresh: false,
    device: " ",
  };

  constructor(props) {
    super(props);
    this.updateCharts = this.updateCharts.bind(this);
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
    };
  }

  renderanything() {
    const orders = this.props.sensordata.data;

    if (orders.length > 1) {
      const deviceid = orders[1].device_id;
      console.log(deviceid);
      this.props.get15MinAvgData(deviceid);
    }
  }

  renderanything2() {
    const orders = this.props.sensordata.graphdata;
    const graph = [];
    orders[0].map((order) => {
      let data = [];
      for (var i = 0; i < 2; i++) {
        if (i === 0) {
          data.push(order.score);
        } else {
          data.push(order.timestamp);
        }
      }
      graph.push(data);
    });
    console.table(graph);
  }

  updateCharts() {
    const newMixedSeries = [];
    const orders = this.props.sensordata.graphdata;
    const graph = [];
    orders[0].map((order) => {
      let data = [];
      for (var i = 0; i < 2; i++) {
        if (i === 0) {
          let date = new Date(order.timestamp);
          data.push(date.getTime() + 600 * 60000);
        } else {
          data.push(order.score);
        }
      }
      graph.push(data);
    });

    newMixedSeries.push({ data: graph });

    this.setState({
      series: newMixedSeries,
      options: { title: { text: "Device " + orders[1].device_id } },
    });
  }

  updateCharts2() {
    const max = 90;
    const min = 30;
    const newMixedSeries = [];

    this.state.series.forEach((s) => {
      const data2 = s.data.map(() => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      });
      newMixedSeries.push({ data: data2, type: "line" });
    });

    this.setState({
      series: newMixedSeries,
    });
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
                    {this.props.sensordata.data ? this.renderanything() : ""}
                    {this.props.sensordata.graphdata
                      ? this.renderanything2()
                      : ""}
                    <Chart
                      options={this.state.options}
                      series={this.state.series}
                      type="line"
                      height={450}
                      width={1250}
                    ></Chart>
                    <button onClick={this.updateCharts}>Update!</button>
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
})(Analytics);
