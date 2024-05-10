import * as actionTypes from './ActionTypes';

export const setTokenTask = (token, isAdmin) => {
    return {
        type: actionTypes.SET_TOKEN,
        payload: {"token":token, "isAdmin":isAdmin },
    };
};

export const removeTokenTask = () => {
    return {
        type: actionTypes.REMOVE_TOKEN,
    };
};

export const setResumeIdTask = (resumeId) => {
    return {
        type: actionTypes.SET_RESUME_ID,
        payload: {"resumeId":resumeId},
    };
};

export const clearResumeIdTask = () => {
    return {
        type: actionTypes.SET_RESUME_ID,
        payload: {"resumeId":null},
    };
};

export const clearDataTask = () => {
    return {
        type: actionTypes.CLEAR_DATA,
    };
};
export const setLoggedInTask = (isLoggedIn) => {
    return {
        type: actionTypes.LOG_IN,
        payload: {"isLoggedIn":isLoggedIn},
    };
};
