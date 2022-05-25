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
    this.handleChange15Min = this.handleChange15Min.bind(this);
    this.state = {
      deviceid: " ",
      dateFrom:
        new Date(new Date().getTime() - 120 * 60000)
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
        {
          name: "Humid",
          data: [],
        },
        {
          name: "CO2",
          data: [],
        },
        {
          name: "VOCs",
          data: [],
        },
        {
          name: "PM2.5",
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
          toolbar: {
            export: {
              csv: {
                filename: undefined,
                columnDelimiter: ",",
                headerCategory: "category",
                headerValue: "value",
                dateFormatter(timestamp) {
                  return new Date(timestamp).toString();
                },
              },
              svg: {
                filename: undefined,
              },
              png: {
                filename: undefined,
              },
            },
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
              return val.toFixed(2);
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
              return val.toFixed(2);
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
        console.log(deviceid);
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

  handleChange = (e) => {
    e.preventDefault();
    const orders = this.props.sensordata.graphdata;

    if (orders !== undefined) {
      if (orders.length > 1) {
        if (this.state.dataType === "1-min-avg") {
          this.pickDateRange1MinAvg(e.target.value);
        } else {
          this.pickDateRangeNot1MinAvg(e.target.value);
        }
      }
    }
  };

  pickDateRange1MinAvg(datetime) {
    let date = null;
    var mybutton = document.getElementById("updatechart");

    switch (datetime) {
      case "2":
        date =
          new Date(new Date().getTime() - 120 * 60000)
            .toISOString()
            .substr(0, new Date().toISOString().length - 7) + "00";

        this.props.get1MinAvgData(this.state.deviceid, date, this.state.dateTo);
        this.setState({
          dateFrom: date,
        });
        break;
      case "12":
        date =
          new Date(new Date().getTime() - 720 * 60000)
            .toISOString()
            .substr(0, new Date().toISOString().length - 7) + "00";

        this.props.get1MinAvgData(this.state.deviceid, date, this.state.dateTo);
        this.setState({
          dateFrom: date,
        });
        alert("👋 Please wait for the update button to show!");
        mybutton.disabled = true;
        setTimeout(function () {
          mybutton.disabled = false;
        }, 9000);

        break;
      case "24":
        date =
          new Date(new Date().getTime() - 1440 * 60000)
            .toISOString()
            .substr(0, new Date().toISOString().length - 7) + "00";

        this.props.get1MinAvgData(this.state.deviceid, date, this.state.dateTo);
        this.setState({
          dateFrom: date,
        });
        alert("👋 Please wait for the update button to show!");
        mybutton.disabled = true;
        setTimeout(function () {
          mybutton.disabled = false;
        }, 9000);

        break;
      default:
        date =
          new Date(new Date().getTime() - 120 * 60000)
            .toISOString()
            .substr(0, new Date().toISOString().length - 7) + "00";

        this.props.get1MinAvgData(this.state.deviceid, date, this.state.dateTo);
        this.setState({
          dateFrom: date,
        });
    }
  }

  pickDateRangeNot1MinAvg(datetime) {
    let date = null;
    switch (datetime) {
      case "2":
        date =
          new Date(new Date().getTime() - 120 * 60000)
            .toISOString()
            .substr(0, new Date().toISOString().length - 7) + "00";

        this.props.getAvgData(
          this.state.deviceid,
          date,
          this.state.dateTo,
          this.state.dataType
        );
        this.setState({
          dateFrom: date,
        });
        break;
      case "12":
        date =
          new Date(new Date().getTime() - 720 * 60000)
            .toISOString()
            .substr(0, new Date().toISOString().length - 7) + "00";

        this.props.getAvgData(
          this.state.deviceid,
          date,
          this.state.dateTo,
          this.state.dataType
        );
        this.setState({
          dateFrom: date,
        });
        break;
      case "24":
        date =
          new Date(new Date().getTime() - 1440 * 60000)
            .toISOString()
            .substr(0, new Date().toISOString().length - 7) + "00";

        this.props.getAvgData(
          this.state.deviceid,
          date,
          this.state.dateTo,
          this.state.dataType
        );
        this.setState({
          dateFrom: date,
        });
        break;
      default:
        date =
          new Date(new Date().getTime() - 120 * 60000)
            .toISOString()
            .substr(0, new Date().toISOString().length - 7) + "00";

        this.props.getAvgData(
          this.state.deviceid,
          date,
          this.state.dateTo,
          this.state.dataType
        );
        this.setState({
          dateFrom: date,
        });
    }
  }

  handleChange1Min() {
    var mybutton = document.getElementById("updatechart");
    let datediff = Math.ceil(
      (new Date(this.state.dateTo) - new Date(this.state.dateFrom)) / 3600000
    );

    const orders = this.props.sensordata.graphdata;
    if (orders !== undefined) {
      if (orders.length > 1) {
        this.props.get1MinAvgData(
          this.state.deviceid,
          this.state.dateFrom,
          this.state.dateTo
        );
        this.setState({ dataType: "1-min-avg" });
      }
    }
    alert("👋 Please wait for the update button to show!");
    if (datediff > 2) {
      mybutton.disabled = true;
      setTimeout(function () {
        mybutton.disabled = false;
      }, 9000);
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
    console.log(this.state.dateFrom);
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

  updateChartsScore1MinAvg() {
    const orders = this.props.sensordata.graphdata;
    const graph = [];
    let length = orders.length;
    for (var i = 0; i < length - 2; i++) {
      let data = [];
      let date = new Date(orders[i].timestamp);
      data.push(date.getTime() + 600 * 60000);
      data.push(orders[i].score);
      graph.push(data);
    }
    return graph;
  }

  updateChartsScoreNot1MinAvg() {
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
    return graph;
  }

  updateChartsTemp1MinAvg() {
    const orders = this.props.sensordata.graphdata;
    const graph = [];
    let length = orders.length;
    for (var i = 0; i < length - 2; i++) {
      let data = [];

      let date = new Date(orders[i].timestamp);
      data.push(date.getTime() + 600 * 60000);
      orders[i].sensors.map((sensor) => {
        if (sensor.comp === "temp") {
          data.push(sensor.value);
        } else {
          return null;
        }
      });

      graph.push(data);
    }

    return graph;
  }

  updateChartsTempNot1MinAvg() {
    const orders = this.props.sensordata.graphdata;
    const graph = [];
    orders[0].map((order) => {
      let data = [];
      for (var i = 0; i < 2; i++) {
        if (i === 0) {
          let date = new Date(order.timestamp);
          data.push(date.getTime() + 600 * 60000);
        } else {
          order.sensors.map((sensor) => {
            if (sensor.comp === "temp") {
              data.push(sensor.value);
            } else {
              return null;
            }
          });
        }
      }
      graph.push(data);
    });
    return graph;
  }

  updateChartsHumid1MinAvg() {
    const orders = this.props.sensordata.graphdata;
    const graph = [];
    let length = orders.length;
    for (var i = 0; i < length - 2; i++) {
      let data = [];

      let date = new Date(orders[i].timestamp);
      data.push(date.getTime() + 600 * 60000);
      orders[i].sensors.map((sensor) => {
        if (sensor.comp === "humid") {
          data.push(sensor.value);
        } else {
          return null;
        }
      });

      graph.push(data);
    }

    return graph;
  }

  updateChartsHumidNot1MinAvg() {
    const orders = this.props.sensordata.graphdata;
    const graph = [];
    orders[0].map((order) => {
      let data = [];
      for (var i = 0; i < 2; i++) {
        if (i === 0) {
          let date = new Date(order.timestamp);
          data.push(date.getTime() + 600 * 60000);
        } else {
          order.sensors.map((sensor) => {
            if (sensor.comp === "humid") {
              data.push(sensor.value);
            } else {
              return null;
            }
          });
        }
      }
      graph.push(data);
    });
    return graph;
  }

  updateChartsCO21MinAvg() {
    const orders = this.props.sensordata.graphdata;
    const graph = [];
    let length = orders.length;
    for (var i = 0; i < length - 2; i++) {
      let data = [];

      let date = new Date(orders[i].timestamp);
      data.push(date.getTime() + 600 * 60000);
      orders[i].sensors.map((sensor) => {
        if (sensor.comp === "co2") {
          data.push(sensor.value);
        } else {
          return null;
        }
      });

      graph.push(data);
    }

    return graph;
  }

  updateChartsCO2Not1MinAvg() {
    const orders = this.props.sensordata.graphdata;
    const graph = [];
    orders[0].map((order) => {
      let data = [];
      for (var i = 0; i < 2; i++) {
        if (i === 0) {
          let date = new Date(order.timestamp);
          data.push(date.getTime() + 600 * 60000);
        } else {
          order.sensors.map((sensor) => {
            if (sensor.comp === "co2") {
              data.push(sensor.value);
            } else {
              return null;
            }
          });
        }
      }
      graph.push(data);
    });
    return graph;
  }

  updateChartsVOC1MinAvg() {
    const orders = this.props.sensordata.graphdata;
    const graph = [];
    let length = orders.length;
    for (var i = 0; i < length - 2; i++) {
      let data = [];

      let date = new Date(orders[i].timestamp);
      data.push(date.getTime() + 600 * 60000);
      orders[i].sensors.map((sensor) => {
        if (sensor.comp === "voc") {
          data.push(sensor.value);
        } else {
          return null;
        }
      });

      graph.push(data);
    }

    return graph;
  }

  updateChartsVOCNot1MinAvg() {
    const orders = this.props.sensordata.graphdata;
    const graph = [];
    orders[0].map((order) => {
      let data = [];
      for (var i = 0; i < 2; i++) {
        if (i === 0) {
          let date = new Date(order.timestamp);
          data.push(date.getTime() + 600 * 60000);
        } else {
          order.sensors.map((sensor) => {
            if (sensor.comp === "voc") {
              data.push(sensor.value);
            } else {
              return null;
            }
          });
        }
      }
      graph.push(data);
    });
    return graph;
  }

  updateChartsPM251MinAvg() {
    const orders = this.props.sensordata.graphdata;
    const graph = [];
    let length = orders.length;
    for (var i = 0; i < length - 2; i++) {
      let data = [];

      let date = new Date(orders[i].timestamp);
      data.push(date.getTime() + 600 * 60000);
      orders[i].sensors.map((sensor) => {
        if (sensor.comp === "pm25") {
          data.push(sensor.value);
        } else {
          return null;
        }
      });

      graph.push(data);
    }

    return graph;
  }

  updateChartsPM25Not1MinAvg() {
    const orders = this.props.sensordata.graphdata;
    const graph = [];
    orders[0].map((order) => {
      let data = [];
      for (var i = 0; i < 2; i++) {
        if (i === 0) {
          let date = new Date(order.timestamp);
          data.push(date.getTime() + 600 * 60000);
        } else {
          order.sensors.map((sensor) => {
            if (sensor.comp === "pm25") {
              data.push(sensor.value);
            } else {
              return null;
            }
          });
        }
      }
      graph.push(data);
    });
    return graph;
  }
  sleep(milliseconds) {
    const start = Date.now();
    while (Date.now() - start < milliseconds);
  }

  updateCharts() {
    const newMixedSeries = [];
    const orders = this.props.sensordata.graphdata;
    const graph = [];

    if (orders !== undefined) {
      if (this.state.dataType !== "1-min-avg") {
        //
        let graph = this.updateChartsScoreNot1MinAvg();
        let graph2 = this.updateChartsTempNot1MinAvg();
        let graph3 = this.updateChartsHumidNot1MinAvg();
        let graph4 = this.updateChartsCO2Not1MinAvg();
        let graph5 = this.updateChartsVOCNot1MinAvg();
        let graph6 = this.updateChartsPM25Not1MinAvg();
        newMixedSeries.push({ data: graph });
        newMixedSeries.push({ data: graph2 });
        newMixedSeries.push({ data: graph3 });
        newMixedSeries.push({ data: graph4 });
        newMixedSeries.push({ data: graph5 });
        newMixedSeries.push({ data: graph6 });
        let graphTitle =
          "Device " +
          orders[1].device_id +
          " ( " +
          this.state.dataType +
          " AWAIR score past " +
          Math.ceil(
            (new Date(this.state.dateTo) - new Date(this.state.dateFrom)) /
              3600000
          ) +
          " hours )";
        this.setState({
          series: newMixedSeries,
          options: {
            title: {
              text: graphTitle,
            },
            chart: {
              toolbar: {
                export: {
                  csv: {
                    filename: graphTitle,
                  },
                  svg: {
                    filename: graphTitle,
                  },
                  png: {
                    filename: graphTitle,
                  },
                },
              },
            },
          },
        });
      } else {
        //

        let length = orders.length;
        let graph = this.updateChartsScore1MinAvg();
        let graph2 = this.updateChartsTemp1MinAvg();
        let graph3 = this.updateChartsHumid1MinAvg();
        let graph4 = this.updateChartsCO21MinAvg();
        let graph5 = this.updateChartsVOC1MinAvg();
        let graph6 = this.updateChartsPM251MinAvg();
        newMixedSeries.push({ data: graph });
        newMixedSeries.push({ data: graph2 });
        newMixedSeries.push({ data: graph3 });
        newMixedSeries.push({ data: graph4 });
        newMixedSeries.push({ data: graph5 });
        newMixedSeries.push({ data: graph6 });
        let graphTitle =
          "Device " +
          orders[length - 1].device_id +
          " ( " +
          this.state.dataType +
          " AWAIR score past " +
          Math.ceil(
            (new Date(this.state.dateTo) - new Date(this.state.dateFrom)) /
              3600000
          ) +
          " hours )";
        this.setState({
          series: newMixedSeries,
          options: {
            title: {
              text: graphTitle,
            },
            chart: {
              toolbar: {
                export: {
                  csv: {
                    filename: graphTitle,
                  },
                  svg: {
                    filename: graphTitle,
                  },
                  png: {
                    filename: graphTitle,
                  },
                },
              },
            },
          },
        });
      }
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
                  <h3>Data Analytics</h3>
                </div>
              </div>

              <div className="d-flex card-section">
                <div className="cards-container">
                  <div className="card-bg w-100 border d-flex flex-column">
                    <div className="d-flex justify-content-between mb-3 border border-secondary">
                      <select
                        onChange={this.handleChange}
                        style={{ height: "35px", width: "1030px" }}
                      >
                        <option value="2">Past 2 hours</option>
                        <option value="12">Past 12 hours</option>
                        <option value="24">Past 1 day</option>
                      </select>
                      <ButtonGroup
                        style={{ height: "35px", width: "230px" }}
                        aria-label="Basic example"
                      >
                        <Button
                          onClick={this.handleChange1Min}
                          variant="secondary"
                          size="sm"
                          style={{
                            fontSize: "10px",
                            border: "1px solid #f2f2f2",
                          }}
                        >
                          1-min avg
                        </Button>
                        <Button
                          onClick={this.handleChange5Min}
                          variant="secondary"
                          size="sm"
                          style={{
                            fontSize: "10px",
                            border: "1px solid #f2f2f2",
                          }}
                        >
                          5-min avg
                        </Button>
                        <Button
                          onClick={this.handleChange15Min}
                          variant="secondary"
                          size="sm"
                          style={{
                            fontSize: "10px",
                            border: "1px solid #f2f2f2",
                          }}
                        >
                          15-min avg
                        </Button>
                      </ButtonGroup>
                    </div>

                    <Chart
                      options={this.state.options}
                      series={this.state.series}
                      type="line"
                      height={450}
                    ></Chart>
                    <button id="updatechart" onClick={this.updateCharts}>
                      Update!
                    </button>
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
