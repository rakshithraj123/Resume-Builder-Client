import * as actionTypes from '../ActionTypes';

const initialState = {
  isLoggedIn: false,
  token: null
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOG_IN:
      return { ...state, isLoggedIn: true };
    case actionTypes.SET_TOKEN:
      return { ...state, token: action.payload.token };
    case actionTypes.REMOVE_TOKEN:
      return { ...state, token: null};
    default:
      return state;
  }
};
export default AuthReducer;

