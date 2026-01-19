import React, { createContext, useContext, useReducer } from 'react';

const ResumeContext = createContext();

const initialState = {
  resumes: [],
  currentResume: null,
  loading: false,
  error: null,
  analysisResults: []
};

const resumeReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'ADD_RESUME':
      return { 
        ...state, 
        resumes: [...state.resumes, action.payload],
        loading: false 
      };
    case 'SET_RESUMES':
      return { ...state, resumes: action.payload, loading: false };
    case 'SET_CURRENT_RESUME':
      return { ...state, currentResume: action.payload };
    case 'SET_ANALYSIS_RESULTS':
      return { 
        ...state, 
        analysisResults: action.payload,
        loading: false 
      };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    default:
      return state;
  }
};

export const ResumeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(resumeReducer, initialState);

  return (
    <ResumeContext.Provider value={{ state, dispatch }}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};