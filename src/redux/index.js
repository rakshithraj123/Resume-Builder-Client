import * as actionCreators from './TaskActions';
import {store}  from './store/store';
import * as selectors from './selectors'
import * as AuthReducer from './reducers/AuthReducer'
import * as ResumeReducer from './reducers/Reducer'

export const setResumeId = (resumeId) => {
  
  //store.dispatch(actionCreators.setResumeIdTask(resumeId));
  store.dispatch(ResumeReducer.setResumeID({"resumeId":resumeId}));
};

export const clearResumeId = () => {
 // store.dispatch(actionCreators.clearResumeIdTask());
 store.dispatch(ResumeReducer.clearResumeID());
};

export const clearData= () => {
  store.dispatch(actionCreators.clearDataTask());
};


export const setLoggedIn = (isLoggedIn) => {
  //store.dispatch(actionCreators.setLoggedInTask(isLoggedIn));
  store.dispatch(AuthReducer.login({"isLoggedIn":isLoggedIn}));
}

export const setToken = (token, isAdmin) => {
  //store.dispatch(actionCreators.setTokenTask(token, isAdmin));
  store.dispatch(AuthReducer.setToken({"token":token, "isAdmin":isAdmin }));
};

export const removeToken = () => {
  //store.dispatch(actionCreators.removeTokenTask());
  store.dispatch(AuthReducer.removeToken());
};

export const getLoggInStateState= (state) => {
  return state.auth.isLoggedIn;
};

export const getResumeIdState= (state) => {
  return state.resumeBuilder.resumeId;
};

export const getIsAdminState = (state) => {
  return  state.auth.isAdmin;
}

export const getToken = () => {
  return  selectors.getToken()
};





