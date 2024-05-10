import * as actionTypes from '../ActionTypes';

const initialState = {
    resumeId: null
  };
  
  const ResumeBuilder = (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.SET_RESUME_ID:
        console.log("SET_RESUME_ID "+action.payload.resumeId )
        return { ...state, resumeId: action.payload.resumeId };
      case actionTypes.CLEAR_RESUME_ID:
        return { ...state, resumeId: null };
      default:
        return state;
    }
  };
  export default ResumeBuilder;

