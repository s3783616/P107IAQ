import React, { Component } from "react";

class OrderDetail extends Component {
  formatter = Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
  });

  renderOrderLineItems() {
    return this.props.location.state.order.orderLineItems.map((oli) => {
      return (
        <tr>
          <td>{oli.orderLineNumber}</td>
          <td>{oli.isbn}</td>
          <td>{this.formatter.format(oli.netAmount)}</td>
          <td>{this.formatter.format(oli.taxAmount)}</td>
          <td>{this.formatter.format(oli.totalAmount)}</td>
        </tr>
      );
    });
  }

  calculateSubTotals() {
    let net = 0.0;
    let tax = 0.0;
    let total = 0.0;
    for (
      let i = 0;
      i < this.props.location.state.order.orderLineItems.length;
      i++
    ) {
      let oli = this.props.location.state.order.orderLineItems[i];
      net = net + parseFloat(oli.netAmount);
      tax = tax + parseFloat(oli.taxAmount);
      total = total + parseFloat(oli.totalAmount);
    }
    return (
      <React.Fragment>
        <tr>
          <td colSpan={3}></td>
          <td>
            <b>Net Amount</b>
          </td>
          <td>{this.formatter.format(net)}</td>
        </tr>
        <tr>
          <td colSpan={3}></td>
          <td>
            <b>Tax Amount</b>
          </td>
          <td>{this.formatter.format(tax)}</td>
        </tr>
        <tr>
          <td colSpan={3}></td>
          <td>
            <b>Total Amount</b>
          </td>
          <td>{this.formatter.format(total)}</td>
        </tr>
      </React.Fragment>
    );
  }

  render() {
    const order = this.props.location.state.order;
    return (
      <div className="w-50 mx-auto">
        <h1>Order: #{order.id} </h1>
        <p>
          <b>Customer ID: </b>
          {order.customerId}
        </p>
        <p>
          <b>Created on: </b>
          {order.create_At}
        </p>
        <p>
          <b>Paid?: </b>
          {order.paid ? "TRUE" : "FALSE"}
        </p>
        <p>
          <b>Status: </b>
          {order.status}
        </p>
        <p>
          <b>Last Updated: </b>
          {order.update_At}
        </p>
        <hr className="my-5" />
        <h2>Items</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Line Number</th>
              <th>ISBN</th>
              <th>Net</th>
              <th>Tax</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {this.renderOrderLineItems()}
            {this.calculateSubTotals()}
          </tbody>
        </table>
      </div>
    );
  }
}

export default OrderDetail;
