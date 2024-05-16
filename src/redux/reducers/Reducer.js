import * as actionTypes from '../ActionTypes';
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    resumeId: null
  };

  const resumeSlice = createSlice({
    name: 'authReducer',
    initialState,
    reducers: {
      // Give case reducers meaningful past-tense "event"-style names
      setResumeID(state, action) {
        const { resumeId } = action.payload
        state.resumeId = resumeId
      },
      clearResumeID(state, action) {
        state.resumeId = null
      }
    },
  })
  
export const { setResumeID,clearResumeID } = resumeSlice.actions

export default resumeSlice.reducer 
  
  // const ResumeBuilder = (state = initialState, action) => {
  //   switch (action.type) {
  //     case actionTypes.SET_RESUME_ID:
  //       console.log("SET_RESUME_ID "+action.payload.resumeId )
  //       return { ...state, resumeId: action.payload.resumeId };
  //     case actionTypes.CLEAR_RESUME_ID:
  //       return { ...state, resumeId: null };
  //     default:
  //       return state;
  //   }
  // };
  // export default ResumeBuilder;

