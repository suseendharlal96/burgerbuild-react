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
    ingredients: {
      salad: 0,
      cheese: 0,
      meat: 0,
      bacon: 0,
    },
    price: 0,
    purchasable: false,
    purchased: false,
  };

  componentDidMount() {
    this.updatepurchase(this.state.ingredients);
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
    const obj = {
      orders: {
        meat: 1,
        chicken: 2,
      },
      customer: {
        name: "Susee",
        email: "test@test.com",
      },
    };
    axios
      .post("/burgerOrders.json", obj)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    return (
      <Auxi>
        <Modal show={this.state.purchased} closeModal={this.closeModalHandler}>
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
}

export default Burgerbuild;
