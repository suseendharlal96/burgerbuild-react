import React from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

const PRICE = {
  salad: 1,
  cheese: 1,
  meat: 1,
  bacon: 3,
};

class Burgerbuild extends React.Component {
  state = {
    ingredients: {
      salad: 0,
      cheese: 0,
      meat: 0,
      bacon: 0,
    },
    price: 2,
    purchasable: false,
  };

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
    const addedPrice = PRICE[type];
    const updatedPrice = oldPrice - addedPrice;
    this.setState({
      ingredients: newIngredients,
      price: updatedPrice,
    });
    this.updatepurchase(newIngredients);
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    return (
      <div>
        <div>
          <Burger ingredients={this.state.ingredients} />
        </div>
        <div>
          <BuildControls
            itemsAdded={this.additemsHandler}
            itemsRemoved={this.removeItemsHandler}
            purchase={this.state.purchasable}
            price={this.state.price}
            disabled={disabledInfo}
          />
        </div>
      </div>
    );
  }
}

export default Burgerbuild;
