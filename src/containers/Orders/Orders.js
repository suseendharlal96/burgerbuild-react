import React, { Component } from "react";

import axios from "../../axios-orders";
import Order from "../../components/Orders/CheckoutSummary/Order";

class Orders extends Component {
  state = {
    orders: [],
    loading: true,
  };
  componentDidMount() {
    axios
      .get("/orders.json")
      .then((res) => {
        console.log(res.data);
        const a = [];
        for (let key in res.data) {
          a.push({ ...res.data[key], id: key });
        }
        this.setState({ orders: a, loading: false });
      })
      .catch((err) => {
        this.setState({ loading: false });
        console.log(err);
      });
  }

  render() {
    console.log(this.state.orders);
    return (
      <div>
        {this.state.orders.map((order) => {
          return (
            <Order
              key={order.id}
              price={order.price}
              ingredients={order.ingredients}
            />
          );
        })}
      </div>
    );
  }
}

export default Orders;
