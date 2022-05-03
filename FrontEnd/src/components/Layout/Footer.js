import React, { Component } from "react";

class Footer extends Component {
  render() {
    return (
      <div>
        <div class="navbar navbar-expand-lg navbar-light justify-content-center fixed-bottom">
          <ul class="nav pb-1 mb-1">
            <li class="nav-item">
              <a href="about" class="nav-link" style={{ color: "grey" }}>
                About us
              </a>
            </li>
            <li class="nav-item">
              <a href="contact" class="nav-link" style={{ color: "grey" }}>
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Footer;
