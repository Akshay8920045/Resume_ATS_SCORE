import { useState, useCallback } from 'react';
import { useResume } from '../contexts/ResumeContext';
import { analyzeResumeAPI, listResumesAPI, getResumeAPI } from '../utils/api';

const useResumeAnalysis = () => {
  const { state, dispatch } = useResume(); // ✅ Add state here
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeResume = useCallback(async (formData) => {
    setIsAnalyzing(true);
    dispatch({ type: 'SET_LOADING', payload: true });
    
    try {
      const response = await analyzeResumeAPI(formData);
      dispatch({ type: 'SET_ANALYSIS_RESULTS', payload: response.data });
      dispatch({ type: 'ADD_RESUME', payload: response.data });
      return response.data;
    } catch (error) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: error.response?.data?.message || 'Analysis failed' 
      });
      throw error;
    } finally {
      setIsAnalyzing(false);
    }
  }, [dispatch]);

  return {
    state, // ✅ Return state here
    analyzeResume,
    isAnalyzing
  };
};

export default useResumeAnalysis;