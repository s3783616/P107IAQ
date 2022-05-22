import React, { Component } from "react";
import { Alert, Button, ButtonGroup } from "react-bootstrap";
import { connect } from "react-redux";
import {
  getSearchedData,
  getAvgData,
  get1MinAvgData,
} from "../../actions/dataActions";

import "../scss/Dashboard.css";
import Sidebar from "../Layout/Sidebar";
import Header from "../Layout/Header";
import Chart from "react-apexcharts";

class Analytics extends Component {
  constructor(props) {
    super(props);
    this.updateCharts = this.updateCharts.bind(this);
    this.handleChange1Min = this.handleChange1Min.bind(this);
    this.handleChange5Min = this.handleChange5Min.bind(this);
    this.handleChangeRaw = this.handleChangeRaw.bind(this);
    this.handleChange15Min = this.handleChange15Min.bind(this);
    this.state = {
      deviceid: " ",
      dateFrom:
        new Date(new Date().getTime() - 720 * 60000)
          .toISOString()
          .substr(0, new Date().toISOString().length - 7) + "00",
      dateTo:
        new Date()
          .toISOString()
          .substr(0, new Date().toISOString().length - 7) + "00",
      dataType: "15-min-avg",
      series: [
        {
          name: "Awair Score",
          data: [],
        },
        {
          name: "Temp",
          data: [],
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
              return val.toFixed(10);
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
              return val.toFixed(10);
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

  componentDidMount() {
    const orders = this.props.sensordata.data;
    if (orders !== undefined) {
      if (orders.length > 1) {
        const deviceid = orders[orders.length - 1].device_id;
        this.props.getAvgData(
          deviceid,
          this.state.dateFrom,
          this.state.dateTo,
          this.state.dataType
        );
        this.setState({ deviceid: deviceid });
      }
    }
  }

  handleChangeRaw() {
    const orders = this.props.sensordata.graphdata;
    console.log(orders);
    if (orders !== undefined) {
      if (orders.length > 1) {
        this.props.getAvgData(
          this.state.deviceid,
          this.state.dateFrom,
          this.state.dateTo,
          "raw"
        );
        this.setState({ dataType: "raw" });
      }
    }
  }

  handleChange1Min() {
    const orders = this.props.sensordata.graphdata;
    console.log(orders);
    if (orders !== undefined) {
      if (orders.length > 1) {
        this.props.get1MinAvgData(this.state.deviceid);
        this.setState({ dataType: "1-min-avg" });
      }
    }
  }

  handleChange5Min() {
    const orders = this.props.sensordata.graphdata;
    console.log(orders);
    if (orders !== undefined) {
      if (orders.length > 1) {
        this.props.getAvgData(
          this.state.deviceid,
          this.state.dateFrom,
          this.state.dateTo,
          "5-min-avg"
        );
        this.setState({ dataType: "5-min-avg" });
      }
    }
  }

  handleChange15Min() {
    const orders = this.props.sensordata.graphdata;
    console.log(orders);
    if (orders !== undefined) {
      if (orders.length > 1) {
        this.props.getAvgData(
          this.state.deviceid,
          this.state.dateFrom,
          this.state.dateTo,
          "15-min-avg"
        );
        this.setState({ dataType: "15-min-avg" });
      }
    }
  }

  updateCharts() {
    const newMixedSeries = [];
    const orders = this.props.sensordata.graphdata;
    console.log(this.state.dataType);
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
                    <Chart
                      options={this.state.options}
                      series={this.state.series}
                      type="line"
                      height={450}
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
  getAvgData,
  get1MinAvgData,
})(Analytics);
