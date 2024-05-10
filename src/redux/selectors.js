import {store}  from './store/store';

 const getResumeBuilderReducer = () => store.getState().resumeBuilder;
 const getAuthReducer = () => store.getState().auth;


export const getToken = () => {
     return  getAuthReducer().token
}

export const getResumeId = () => {
     return  getResumeBuilderReducer().resumeId
}
