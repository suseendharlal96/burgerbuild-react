import React, { Component } from "react";
import { Route } from "react-router-dom";

import CheckoutSummary from "../../components/Orders/CheckoutSummary/CheckoutSummary";
import ContactForm from "./ContactForm/ContactForm";

class Checkout extends Component {
  state = {
    ingredients: {
      salad: 0,
      cheese: 0,
      meat: 0,
      bacon: 0,
    },
    price: 0,
  };

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let price = 0;
    for (let value of query.entries()) {
      console.log(value);
      if (value[0] === "price") {
        price = value[1];
      } else {
        ingredients[value[0]] = +value[1];
      }
    }
    this.setState({ ingredients: ingredients });
    this.setState({ price: price });
  }
  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          price={this.state.price}
          closeSummary={() => this.props.history.replace("/")}
          continue={() => this.props.history.replace("/checkout/contact-form")}
        />
        <Route
          path={this.props.match.path + "/contact-form"}
          render={(props) => (
            <ContactForm
              ingredients={this.state.ingredients}
              price={this.state.price}
              {...props}
            />
          )}
        />
      </div>
    );
  }
}

export default Checkout;
