import React, { Component } from "react";
import { CDBContainer } from "cdbreact";
import { Alert, Form, FormControl, Button } from "react-bootstrap";
import "../scss/Dashboard.css";
import Sidebar from "../Layout/Sidebar";
import Header from "../Layout/Header";

class Dashboard2 extends Component {
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
              <div className="d-flex justify-content-start ml-5 mt-4">
                <h3>Dashboard</h3>
              </div>
              <div className="d-flex card-section">
                <div className="cards-container">
                  <div className="card-bg w-100 border d-flex flex-column">
                    <div className="p-4 d-flex flex-column h-100">
                      <span className="mb-2">Enter location</span>
                      <Form className="d-flex">
                        <FormControl
                          type="search"
                          placeholder="Search"
                          className="me-2"
                          aria-label="Search"
                        />
                        <Button variant="outline-primary">Search</Button>
                      </Form>
                      <div className="d-flex"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="d-flex card-section">
                <div className="cards-container-2">
                  <div className="card-bg w-100 border d-flex flex-column">
                    <div className="p-4 d-flex flex-column h-100">
                      <div>
                        <div className="awair">
                          <div class="numberCircle">30</div>
                          <div>
                            <div className="p-2 d-flex">Awair Score</div>
                            <h3 className="p-1 m-1 d-flex">Good</h3>
                          </div>
                        </div>

                        <div className="iaq">
                          <span
                            className="d-flex"
                            style={{
                              fontSize: "3em",
                              margin: "-1.5rem 0px -2rem 0px",
                              color: "#1CDD11",
                            }}
                          >
                            &#8226;
                          </span>
                          <span className="iaq-element">
                            Temperature (&#8457;)
                          </span>
                          <span className="d-flex iaq-element justify-content-end">
                            89
                          </span>
                        </div>
                        <div className="iaq">
                          <span
                            className="d-flex"
                            style={{
                              fontSize: "3em",
                              margin: "-1.5rem 0px -2rem 0px",
                              color: "#1CDD11",
                            }}
                          >
                            &#8226;
                          </span>
                          <span className="iaq-element">Humidity (&#37;)</span>
                          <span className="d-flex iaq-element justify-content-end">
                            42
                          </span>
                        </div>
                        <div className="iaq">
                          <span
                            className="d-flex"
                            style={{
                              fontSize: "3em",
                              margin: "-1.5rem 0px -2rem 0px",
                              color: "#DD1111",
                            }}
                          >
                            &#8226;
                          </span>
                          <span className="iaq-element">
                            CO<sub>2</sub> (ppm)
                          </span>
                          <span className="d-flex iaq-element justify-content-end">
                            2856
                          </span>
                        </div>
                        <div className="iaq">
                          <span
                            className="d-flex"
                            style={{
                              fontSize: "3em",
                              margin: "-1.5rem 0px -2rem 0px",
                              color: "#1CDD11",
                            }}
                          >
                            &#8226;
                          </span>
                          <span className="iaq-element">
                            VOC<sub>s</sub> (ppb)
                          </span>
                          <span className="d-flex iaq-element justify-content-end">
                            118
                          </span>
                        </div>
                        <div className="iaq">
                          <span
                            className="d-flex"
                            style={{
                              fontSize: "3em",
                              margin: "-1.5rem 0px -2rem 0px",
                              color: "#FFD323",
                            }}
                          >
                            &#8226;
                          </span>
                          <span className="iaq-element">
                            PM2.5 (&#181;g/m&sup2;)
                          </span>
                          <span className="d-flex iaq-element justify-content-end">
                            23
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-bg w-100 border d-flex flex-column">
                    <div className="p-4 d-flex flex-column h-100">
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="notes">
                          <Alert key="primary" variant="danger">
                            <strong>Danger:</strong> The CO<sub>2</sub>{" "}
                            concentration in the room is at a critical level
                            <ul>
                              <li>
                                Air the rooms: it is recommended to open the
                                windows and the doors regularly to reduce the
                                effects of confinement.
                              </li>
                              <li>
                                Have a good ventilation: an efficient
                                ventilation system is recommended to ensure a
                                good air renewal.
                              </li>
                              <li>
                                Controlling pollution sources: there are many
                                sources of pollution and it is important to
                                limit them. It is essential to choose the
                                furniture carefully, to use “healthy” cleaning
                                products or to isolate the photocopiers etc.
                              </li>
                            </ul>
                          </Alert>
                          <Alert key="primary" variant="warning">
                            <strong>Warning:</strong> The PM2.5 concentration in
                            the room is at a critical level
                            <ul>
                              <li>
                                Air the rooms: it is recommended to open the
                                windows and the doors regularly to reduce the
                                effects of confinement.
                              </li>
                              <li>
                                Have a good ventilation: an efficient
                                ventilation system is recommended to ensure a
                                good air renewal.
                              </li>
                              <li>
                                Controlling pollution sources: there are many
                                sources of pollution and it is important to
                                limit them. It is essential to choose the
                                furniture carefully, to use “healthy” cleaning
                                products or to isolate the photocopiers etc.
                              </li>
                            </ul>
                          </Alert>
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

export default Dashboard2;
