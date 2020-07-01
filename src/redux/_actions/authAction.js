import { LOGIN_SUCCESS, REGISTER_SUCCESS, USER_FETCH_SUCCESS } from '../types';
import axios from 'axios';
import { setAlert } from './alertAction';

const baseApiUrl = 'https://devgroceryapi.spericorn.com/api';
export const register = (user) => {
  return async (dispatch) => {
    const config = { header: { 'Content-Type': 'application/json' } };
    try {
      const res = await axios.post(`${baseApiUrl}/auth/register`, user, config);
      console.log('register response =>', res);
      if (res.data.success) {
        dispatch({ type: REGISTER_SUCCESS, payload: res.data.data });
      } else {
        dispatch(setAlert(res.data.message, 'danger'));
      }
    } catch (err) {
      console.log(err, err.response.data.message);
      dispatch(setAlert(err.response.data.message, 'danger'));
    }
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    try {
      const config = { header: { 'Content-Type': 'application/json' } };
      const res = await axios.post(
        `${baseApiUrl}/auth/login`,
        { email, password },
        config
      );
      dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    } catch (err) {
      console.log(err);
      dispatch(setAlert(err.response.data.message, 'danger'));
    }
  };
};

export const userProfile = () => {
  return async (dispatch) => {
    try {
      const token = localStorage.token;
      console.log('action toekn', token);
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };

      const res = await axios.get(`${baseApiUrl}/user`, config);
      console.log('userData=>', res.data);
      if (res.data.success) {
        dispatch({ type: USER_FETCH_SUCCESS, payload: res.data });
      } else {
        dispatch(setAlert(res.data.message, 'danger'));
      }
    } catch (err) {
      console.log(err);
      dispatch(setAlert(err.response.data.message, 'danger'));
    }
  };
};
