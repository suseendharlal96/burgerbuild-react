import React from "react";

import Auxi from "../../hoc/Auxilary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Summary from "../../components/Burger/OrderSummary/OrderSummary";
import Modal from "../../components/UI/Modal/Modal";
import axios from "../../axios-orders";

const PRICE = {
  salad: 1,
  cheese: 1,
  meat: 1,
  bacon: 1,
};

class Burgerbuild extends React.Component {
  state = {
    ingredients: null,
    price: 0,
    purchasable: false,
    purchased: false,
  };

  componentDidMount() {
    console.log(this.props);
    axios
      .get("/ingredients.json")
      .then((res) => {
        console.log(res);
        this.setState({ ingredients: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
    if (this.state.ingredients) {
      this.updatepurchase(this.state.ingredients);
    }
  }

  updatepurchase = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({ purchasable: sum > 0 });
  };

  additemsHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const newIngredients = {
      ...this.state.ingredients,
    };
    newIngredients[type] = updatedCount;
    const oldPrice = this.state.price;
    const addedPrice = PRICE[type];
    const updatedPrice = oldPrice + addedPrice;
    this.setState({
      ingredients: newIngredients,
      price: updatedPrice,
    });
    this.updatepurchase(newIngredients);
  };

  removeItemsHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const newIngredients = {
      ...this.state.ingredients,
    };
    newIngredients[type] = updatedCount;
    const oldPrice = this.state.price;
    const deductedPrice = PRICE[type];
    const updatedPrice = oldPrice - deductedPrice;
    this.setState({
      ingredients: newIngredients,
      price: updatedPrice,
    });
    this.updatepurchase(newIngredients);
  };

  purchaseHandler = () => {
    this.setState({ purchased: true });
  };

  closeModalHandler = () => {
    this.setState({ purchased: false });
  };

  confirm = () => {
    const queryParams = [];
    for (let i in this.state.ingredients) {
      queryParams.push(
        encodeURIComponent(i) +
          "=" +
          encodeURIComponent(this.state.ingredients[i])
      );
    }
    queryParams.push(
      encodeURIComponent("price") + "=" + encodeURIComponent(this.state.price)
    );
    const queryString = queryParams.join("&");
    this.props.history.push({
      pathname: "/checkout",
      search: "?" + queryString,
    });
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let burger = <p>loading...</p>;
    if (this.state.ingredients) {
      burger = (
        <Auxi>
          <Modal
            show={this.state.purchased}
            closeModal={this.closeModalHandler}
          >
            <Summary
              price={this.state.price}
              ingredients={this.state.ingredients}
              closeModal={this.closeModalHandler}
              confirm={this.confirm}
            />
          </Modal>
          <div>
            <Burger ingredients={this.state.ingredients} />
          </div>
          <div>
            <BuildControls
              ingredients={this.state.ingredients}
              itemsAdded={this.additemsHandler}
              itemsRemoved={this.removeItemsHandler}
              purchase={this.state.purchasable}
              purchased={this.purchaseHandler}
              price={this.state.price}
              disabled={disabledInfo}
            />
          </div>
        </Auxi>
      );
    }
    return <div>{burger}</div>;
  }
}

export default Burgerbuild;
