import * as actionTypes from '../ActionTypes';

const initialState = {
    counter: 0
  };
  
  const ResumeBuilder = (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.INCREMENT:
        console.log(" counterReducer increment")
        return { ...state, counter: state.counter + 1 };
      case actionTypes.DECREMENT:
        return { ...state, counter: state.counter - 1 };
      default:
        return state;
    }
  };
  export default ResumeBuilder;

