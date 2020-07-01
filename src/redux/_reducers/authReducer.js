import {
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  REGISTER_FAIL,
  LOGIN_FAIL,
  LOGOUT,
  USER_FETCH_SUCCESS,
  USER_FETCH_FAIL,
  CLEAR_ERRORS,
} from '../types';

const initState = {
  isAuthenticated: localStorage.getItem('token') ? true : false,
  user: null,
  token: localStorage.getItem('token'),
  error: null,
  loading: true,
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case USER_FETCH_SUCCESS:
      const userData = action.payload.data.userData;
      console.log('USER_FETCH_SUCCESS', userData);
      return {
        ...state,
        loading: false,
        user: userData,
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      const { data } = action.payload;
      localStorage.setItem('token', data.token);
      return {
        ...state,
        token: data.token,
        isAuthenticated: true,
        loading: false,
      };
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    case USER_FETCH_FAIL:
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export default authReducer;
