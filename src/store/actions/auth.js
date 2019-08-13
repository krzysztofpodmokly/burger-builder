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

export const logout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const checkAuthTimeout = expirationTime => {
  return async dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
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
      dispatch(authSuccess(res.data.idToken, res.data.localId));
      dispatch(checkAuthTimeout(res.data.expiresIn));
    } catch (error) {
      dispatch(authFail(error.response.data.error));
    }
  };
};

export const setAuthRedirectPath = path => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    payload: path
  };
};
