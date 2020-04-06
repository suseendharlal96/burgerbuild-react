import React from 'react';
import BurgerIngredients from './BurgerIngredients/BurgerIngredients';
import classes from './Burger.css';

const burger = props => {
  let finalIngredients = Object.keys(props.ingredients)
    .map(igKey => {
      return [...Array(props.ingredients[igKey])].map((_, i) => {
        return <BurgerIngredients key={igKey + i} type={igKey} />;
      });
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);

  if (finalIngredients.length === 0) {
    finalIngredients = <p>Please add some stuffs</p>;
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredients type={'bread-top'} />
      {finalIngredients}
      <BurgerIngredients type={'bread-bottom'} />
    </div>
  );
};
export default burger;
