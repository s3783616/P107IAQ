import React, { Component, useState } from "react";
import { Alert, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { connect } from "react-redux";
import { getSearchedData } from "../../actions/dataActions";
import { Link } from "react-router-dom";
import Search from "../Layout/Search";
import Select from "./Select";
import "../scss/Dashboard.css";
import Sidebar from "../Layout/Sidebar";
import Header from "../Layout/Header";

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
    console.log(this.state.device);
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
    if (orders === undefined) {
      this.props.getSearchedData(this.state.device);
    } else {
      this.props.getSearchedData(26203);
    }
    this.interval = setInterval(
      () => this.props.getSearchedData(this.state.device),
      60000
    );
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  renderLocationAndDate() {
    if (this.state.device === "26203") {
      return (
        <div className="awair2 mb-4">
          <div>
            <h7 className="d-flex  justify-content-start fw-light">
              RMIT Building 12
            </h7>
            <h7 className="d-flex justify-content-start fw-light">Floor 10</h7>
          </div>
          <div>
            <h7 className="d-flex  justify-content-end fw-light">
              {new Date().toDateString()}
            </h7>
            <h7 className="d-flex justify-content-end fw-light">
              {new Date().toLocaleTimeString()}
            </h7>
          </div>
        </div>
      );
    } else if (this.state.device === "25758") {
      return (
        <div className="awair2 mb-4">
          <div>
            <h7 className="d-flex  justify-content-start fw-light">
              RMIT Building 12
            </h7>
            <h7 className="d-flex justify-content-start fw-light">Floor 9</h7>
          </div>
          <div>
            <h7 className="d-flex  justify-content-end fw-light">
              {new Date().toDateString()}
            </h7>
            <h7 className="d-flex justify-content-end fw-light">
              {new Date().toLocaleTimeString()}
            </h7>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
  renderIAQScore() {
    const orders = this.props.sensordata.data;

    if (orders.message === undefined) {
      if (orders.data[0].score < 40) {
        return (
          <div className="awair">
            <div>
              <div
                className="numberCircleParent"
                style={{
                  backgroundColor: "#dd1111",
                }}
              >
                <div
                  className="numberCircle"
                  style={{
                    backgroundColor: "#dd1111",
                  }}
                >
                  <span>{orders.data[0].score}</span>
                </div>
              </div>
            </div>
            <div>
              <div className="mt-4 d-flex justify-content-center">
                Awair Score
              </div>
              <h4 className=" mt-3 d-flex justify-content-center">Bad</h4>
            </div>
          </div>
        );
      } else if (orders.data[0].score < 70) {
        return (
          <div className="awair">
            <div>
              <div
                className="numberCircleParent"
                style={{
                  backgroundColor: "#ffc124",
                }}
              >
                <div
                  className="numberCircle"
                  style={{
                    backgroundColor: "#ffc124",
                  }}
                >
                  <span>{orders.data[0].score}</span>
                </div>
              </div>
            </div>
            <div>
              <div className="mt-4 d-flex justify-content-center">
                Awair Score
              </div>
              <h4 className=" mt-3 d-flex justify-content-center">Fair</h4>
            </div>
          </div>
        );
      } else {
        return (
          <div className="awair">
            <div>
              <div
                className="numberCircleParent"
                style={{
                  backgroundColor: "#1cdd11",
                }}
              >
                <div
                  className="numberCircle"
                  style={{
                    backgroundColor: "#1cdd11",
                  }}
                >
                  <span>{orders.data[0].score}</span>
                </div>
              </div>
            </div>
            <div>
              <div className="mt-4 d-flex justify-content-center">
                Awair Score
              </div>
              <h4 className=" mt-3 d-flex justify-content-center">Good</h4>
            </div>
          </div>
        );
      }
    } else {
      return (
        <div className="awair">
          <div>
            <div
              className="numberCircleParent"
              style={{
                backgroundColor: "#adadad",
              }}
            >
              <div
                className="numberCircle"
                style={{
                  backgroundColor: "#adadad",
                }}
              >
                <span>?</span>
              </div>
            </div>
          </div>
          <div>
            <div className="mt-4 d-flex justify-content-center">
              Awair Score
            </div>
            <h4 className=" mt-3 d-flex justify-content-center">-</h4>
          </div>
        </div>
      );
    }
  }

  renderTemperature() {
    const orders = this.props.sensordata.data;
    if (orders.message === undefined) {
      return orders.data[0].sensors.map((sensor) => {
        if (sensor.comp === "temp") {
          return <span>{Math.round(sensor.value * 10) / 10}</span>;
        } else {
          return null;
        }
      });
    } else {
      return <span>-</span>;
    }
  }

  renderHumidity() {
    const orders = this.props.sensordata.data;
    if (orders.message === undefined) {
      return orders.data[0].sensors.map((sensor) => {
        if (sensor.comp === "humid") {
          return <span>{Math.round(sensor.value * 10) / 10}</span>;
        } else {
          return null;
        }
      });
    } else {
      return <span>-</span>;
    }
  }

  renderCO2() {
    const orders = this.props.sensordata.data;
    if (orders.message === undefined) {
      return orders.data[0].sensors.map((sensor) => {
        if (sensor.comp === "co2") {
          return <span>{Math.round(sensor.value * 10) / 10}</span>;
        } else {
          return null;
        }
      });
    } else {
      return <span>-</span>;
    }
  }

  renderVOC() {
    const orders = this.props.sensordata.data;
    if (orders.message === undefined) {
      return orders.data[0].sensors.map((sensor) => {
        if (sensor.comp === "voc") {
          return <span>{Math.round(sensor.value * 10) / 10}</span>;
        } else {
          return null;
        }
      });
    } else {
      return <span>-</span>;
    }
  }

  renderPM25() {
    const orders = this.props.sensordata.data;
    if (orders.message === undefined) {
      return orders.data[0].sensors.map((sensor) => {
        if (sensor.comp === "pm25") {
          return <span>{Math.round(sensor.value * 10) / 10}</span>;
        } else {
          return null;
        }
      });
    } else {
      return <span>-</span>;
    }
  }

  renderTempColor() {
    const orders = this.props.sensordata.data;
    if (orders.message === undefined) {
      return orders.data[0].sensors.map((sensor) => {
        if (sensor.comp === "temp") {
          if (sensor.value < 11 || sensor.value > 32) {
            return (
              <span
                className="d-flex"
                style={{
                  fontSize: "3em",
                  margin: "-1.5rem 0px -2rem 0px",
                  color: "#dd1111",
                }}
              >
                &#8226;
              </span>
            );
          } else if (sensor.value < 18 || sensor.value > 26) {
            return (
              <span
                className="d-flex"
                style={{
                  fontSize: "3em",
                  margin: "-1.5rem 0px -2rem 0px",
                  color: "#ffc124",
                }}
              >
                &#8226;
              </span>
            );
          } else {
            return (
              <span
                className="d-flex"
                style={{
                  fontSize: "3em",
                  margin: "-1.5rem 0px -2rem 0px",
                  color: "#1cdd11",
                }}
              >
                &#8226;
              </span>
            );
          }
        } else {
          return null;
        }
      });
    } else {
      return (
        <span
          className="d-flex"
          style={{
            fontSize: "3em",
            margin: "-1.5rem 0px -2rem 0px",
            color: "#adadad",
          }}
        >
          &#8226;
        </span>
      );
    }
  }

  renderHumidColor() {
    const orders = this.props.sensordata.data;
    if (orders.message === undefined) {
      return orders.data[0].sensors.map((sensor) => {
        if (sensor.comp === "humid") {
          if (sensor.value < 20 || sensor.value > 65) {
            return (
              <span
                className="d-flex"
                style={{
                  fontSize: "3em",
                  margin: "-1.5rem 0px -2rem 0px",
                  color: "#dd1111",
                }}
              >
                &#8226;
              </span>
            );
          } else if (sensor.value < 40 || sensor.value > 50) {
            return (
              <span
                className="d-flex"
                style={{
                  fontSize: "3em",
                  margin: "-1.5rem 0px -2rem 0px",
                  color: "#ffc124",
                }}
              >
                &#8226;
              </span>
            );
          } else {
            return (
              <span
                className="d-flex"
                style={{
                  fontSize: "3em",
                  margin: "-1.5rem 0px -2rem 0px",
                  color: "#1cdd11",
                }}
              >
                &#8226;
              </span>
            );
          }
        } else {
          return null;
        }
      });
    } else {
      return (
        <span
          className="d-flex"
          style={{
            fontSize: "3em",
            margin: "-1.5rem 0px -2rem 0px",
            color: "#adadad",
          }}
        >
          &#8226;
        </span>
      );
    }
  }

  renderCO2Color() {
    const orders = this.props.sensordata.data;
    if (orders.message === undefined) {
      return orders.data[0].sensors.map((sensor) => {
        if (sensor.comp === "co2") {
          if (sensor.value > 1500) {
            return (
              <span
                className="d-flex"
                style={{
                  fontSize: "3em",
                  margin: "-1.5rem 0px -2rem 0px",
                  color: "#dd1111",
                }}
              >
                &#8226;
              </span>
            );
          } else if (sensor.value > 600) {
            return (
              <span
                className="d-flex"
                style={{
                  fontSize: "3em",
                  margin: "-1.5rem 0px -2rem 0px",
                  color: "#ffc124",
                }}
              >
                &#8226;
              </span>
            );
          } else {
            return (
              <span
                className="d-flex"
                style={{
                  fontSize: "3em",
                  margin: "-1.5rem 0px -2rem 0px",
                  color: "#1cdd11",
                }}
              >
                &#8226;
              </span>
            );
          }
        } else {
          return null;
        }
      });
    } else {
      return (
        <span
          className="d-flex"
          style={{
            fontSize: "3em",
            margin: "-1.5rem 0px -2rem 0px",
            color: "#adadad",
          }}
        >
          &#8226;
        </span>
      );
    }
  }

  renderVOCColor() {
    const orders = this.props.sensordata.data;
    if (orders.message === undefined) {
      return orders.data[0].sensors.map((sensor) => {
        if (sensor.comp === "voc") {
          if (sensor.value > 3333) {
            return (
              <span
                className="d-flex"
                style={{
                  fontSize: "3em",
                  margin: "-1.5rem 0px -2rem 0px",
                  color: "#dd1111",
                }}
              >
                &#8226;
              </span>
            );
          } else if (sensor.value > 333) {
            return (
              <span
                className="d-flex"
                style={{
                  fontSize: "3em",
                  margin: "-1.5rem 0px -2rem 0px",
                  color: "#ffc124",
                }}
              >
                &#8226;
              </span>
            );
          } else {
            return (
              <span
                className="d-flex"
                style={{
                  fontSize: "3em",
                  margin: "-1.5rem 0px -2rem 0px",
                  color: "#1cdd11",
                }}
              >
                &#8226;
              </span>
            );
          }
        } else {
          return null;
        }
      });
    } else {
      return (
        <span
          className="d-flex"
          style={{
            fontSize: "3em",
            margin: "-1.5rem 0px -2rem 0px",
            color: "#adadad",
          }}
        >
          &#8226;
        </span>
      );
    }
  }

  renderPM25Color() {
    const orders = this.props.sensordata.data;
    if (orders.message === undefined) {
      return orders.data[0].sensors.map((sensor) => {
        if (sensor.comp === "pm25") {
          if (sensor.value > 55) {
            return (
              <span
                className="d-flex"
                style={{
                  fontSize: "3em",
                  margin: "-1.5rem 0px -2rem 0px",
                  color: "#dd1111",
                }}
              >
                &#8226;
              </span>
            );
          } else if (sensor.value > 15) {
            return (
              <span
                className="d-flex"
                style={{
                  fontSize: "3em",
                  margin: "-1.5rem 0px -2rem 0px",
                  color: "#ffc124",
                }}
              >
                &#8226;
              </span>
            );
          } else {
            return (
              <span
                className="d-flex"
                style={{
                  fontSize: "3em",
                  margin: "-1.5rem 0px -2rem 0px",
                  color: "#1cdd11",
                }}
              >
                &#8226;
              </span>
            );
          }
        } else {
          return null;
        }
      });
    } else {
      return (
        <span
          className="d-flex"
          style={{
            fontSize: "3em",
            margin: "-1.5rem 0px -2rem 0px",
            color: "#adadad",
          }}
        >
          &#8226;
        </span>
      );
    }
  }

  renderIAQNote() {
    const orders = this.props.sensordata.data;

    if (orders.message === undefined) {
      if (orders.data[0].score < 40) {
        return (
          <Alert key="primary" variant="danger">
            <strong>Danger:</strong> The air quality in the room is bad. Please
            check the sensor data and take consecutive measures. Leave the room
            immediately.
          </Alert>
        );
      } else if (orders.data[0].score < 70) {
        return (
          <Alert key="primary" variant="warning">
            <strong>Warning:</strong> The air quality in the room is fair.
            Please check the sensor data and take consecutive measures. Leave
            the room immediately if you are not feeling well.
          </Alert>
        );
      } else {
        return (
          <Alert key="primary" variant="success">
            <strong>Success:</strong> The air quality in the room is good.
            Please check the sensor data and take consecutive measures if the
            score is not normal.
          </Alert>
        );
      }
    } else {
      return (
        <Alert key="primary" variant="info">
          <strong>Info:</strong> Please search your device to see the IAQ score.
        </Alert>
      );
    }
  }

  renderTempNote() {
    const orders = this.props.sensordata.data;
    console.log(orders.message);
    if (orders.message === undefined) {
      return orders.data[0].sensors.map((sensor) => {
        if (sensor.comp === "temp") {
          if (sensor.value < 11 || sensor.value > 32) {
            if (sensor.value < 11) {
              return (
                <Alert key="primary" variant="danger">
                  <strong>Danger:</strong> The temperature in the room is very
                  low. Please take any measures below and evacuate immediately.
                  <ul>
                    <li>Open the windows and the doors</li>
                    <li>
                      Turn on the air conditioner and set the temperature to
                      25(&#8451;)
                    </li>
                  </ul>
                </Alert>
              );
            } else {
              return (
                <Alert key="primary" variant="danger">
                  <strong>Danger:</strong> The temperature in the room is very
                  high. Please take any measures below and evacuate immediately.
                  <ul>
                    <li>Open the windows and the doors</li>
                    <li>
                      Turn on the air conditioner and set the temperature to
                      18(&#8451;)
                    </li>
                  </ul>
                </Alert>
              );
            }
          } else if (sensor.value < 18 || sensor.value > 26) {
            if (sensor.value < 18) {
              return (
                <Alert key="primary" variant="warning">
                  <strong>Warning:</strong> The temperature in the room is low.
                  Please take any measures below and evacuate immediately if you
                  are not feeling well.
                  <ul>
                    <li>Open the windows and the doors</li>
                    <li>
                      Turn on the air conditioner and set the temperature to
                      25(&#8451;)
                    </li>
                  </ul>
                </Alert>
              );
            } else {
              return (
                <Alert key="primary" variant="warning">
                  <strong>Warning:</strong> The temperature in the room is high.
                  Please take any measures below and evacuate immediately if you
                  are not feeling well.
                  <ul>
                    <li>Open the windows and the doors</li>
                    <li>
                      Turn on the air conditioner and set the temperature to
                      18(&#8451;)
                    </li>
                  </ul>
                </Alert>
              );
            }
          } else {
            return null;
          }
        }
      });
    } else {
      return null;
    }
  }

  renderHumidNote() {
    const orders = this.props.sensordata.data;
    console.log(orders.message);
    if (orders.message === undefined) {
      return orders.data[0].sensors.map((sensor) => {
        if (sensor.comp === "humid") {
          if (sensor.value < 20 || sensor.value > 65) {
            if (sensor.value < 20) {
              return (
                <Alert key="primary" variant="danger">
                  <strong>Danger:</strong> The humidity in the room is very low.
                  Please take any measures below and evacuate immediately.
                  <ul>
                    <li>Turn on humidifiers</li>
                    <li>
                      Turn on the air conditioner and set the temperature to
                      25(&#8451;)
                    </li>
                  </ul>
                </Alert>
              );
            } else {
              return (
                <Alert key="primary" variant="danger">
                  <strong>Danger:</strong> The humidity in the room is very
                  high. Please take any measures below and evacuate immediately.
                  <ul>
                    <li>Turn on dehumidifier or ventilation fans</li>
                    <li>
                      Turn on the air conditioner and set the temperature to
                      18(&#8451;)
                    </li>
                  </ul>
                </Alert>
              );
            }
          } else if (sensor.value < 40 || sensor.value > 50) {
            if (sensor.value < 40) {
              return (
                <Alert key="primary" variant="warning">
                  <strong>Warning:</strong> The humidity in the room is low.
                  Please take any measures below and evacuate immediately if you
                  are not feeling well.
                  <ul>
                    <li>Turn on humidifiers</li>
                    <li>
                      Turn on the air conditioner and set the temperature to
                      25(&#8451;)
                    </li>
                  </ul>
                </Alert>
              );
            } else {
              return (
                <Alert key="primary" variant="warning">
                  <strong>Warning:</strong> The humidity in the room is high.
                  Please take any measures below and evacuate immediately if you
                  are not feeling well.
                  <ul>
                    <li>Turn on dehumidifier or ventilation fans</li>
                    <li>
                      Turn on the air conditioner and set the temperature to
                      18(&#8451;)
                    </li>
                  </ul>
                </Alert>
              );
            }
          } else {
            return null;
          }
        }
      });
    } else {
      return null;
    }
  }

  renderCO2Note() {
    const orders = this.props.sensordata.data;
    console.log(orders.message);
    if (orders.message === undefined) {
      return orders.data[0].sensors.map((sensor) => {
        if (sensor.comp === "co2") {
          if (sensor.value > 1500) {
            return (
              <Alert key="primary" variant="danger">
                <strong>Danger:</strong> The CO<sub>2</sub> concentration in the
                room is very high. Please take any measures below and evacuate
                immediately.
                <ul>
                  <li>Open any windows and doors</li>
                  <li>Turn on any ventilation device</li>
                </ul>
              </Alert>
            );
          } else if (sensor.value > 600) {
            return (
              <Alert key="primary" variant="warning">
                <strong>Warning:</strong> The CO<sub>2</sub> concentration in
                the room is high. Please take any measures below and evacuate
                immediately if you are not feeling well.
                <ul>
                  <li>Open any windows and doors</li>
                  <li>Turn on any ventilation device</li>
                </ul>
              </Alert>
            );
          } else {
            return null;
          }
        }
      });
    } else {
      return null;
    }
  }

  renderVOCNote() {
    const orders = this.props.sensordata.data;
    console.log(orders.message);
    if (orders.message === undefined) {
      return orders.data[0].sensors.map((sensor) => {
        if (sensor.comp === "voc") {
          if (sensor.value > 3333) {
            return (
              <Alert key="primary" variant="danger">
                <strong>Danger:</strong> The VOC<sub>s</sub> concentration in
                the room is very high. Please take any measures below and
                evacuate immediately.
                <ul>
                  <li>Open any windows and doors</li>
                  <li>Turn on any ventilation device</li>
                </ul>
              </Alert>
            );
          } else if (sensor.value > 333) {
            return (
              <Alert key="primary" variant="warning">
                <strong>Warning:</strong> The VOC<sub>s</sub> concentration in
                the room is high. Please take any measures below and evacuate
                immediately if you are not feeling well.
                <ul>
                  <li>Open any windows and doors</li>
                  <li>Turn on any ventilation device</li>
                </ul>
              </Alert>
            );
          } else {
            return null;
          }
        }
      });
    } else {
      return null;
    }
  }

  renderPM25Note() {
    const orders = this.props.sensordata.data;
    console.log(orders.message);
    if (orders.message === undefined) {
      return orders.data[0].sensors.map((sensor) => {
        if (sensor.comp === "pm25") {
          if (sensor.value > 55) {
            return (
              <Alert key="primary" variant="danger">
                <strong>Danger:</strong> The PM2.5 level in the room is very
                high. Please take any measures below and evacuate immediately.
                <ul>
                  <li>Open any windows and doors</li>
                  <li>Turn on any ventilation device</li>
                </ul>
              </Alert>
            );
          } else if (sensor.value > 15) {
            return (
              <Alert key="primary" variant="warning">
                <strong>Warning:</strong> The PM2.5 level in the room is high.
                Please take any measures below and evacuate immediately if you
                are not feeling well.
                <ul>
                  <li>Open any windows and doors</li>
                  <li>Turn on any ventilation device</li>
                </ul>
              </Alert>
            );
          } else {
            return null;
          }
        }
      });
    } else {
      return null;
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
                      <div>
                        {this.renderLocationAndDate()}

                        {this.props.sensordata.data
                          ? this.renderIAQScore()
                          : ""}

                        <div className="iaq">
                          {this.props.sensordata.data
                            ? this.renderTempColor()
                            : ""}
                          <span className="iaq-element">
                            Temperature (&#8451;)
                          </span>
                          <span className="d-flex iaq-element justify-content-end">
                            {this.props.sensordata.data
                              ? this.renderTemperature()
                              : ""}
                          </span>
                        </div>
                        <div className="iaq">
                          {this.props.sensordata.data
                            ? this.renderHumidColor()
                            : ""}
                          <span className="iaq-element">Humidity (&#37;)</span>
                          <span className="d-flex iaq-element justify-content-end">
                            {this.props.sensordata.data
                              ? this.renderHumidity()
                              : ""}
                          </span>
                        </div>
                        <div className="iaq">
                          {this.props.sensordata.data
                            ? this.renderCO2Color()
                            : ""}
                          <span className="iaq-element">
                            CO<sub>2</sub> (ppm)
                          </span>
                          <span className="d-flex iaq-element justify-content-end">
                            {this.props.sensordata.data ? this.renderCO2() : ""}
                          </span>
                        </div>
                        <div className="iaq">
                          {this.props.sensordata.data
                            ? this.renderVOCColor()
                            : ""}
                          <span className="iaq-element">
                            VOC<sub>s</sub> (ppb)
                          </span>
                          <span className="d-flex iaq-element justify-content-end">
                            {this.props.sensordata.data ? this.renderVOC() : ""}
                          </span>
                        </div>
                        <div className="iaq">
                          {this.props.sensordata.data
                            ? this.renderPM25Color()
                            : ""}
                          <span className="iaq-element">
                            PM2.5 (&#181;g/m&sup2;)
                          </span>
                          <span className="d-flex iaq-element justify-content-end">
                            {this.props.sensordata.data
                              ? this.renderPM25()
                              : ""}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-bg w-100 border d-flex flex-column">
                    <div className="p-4 d-flex flex-column h-100">
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="notes">
                          {this.props.sensordata.data
                            ? this.renderIAQNote()
                            : ""}
                          {this.props.sensordata.data
                            ? this.renderTempNote()
                            : ""}
                          {this.props.sensordata.data
                            ? this.renderHumidNote()
                            : ""}
                          {this.props.sensordata.data
                            ? this.renderCO2Note()
                            : ""}
                          {this.props.sensordata.data
                            ? this.renderVOCNote()
                            : ""}
                          {this.props.sensordata.data
                            ? this.renderPM25Note()
                            : ""}
                        </div>
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
