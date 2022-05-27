import React, { Component } from "react";
import { Table } from "react-bootstrap";
import "../scss/Dashboard.css";
import "../scss/Guide.css";
import Sidebar from "../Layout/Sidebar";
import Header from "../Layout/Header";

class Guide extends Component {
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
            <div style={{ height: "calc(100% - 60px)", overflowY: "scroll" }}>
              <div className="d-flex justify-content-start ml-5 mt-4">
                <h3>Data Guide</h3>
              </div>
              <div className="d-flex card-section">
                <div className="cards-container">
                  <div className="card-bg w-100 border d-flex flex-column">
                    <Table bordered hover>
                      <thead>
                        <tr>
                          <th>Type</th>
                          <th style={{ width: "250px" }}>Type Description</th>
                          <th>Units</th>
                          <th style={{ width: "250px" }}>Units Description</th>
                          <th>Rating</th>
                          <th>Range</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td rowspan="5">Temp</td>
                          <td rowspan="5">Temperature</td>
                          <td rowspan="5">&#8451;</td>
                          <td rowspan="5">degree Celcius</td>
                          <td>>32</td>
                          <td className="row-bad text-white">
                            <span>Bad</span>
                          </td>
                        </tr>
                        <tr>
                          <td>25-32</td>
                          <td className="row-fair text-white">Fair</td>
                        </tr>
                        <tr>
                          <td>18-25</td>
                          <td className="row-good text-white">Good</td>
                        </tr>
                        <tr>
                          <td>11-18</td>
                          <td className="row-fair text-white">Fair</td>
                        </tr>
                        <tr>
                          <td>11></td>
                          <td className="row-bad text-white">Bad</td>
                        </tr>
                        <tr>
                          <td rowspan="5">Humid</td>
                          <td rowspan="5">Relative Humidity</td>
                          <td rowspan="5">&#37;</td>
                          <td rowspan="5">relative humidity (RH%)</td>
                          <td>>65</td>
                          <td className="row-bad text-white">
                            <span>Bad</span>
                          </td>
                        </tr>
                        <tr>
                          <td>50-65</td>
                          <td className="row-fair text-white">Fair</td>
                        </tr>
                        <tr>
                          <td>40-50</td>
                          <td className="row-good text-white">Good</td>
                        </tr>
                        <tr>
                          <td>20-40</td>
                          <td className="row-fair text-white">Fair</td>
                        </tr>
                        <tr>
                          <td>20></td>
                          <td className="row-bad text-white">Bad</td>
                        </tr>
                        <tr>
                          <td rowspan="3">
                            CO<sub>2</sub>
                          </td>
                          <td rowspan="3">Carbon Dioxide</td>
                          <td rowspan="3">ppm</td>
                          <td rowspan="3">parts per million</td>
                          <td>400-600</td>
                          <td className="row-good text-white">
                            <span>Good</span>
                          </td>
                        </tr>
                        <tr>
                          <td>600-1500</td>
                          <td className="row-fair text-white">Fair</td>
                        </tr>
                        <tr>
                          <td>>1500</td>
                          <td className="row-bad text-white">Bad</td>
                        </tr>
                        <tr>
                          <td rowspan="3">
                            VOC<sub>s</sub>
                          </td>
                          <td rowspan="3">
                            Total Volatile Organic Compounds (TVOCs)
                          </td>
                          <td rowspan="3">ppb</td>
                          <td rowspan="3">parts per billion</td>
                          <td>>0-333</td>
                          <td className="row-good text-white">
                            <span>Good</span>
                          </td>
                        </tr>
                        <tr>
                          <td>333-3333</td>
                          <td className="row-fair text-white">Fair</td>
                        </tr>
                        <tr>
                          <td>>3333</td>
                          <td className="row-bad text-white">Bad</td>
                        </tr>
                        <tr>
                          <td rowspan="3">PM2.5</td>
                          <td rowspan="3">
                            Particulate Matter (PM2.5 - Fine Dust)
                          </td>
                          <td rowspan="3">μg/m³ </td>
                          <td rowspan="3">micrograms per meter cubed</td>
                          <td>0-15</td>
                          <td className="row-good text-white">
                            <span>Good</span>
                          </td>
                        </tr>
                        <tr>
                          <td>15-55</td>
                          <td className="row-fair text-white">Fair</td>
                        </tr>
                        <tr>
                          <td>>55</td>
                          <td className="row-bad text-white">Bad</td>
                        </tr>
                      </tbody>
                    </Table>
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

export default Guide;
