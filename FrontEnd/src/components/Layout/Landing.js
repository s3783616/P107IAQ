import React, { Component } from "react";

class Landing extends Component {
  render() {
    return (
      <div className="landing">
        <div>
          <div className={"container"}>
            <p className={"display-1 mx-auto text-center mt-5"}>
              {this.props.book ? "Recently added" : "Results"}
            </p>
          </div>
          <div className="d-flex p-2 bd-highlight  justify-content-center">
            {this.props.book ? this.renderBooks() : ""}
          </div>
          <div className="d-flex p-2 bd-highlight  justify-content-center">
            {this.props.searchedBooks ? this.renderSearchedBooks() : ""}
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
