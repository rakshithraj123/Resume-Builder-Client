import * as actionTypes from './ActionTypes';

export const incrementTask = () => {
    return {
        type: actionTypes.INCREMENT,
        //payload: task,
    };
};

export const decrementTask = () => {
    return {
        type: actionTypes.DECREMENT,
        //payload: task,
    };
};

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
