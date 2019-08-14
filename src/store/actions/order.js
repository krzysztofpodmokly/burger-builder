import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData
  };
};

export const purchaseBurgerFail = error => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error
  };
};

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START
  };
};

export const purchaseBurger = (orderData, token) => {
  return async dispatch => {
    try {
      dispatch(purchaseBurgerStart());
      const res = await axios.post('/orders.json?auth=' + token, orderData);
      // console.log(res.data);
      dispatch(purchaseBurgerSuccess(res.data.name, orderData));
    } catch (error) {
      dispatch(purchaseBurgerFail(error));
    }
  };
};

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT
  };
};

export const fetchOrdersSuccess = orders => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    payload: orders
  };
};

export const fetchOrdersFail = error => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    payload: error
  };
};

export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START
  };
};

export const fetchOrders = (token, userId) => {
  return async dispatch => {
    try {
      dispatch(fetchOrdersStart());
      const queryParams =
        '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
      const res = await axios.get('/orders.json' + queryParams);
      const fetchedOrders = [];
      for (let key in res.data) {
        fetchedOrders.push({ ...res.data[key], id: key });
      }
      dispatch(fetchOrdersSuccess(fetchedOrders));
    } catch (error) {
      dispatch(fetchOrdersFail(error));
    }
  };
};
