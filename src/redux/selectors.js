import {store}  from './store/store';

 const getCounterReducer = () => store.getState().resumeBuilder;
 const getAuthReducer = () => store.getState().auth;


export const getToken = () => {
     return  getAuthReducer().token
}

