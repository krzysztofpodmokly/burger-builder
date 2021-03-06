import React from 'react';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = props => {
  let transformedIngredients = Object.keys(props.ingredients)
    .map(igKey => {
      return Array.from(Array(props.ingredients[igKey])).map((_, i) => {
        return <BurgerIngredient key={igKey + i} type={igKey} />;
      });
      // return [...Array(props.ingredients[igKey])].map((_, i) => {
      //   return <BurgerIngredient key={igKey + i} type={igKey} />;
      // });
    })
    .reduce((arr, el) => {
      return arr.concat(el); // example input: [[1,2,3], ['c', 'd', 'e'], [4, 'str', 38]];
    }, []); // example output: [1, 2, 3, "c", "d", "e", 4, "str", 38]

  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please start adding ingredients!</p>;
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type='bread-top' />
      {transformedIngredients}
      <BurgerIngredient type='bread-bottom' />
    </div>
  );
};

export default burger;
