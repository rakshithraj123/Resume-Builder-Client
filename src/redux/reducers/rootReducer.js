import { combineReducers } from 'redux';
import ResumeBuilder from "./Reducer";
import AuthReducer from "./AuthReducer";
import * as actionTypes from '../ActionTypes';

const appReducer = combineReducers({
    /* your app’s top-level reducers */
    resumeBuilder: ResumeBuilder,
    auth:AuthReducer,
  })

// Combine Reducers
const rootReducer = (state, action) => {
    if (action.type === actionTypes.CLEAR_DATA) {
    // for all keys defined in your persistConfig(s)
      //storage.removeItem('persist:root')
      console.log("clear data")
      return appReducer(undefined, action)
    }
    return appReducer(state, action)
  }
export default rootReducer;