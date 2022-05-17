import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getOrders,
  getSearchedOrders,
  cancelOrder,
} from "../../actions/orderActions";
import { Link } from "react-router-dom";
import SearchBar from "../Layout/SearchBar";

class OrderList extends Component {
  state = {
    refresh: false,
  };

  constructor(props) {
    super(props);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.onCancelModalClick = this.onCancelModalClick.bind(this);
    this.setState({ refresh: false });
  }

  onSearchSubmit(searchTerm, searchType, statusOptions) {
    this.props.getSearchedOrders(searchTerm, searchType, statusOptions);
  }

  componentDidMount() {
    this.props.getOrders();
  }

  onCancelModalClick = (e, order) => {
    let orderId = document.querySelector("#delete-order-id");
    let del_order = document.querySelector("#delete-order");
    del_order.addEventListener("click", () => {
      this.props.cancelOrder(order);
      setTimeout(function () {
        window.location.reload();
      }, 1000);
    });
    orderId.innerHTML = order.id;
  };

  renderOrderItems() {
    const orders = this.props.orderss.orders3.sort((a, b) => a.id - b.id);
    console.log(orders);
    return orders.map((order) => {
      return (
        <tr>
          <td>{order.id}</td>
          <td>{order.userId}</td>
          <td>{order.status}</td>
          <td>{order.paid ? "TRUE" : "FALSE"}</td>
          <td>{order.create_At}</td>
          <td>
            <Link
              to={{ pathname: `/orders/${order.id}`, state: { order } }}
              className="btn btn-warning mr-3"
            >
              View
            </Link>
            {order.status == "CANCELLED" ? null : (
              <button
                type="button"
                className="btn btn-danger"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onClick={(e) => this.onCancelModalClick(e, order)}
              >
                Cancel
              </button>
            )}
          </td>
          <td>
            {order.orderLineItems.map((oli) => {
              return (
                <tr>
                  <td>{oli.orderLineNumber}</td>
                  <td>{oli.isbn}</td>
                </tr>
              );
            })}
          </td>
          <td>{order.orderLineItems[0].id}</td>
        </tr>
      );
    });
  }

  renderOrderResults() {
    return this.props.orders.results.map((order) => {
      return (
        <tr key={order.id}>
          <td>{order.id}</td>
          <td>{order.customerId}</td>
          <td>{order.status}</td>
          <td>{order.paid ? "TRUE" : "FALSE"}</td>
          <td>{order.create_At}</td>

          <td>
            <Link
              to={{ pathname: `/orders/${order.id}`, state: { order } }}
              className="btn btn-warning"
            >
              View
            </Link>
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div className={"w-75 mx-auto"}>
        <h1 className={"mb-5"}>Orders</h1>
        <SearchBar onSearchSubmit={this.onSearchSubmit} />
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer Id</th>
              <th>Status</th>
              <th>Paid?</th>
              <th>Created</th>
              <th>Actions</th>
              <th>New</th>
              <th>New2</th>
            </tr>
          </thead>
          <tbody>
            {this.props.orderss.orders3 ? this.renderOrderItems() : ""}
            {this.props.orderss.results ? this.renderOrderResults() : ""}
          </tbody>
        </table>

        {/*    Modal    */}
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Cancel Order
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                Are you sure you want to cancel Order #
                <span id="delete-order-id">X</span>? This action is
                irreversible.
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  id="delete-order"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return { orderss: state.orders2 };
};
export default connect(mapStateToProps, {
  getOrders,
  getSearchedOrders,
  cancelOrder,
})(OrderList);
