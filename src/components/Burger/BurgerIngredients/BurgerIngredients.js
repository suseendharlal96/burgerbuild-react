import React from 'react';
import classes from './BurgerIngredients.css';
import PropTypes from 'prop-types';

class BurgerIngredients extends React.Component {
  render() {
    let item = null;

    switch (this.props.type) {
      case 'bread-bottom':
        item = <div className={classes.BreadBottom} />;
        break;

      case 'bread-top':
        item = (
          <div className={classes.BreadTop}>
            <div className={classes.Seeds1} />
            <div className={classes.Seeds2} />
          </div>
        );
        break;

      case 'meat':
        item = <div className={classes.Meat} />;
        break;

      case 'cheese':
        item = <div className={classes.Cheese} />;
        break;

      case 'bacon':
        item = <div className={classes.Bacon} />;
        break;

      case 'salad':
        item = <div className={classes.Salad} />;
        break;

      default:
        item = null;
    }

    return item;
  }
}

BurgerIngredients.propTypes = {
  type: PropTypes.string.isRequired
};
export default BurgerIngredients;
