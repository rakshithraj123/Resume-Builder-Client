import * as actionCreators from './TaskActions';
import {store}  from './store/store';
import * as selectors from './selectors'


export const setToken = (token, isAdmin) => {
  store.dispatch(actionCreators.setTokenTask(token, isAdmin));
};

export const removeToken = () => {
  store.dispatch(actionCreators.removeTokenTask());
};

export const getToken = () => {
  return  selectors.getToken()
};

export const setResumeId = (resumeId) => {
  
  store.dispatch(actionCreators.setResumeIdTask(resumeId));
};

export const clearResumeId = () => {
  store.dispatch(actionCreators.clearResumeIdTask());
};

export const clearData= () => {
  store.dispatch(actionCreators.clearDataTask());
};

export const getResumeIdState= (state) => {
  return state.resumeBuilder.resumeId;
};

export const getIsAdminState = (state) => {
  return  state.auth.isAdmin;
}

export const setLoggedIn = (isLoggedIn) => {
  store.dispatch(actionCreators.setLoggedInTask(isLoggedIn));
}

export const getLoggInStateState= (state) => {
  return state.auth.isLoggedIn;
};





