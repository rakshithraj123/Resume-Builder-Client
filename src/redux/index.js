import * as actionCreators from './TaskActions';
import {store}  from './store/store';
import * as selectors from './selectors'

export const incrementCounter = () => {
  store.dispatch(actionCreators.incrementTask());

};


export const decrementCounter = () => {
  store.dispatch(actionCreators.decrementTask());

};

export const setToken = (token, isAdmin) => {
  store.dispatch(actionCreators.setTokenTask(token, isAdmin));
};

export const removeToken = () => {
  store.dispatch(actionCreators.removeTokenTask());
};

export const getToken = () => {
  return  selectors.getToken()
};



