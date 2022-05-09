import React, { Component } from "react";
import { CDBContainer } from "cdbreact";
import "../scss/Dashboard.css";
import Sidebar from "../Layout/Sidebar";
import Header from "../Layout/Header";
import { Form, FormControl, Button } from "react-bootstrap";

class Data extends Component {
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
                <h3>Survey</h3>
              </div>
              <div className="d-flex card-section">
                <div className="cards-container">
                  <div className="card-bg w-100 border d-flex flex-column">
                    <div className="p-4 d-flex flex-column h-100">
                      <span className="mt-2 mb-3">
                        How do you feel about your indoor environment?
                      </span>
                      <Form>
                        {["checkbox"].map((type) => (
                          <div key={`default-${type}`} className="mb-3">
                            <Form.Check
                              type={type}
                              id={`default-${type}`}
                              label={`Feeling hot`}
                            />

                            <Form.Check
                              type={type}
                              id={`default-${type}`}
                              label={`Mildew or musty odors smell`}
                            />

                            <Form.Check
                              type={type}
                              id={`default-${type}`}
                              label={`Thin air`}
                            />

                            <Form.Check
                              type={type}
                              id={`default-${type}`}
                              label={`Pungent smell`}
                            />

                            <Form.Check
                              type={type}
                              id={`default-${type}`}
                              label={`Dusty air`}
                            />

                            <Form.Check
                              type={type}
                              id={`default-${type}`}
                              label={`Others`}
                            />

                            <Form.Check
                              type={type}
                              id={`default-${type}`}
                              label={`None of the above`}
                            />
                          </div>
                        ))}
                      </Form>
                      <div className="d-flex"></div>
                    </div>
                  </div>
                  <div className="card-bg w-100 border d-flex flex-column">
                    <div className="p-4 d-flex flex-column h-100">
                      <span className="mt-2 mb-3">
                        Possible sources of air pollution
                      </span>
                      <Form>
                        {["text"].map((type) => (
                          <div key={`default-${type}`} className="mb-3">
                            <Form.Control
                              as="textarea"
                              rows={3}
                              type={type}
                              id={`default-${type}`}
                              label={`Feeling hot`}
                            />
                          </div>
                        ))}
                      </Form>
                      <div className="d-flex"></div>
                    </div>
                  </div>
                  <div className="card-bg w-100 border d-flex flex-column">
                    <div className="p-4 d-flex flex-column h-100">
                      <span className="mt-2 mb-3">
                        Do you have any health symptoms?
                      </span>
                      <Form>
                        {["checkbox"].map((type) => (
                          <div key={`default-${type}`} className="mb-3">
                            <Form.Check
                              type={type}
                              id={`default-${type}`}
                              label={`Dizziness`}
                            />

                            <Form.Check
                              type={type}
                              id={`default-${type}`}
                              label={`Headaches`}
                            />

                            <Form.Check
                              type={type}
                              id={`default-${type}`}
                              label={`Breathing difficulties`}
                            />

                            <Form.Check
                              type={type}
                              id={`default-${type}`}
                              label={`Fatigue`}
                            />

                            <Form.Check
                              type={type}
                              id={`default-${type}`}
                              label={`Eye irritation`}
                            />

                            <Form.Check
                              type={type}
                              id={`default-${type}`}
                              label={`Skin irritation`}
                            />

                            <Form.Check
                              type={type}
                              id={`default-${type}`}
                              label={`Respiratory irritation`}
                            />

                            <Form.Check
                              type={type}
                              id={`default-${type}`}
                              label={`Others`}
                            />

                            <Form.Check
                              type={type}
                              id={`default-${type}`}
                              label={`None of the above`}
                            />
                          </div>
                        ))}
                      </Form>
                      <div className="d-flex"></div>
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

export default Data;
