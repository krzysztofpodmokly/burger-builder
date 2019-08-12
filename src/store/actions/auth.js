import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    payload: {
      token,
      userId
    }
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    payload: error
  };
};

export const auth = (email, password, isSignup) => {
  return async dispatch => {
    try {
      dispatch(authStart());
      const authData = {
        email: email,
        password: password,
        returnSecureToken: true
      };
      let url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDvm_B00J-SUESqeA4iIYeKNoSGJoIRew8';
      if (!isSignup) {
        url =
          'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDvm_B00J-SUESqeA4iIYeKNoSGJoIRew8';
      }
      const res = await axios.post(url, authData);
      console.log(res.data);
      dispatch(authSuccess(res.data.idToken, res.data.localId));
    } catch (error) {
      dispatch(authFail(error));
    }
  };
};
