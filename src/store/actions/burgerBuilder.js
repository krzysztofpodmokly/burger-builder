import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = name => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    payload: name
  };
};

export const removeIngredient = name => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    payload: name
  };
};

export const setIngredients = ingredients => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    payload: ingredients
  };
};

export const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED
  };
};

export const initIngredients = () => {
  return async dispatch => {
    try {
      const res = await axios.get('/ingredients.json');
      dispatch(setIngredients(res.data));
    } catch (error) {
      dispatch(fetchIngredientsFailed());
    }
  };
};
