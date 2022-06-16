import React, { Component } from "react";
import { connect } from "react-redux";
import { getSearchedData } from "../../../actions/dataActions";
import "../../scss/Dashboard.css";

// AirData Score Board class
class Score extends Component {
  // render building number and floor number on top left of score board
  renderLocation(building, floor) {
    return (
      <div style={{ fontSize: 17 }} className="flex-row fw-light">
        <div>{building}</div>

        <div>{floor}</div>
      </div>
    );
  }

  // render current datetime on top right of score board
  renderDate() {
    return (
      <div
        style={{ fontSize: 17 }}
        className="d-flex flex-column align-items-end"
      >
        <div className=" fw-light">{new Date().toDateString()}</div>
        <div className=" fw-light">{new Date().toLocaleTimeString()}</div>
      </div>
    );
  }

  // render location and date according to device id
  renderLocationAndDate() {
    const orders = this.props.sensordata;
    // if user have not chosen any decive
    if (orders !== undefined) {
      const data = orders.data;
      // if json array object is returned
      if (data !== undefined) {
        if (data.length > 1) {
          if (data[1].device_id === "26203") {
            return (
              <div className="awair2 mb-4">
                {this.renderLocation("Building 10", "Floor 10")}
                {this.renderDate()}
              </div>
            );
          } else if (data[1].device_id === "25758") {
            return (
              <div className="awair2 mb-4">
                {this.renderLocation("Building 10", "Floor 9")}
                {this.renderDate()}
              </div>
            );
          } else {
            return null;
          }
        } else {
          return null;
        }
      }
    } else {
      return null;
    }
  }

  // render IAQ score
  renderScore(score) {
    return (
      <div>
        <div className="mt-4 d-flex justify-content-center">Awair Score</div>
        <h4 className=" mt-3 d-flex justify-content-center">{score}</h4>
      </div>
    );
  }

  // render Circle that display IAQ score
  renderCircle(bgColor, orders) {
    return (
      <div>
        <div
          className="numberCircleParent"
          style={{
            backgroundColor: bgColor,
          }}
        >
          <div
            className="numberCircle"
            style={{
              backgroundColor: bgColor,
            }}
          >
            <span>{orders}</span>
          </div>
        </div>
      </div>
    );
  }

  // display IAQ score condition
  renderIAQScore() {
    const orders = this.props.sensordata;
    // if props is not empty
    if (orders != undefined) {
      const data = orders.data;
      // if props object is not empty
      if (data !== undefined) {
        // if json object is returned
        if (data.length > 1) {
          // if the json object has the Airdata
          if (data[0].length > 0) {
            const length = data[0].length;
            if (data[0][length - 1].score < 40) {
              return (
                <div className="awair">
                  {this.renderCircle("#dd1111", data[0][length - 1].score)}
                  {this.renderScore("Bad")}
                </div>
              );
            } else if (data[0][length - 1].score < 70) {
              return (
                <div className="awair">
                  {this.renderCircle("#ffc124", data[0][length - 1].score)}
                  {this.renderScore("Fair")}
                </div>
              );
            } else {
              return (
                <div className="awair">
                  {this.renderCircle("#1cdd11", data[0][length - 1].score)}
                  {this.renderScore("Good")}
                </div>
              );
            }
          } else {
            return (
              <div className="awair">
                {this.renderCircle("#adadad", "?")}
                {this.renderScore("-")}
              </div>
            );
          }
        } else {
          return (
            <div className="awair">
              {this.renderCircle("#adadad", "?")}
              {this.renderScore("-")}
            </div>
          );
        }
      }
    }
  }

  // render other IAQ type score
  renderTypeScore(type) {
    const orders = this.props.sensordata;
    if (orders !== undefined) {
      const data = orders.data;
      if (data !== undefined) {
        if (data.length > 1) {
          if (data[0].length > 0) {
            const length = data[0].length;
            return data[0][length - 1].sensors.map((sensor) => {
              if (sensor.comp === type) {
                return (
                  <span key="{sensor.value}">
                    {Math.round(sensor.value * 10) / 10}
                  </span>
                );
              } else {
                return null;
              }
            });
          } else {
            return <span>-</span>;
          }
        } else {
          return <span>-</span>;
        }
      }
    }
  }

  // render bullet that change colour according to score
  // create for sensor value that is checked with two conditions
  renderTypeColor(type, range, range2, range3, range4) {
    const orders = this.props.sensordata;
    if (orders !== undefined) {
      const data = orders.data;
      if (data !== undefined) {
        if (data.length > 1) {
          if (data[0].length > 0) {
            const length = data[0].length;
            return data[0][length - 1].sensors.map((sensor) => {
              if (sensor.comp === type) {
                if (sensor.value < range || sensor.value > range2) {
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
                } else if (sensor.value < range3 || sensor.value > range4) {
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
                      key="{sensor.value}"
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
    }
  }

  // render bullet that change colour according to score
  // create for sensor value that is checked with one condition
  renderType2Color(type, range, range2) {
    const orders = this.props.sensordata;
    if (orders !== undefined) {
      const data = orders.data;
      if (data !== undefined) {
        if (data.length > 1) {
          if (data[0].length > 0) {
            const length = data[0].length;
            return data[0][length - 1].sensors.map((sensor) => {
              if (sensor.comp === type) {
                if (sensor.value > range) {
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
                } else if (sensor.value > range2) {
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
                      key="{sensor.value}"
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
    }
  }

  render() {
    return (
      <div>
        {this.renderLocationAndDate()}
        {this.props.sensordata ? this.renderIAQScore() : ""}
        <div className="iaq">
          {this.props.sensordata
            ? this.renderTypeColor("temp", 11, 32, 18, 26)
            : ""}
          <span className="iaq-element">Temperature (&#8451;)</span>
          <span className="d-flex iaq-element justify-content-end">
            {this.props.sensordata ? this.renderTypeScore("temp") : ""}
          </span>
        </div>
        <div className="iaq">
          {this.props.sensordata
            ? this.renderTypeColor("humid", 20, 65, 40, 50)
            : ""}
          <span className="iaq-element">Humidity (&#37;)</span>
          <span className="d-flex iaq-element justify-content-end">
            {this.props.sensordata ? this.renderTypeScore("humid") : ""}
          </span>
        </div>
        <div className="iaq">
          {this.props.sensordata ? this.renderType2Color("co2", 1500, 600) : ""}
          <span className="iaq-element">
            CO<sub>2</sub> (ppm)
          </span>
          <span className="d-flex iaq-element justify-content-end">
            {this.props.sensordata ? this.renderTypeScore("co2") : ""}
          </span>
        </div>
        <div className="iaq">
          {this.props.sensordata ? this.renderType2Color("voc", 3333, 333) : ""}
          <span className="iaq-element">
            VOC<sub>s</sub> (ppb)
          </span>
          <span className="d-flex iaq-element justify-content-end">
            {this.props.sensordata ? this.renderTypeScore("voc") : ""}
          </span>
        </div>
        <div className="iaq">
          {this.props.sensordata ? this.renderType2Color("pm25", 55, 15) : ""}
          <span className="iaq-element">PM2.5 (&#181;g/m&sup2;)</span>
          <span className="d-flex iaq-element justify-content-end">
            {this.props.sensordata ? this.renderTypeScore("pm25") : ""}
          </span>
        </div>
      </div>
    );
  }
}

// selecting the AirData from the store that score board needs.
// It is called every time the store state changes
const mapStateToProps = (state) => {
  return { sensordata: state.datas }; // return json object of AirData
};
export default connect(mapStateToProps, { getSearchedData })(Score);
