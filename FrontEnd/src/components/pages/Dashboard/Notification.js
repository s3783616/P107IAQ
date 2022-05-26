import React, { Component } from "react";
import { connect } from "react-redux";
import { getSearchedData } from "../../../actions/dataActions";
import { Alert } from "react-bootstrap";
import "../../scss/Dashboard.css";

class Notification extends Component {
  renderIAQNote() {
    const orders = this.props.sensordata.data;
    if (orders.length > 1) {
      if (orders[0].length > 0) {
        if (orders[0].score < 40) {
          return (
            <Alert key="primary" variant="danger">
              <strong>Danger:</strong> The air quality in the room is bad.
              Please check the sensor data and take consecutive measures. Leave
              the room immediately.
            </Alert>
          );
        } else if (orders[0].score < 70) {
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
            <strong>Info:</strong> Please wait for a few seconds and try again.
            The sensor is currently accessing the data...
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
    if (orders.length > 1) {
      if (orders[0].length > 0) {
        const length = orders[0].length - 1;
        return orders[0][length].sensors.map((sensor) => {
          if (sensor.comp === "temp") {
            if (sensor.value < 11 || sensor.value > 32) {
              if (sensor.value < 11) {
                return (
                  <Alert key="primary" variant="danger">
                    <strong>Danger:</strong> The temperature in the room is very
                    low. Please take any measures below and evacuate
                    immediately.
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
                    high. Please take any measures below and evacuate
                    immediately.
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
                    <strong>Warning:</strong> The temperature in the room is
                    low. Please take any measures below and evacuate immediately
                    if you are not feeling well.
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
                    <strong>Warning:</strong> The temperature in the room is
                    high. Please take any measures below and evacuate
                    immediately if you are not feeling well.
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
          } else {
            return null;
          }
        });
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  renderHumidNote() {
    const orders = this.props.sensordata.data;
    if (orders.length > 1) {
      if (orders[0].length > 0) {
        const length = orders[0].length - 1;
        return orders[0][length].sensors.map((sensor) => {
          if (sensor.comp === "humid") {
            if (sensor.value < 20 || sensor.value > 65) {
              if (sensor.value < 20) {
                return (
                  <Alert key="primary" variant="danger">
                    <strong>Danger:</strong> The humidity in the room is very
                    low. Please take any measures below and evacuate
                    immediately.
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
                    high. Please take any measures below and evacuate
                    immediately.
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
                    Please take any measures below and evacuate immediately if
                    you are not feeling well.
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
                    Please take any measures below and evacuate immediately if
                    you are not feeling well.
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
          } else {
            return null;
          }
        });
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  renderCO2Note() {
    const orders = this.props.sensordata.data;
    if (orders.length > 1) {
      if (orders[0].length > 0) {
        const length = orders[0].length - 1;
        return orders[0][length].sensors.map((sensor) => {
          if (sensor.comp === "co2") {
            if (sensor.value > 1500) {
              return (
                <Alert key="primary" variant="danger">
                  <strong>Danger:</strong> The CO<sub>2</sub> concentration in
                  the room is very high. Please take any measures below and
                  evacuate immediately.
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
          } else {
            return null;
          }
        });
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  renderVOCNote() {
    const orders = this.props.sensordata.data;
    if (orders.length > 1) {
      if (orders[0].length > 0) {
        const length = orders[0].length - 1;
        return orders[0][length].sensors.map((sensor) => {
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
          } else {
            return null;
          }
        });
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  renderPM25Note() {
    const orders = this.props.sensordata.data;
    if (orders.length > 1) {
      if (orders[0].length > 0) {
        const length = orders[0].length - 1;
        return orders[0][length].sensors.map((sensor) => {
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
          } else {
            return null;
          }
        });
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  render() {
    return (
      <div className="notes">
        {this.props.sensordata.data ? this.renderIAQNote() : ""}
        {this.props.sensordata.data ? this.renderTempNote() : ""}
        {this.props.sensordata.data ? this.renderHumidNote() : ""}
        {this.props.sensordata.data ? this.renderCO2Note() : ""}
        {this.props.sensordata.data ? this.renderVOCNote() : ""}
        {this.props.sensordata.data ? this.renderPM25Note() : ""}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { sensordata: state.datas };
};
export default connect(mapStateToProps, { getSearchedData })(Notification);
