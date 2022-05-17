import React, { Component } from "react";
import { connect } from "react-redux";
import { getOrders } from "../../actions/orderActions";

class SearchBar extends Component {
  state = {
    searchTerm: undefined,
    searchType: undefined,
    searchOptionsToggled: false,
    statusOptions: {
      pending: false,
      fulfillment: false,
      shipped: false,
      completed: false,
      cancelled: false,
    },
  };

  onSearchTextChange = (e) => {
    e.preventDefault();
    this.setState({ searchTerm: e.target.value });
  };

  onSearchFieldChange = (e) => {
    e.preventDefault();
    this.setState({ searchType: e.target.attributes.value.nodeValue });
  };

  onSearchSubmit = (e) => {
    e.preventDefault();
    let statusOptions = Object.keys(this.state.statusOptions)
      .filter((k) => this.state.statusOptions[k])
      .join("~");
    this.props.onSearchSubmit(
      this.state.searchTerm,
      this.state.searchType,
      statusOptions
    );
  };

  onAdvancedSearchToggle = (e) => {
    e.preventDefault();
    this.setState({ searchOptionsToggled: !this.state.searchOptionsToggled });
  };

  onStatusOptionToggle = (option, value) => {
    this.setState({
      statusOptions: { ...this.state.statusOptions, [option]: value },
    });
  };

  render() {
    return (
      <div>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Search for a customer"
            onChange={(e) => this.onSearchTextChange(e)}
          />

          <button
            className="btn btn-outline-success"
            type="button"
            onClick={(e) => this.onSearchSubmit(e)}
          >
            Search
          </button>
          <button
            className="btn btn-outline-danger"
            type="button"
            onClick={() => window.location.reload()}
          >
            Reset
          </button>
        </div>
        <div>
          <p className="mt-2" onClick={(e) => this.onAdvancedSearchToggle(e)}>
            Advanced Options
            <i
              className={`bi bi-caret-${
                this.state.searchOptionsToggled === false ? "down" : "up"
              }-fill`}
            />
          </p>
          <div
            className={`btn-group ${
              this.state.searchOptionsToggled === false
                ? "invisible"
                : "visible"
            }`}
            role="group"
            aria-label="Basic checkbox toggle button group"
          >
            <input
              type="checkbox"
              className="btn-check"
              id="btncheck1"
              autoComplete="off"
              onClick={() =>
                this.onStatusOptionToggle(
                  "pending",
                  !this.state.statusOptions.pending
                )
              }
            />
            <label className="btn btn-outline-primary" htmlFor="btncheck1">
              Pending
            </label>

            <input
              type="checkbox"
              className="btn-check"
              id="btncheck2"
              autoComplete="off"
              onClick={() =>
                this.onStatusOptionToggle(
                  "fulfillment",
                  !this.state.statusOptions.fulfillment
                )
              }
            />
            <label className="btn btn-outline-primary" htmlFor="btncheck2">
              Fulfillment
            </label>

            <input
              type="checkbox"
              className="btn-check"
              id="btncheck3"
              autoComplete="off"
              onClick={() =>
                this.onStatusOptionToggle(
                  "shipped",
                  !this.state.statusOptions.shipped
                )
              }
            />
            <label className="btn btn-outline-primary" htmlFor="btncheck3">
              Shipped
            </label>

            <input
              type="checkbox"
              className="btn-check"
              id="btncheck4"
              autoComplete="off"
              onClick={() =>
                this.onStatusOptionToggle(
                  "completed",
                  !this.state.statusOptions.completed
                )
              }
            />
            <label className="btn btn-outline-primary" htmlFor="btncheck4">
              Completed
            </label>

            <input
              type="checkbox"
              className="btn-check"
              id="btncheck5"
              autoComplete="off"
              onClick={() =>
                this.onStatusOptionToggle(
                  "cancelled",
                  !this.state.statusOptions.cancelled
                )
              }
            />
            <label className="btn btn-outline-primary" htmlFor="btncheck5">
              Cancelled
            </label>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { orders: state.orders };
};
export default connect(mapStateToProps, { getOrders })(SearchBar);
