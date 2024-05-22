import * as actionTypes from '../ActionTypes';
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoggedIn: false,
  token: null,
  isAdmin: false
};


const authSlice = createSlice({
  name: 'authReducer',
  initialState,
  reducers: {
    // Give case reducers meaningful past-tense "event"-style names
    login(state, action) {
      const { isLoggedIn } = action.payload
      state.isLoggedIn = isLoggedIn
    },
    setToken(state, action) {
      const { token,isAdmin } = action.payload
      state.token = token
      state.isAdmin = isAdmin
    },
    removeToken(state, action) {
      state.token = null
    }
  },
})

export const { login, setToken,removeToken } = authSlice.actions

export default authSlice.reducer 


 








// const AuthReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case actionTypes.LOG_IN:
//       return { ...state, isLoggedIn: action.payload.isLoggedIn };
//     case actionTypes.SET_TOKEN:
//       return { ...state, token: action.payload.token, isAdmin: action.payload.isAdmin };
//     case actionTypes.REMOVE_TOKEN:
//       return { ...state, token: null};
//     default:
//       return state;
//   }
// };
// export default AuthReducer;

