import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Summary from '../components/Summary';
import ATS from '../components/ATS';
import Details from '../components/Details';
import { useResume } from '../contexts/ResumeContext';

const Resume = () => {
  const [analysis, setAnalysis] = useState(null);
  const { state, dispatch } = useResume();
  const { currentResume } = state;
  const location = useLocation();

  // ✅ Load resume data from navigation or state
  useEffect(() => {
    if (location?.state) {
      const resumeFromState = location.state;
      dispatch({ type: 'SET_CURRENT_RESUME', payload: resumeFromState });
      setAnalysis(resumeFromState.feedback || resumeFromState);
    } else if (currentResume) {
      setAnalysis(currentResume.feedback || currentResume);
    }
  }, [location, currentResume, dispatch]);

  return (
    <main className="!pt-0 min-h-screen bg-gray-50">
      {/* 🔙 Navigation */}
      <nav className="resume-nav">
        <Link to="/" className="flex items-center gap-1 sm:gap-2 hover:text-indigo-600 transition">
          <img src="/icons/back.svg" alt="back" className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
          <span className="text-gray-800 text-xs sm:text-sm font-semibold">Back</span>
        </Link>
      </nav>

      <section className="flex flex-col items-center w-full px-4 sm:px-6 md:px-16 py-4 sm:py-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">Resume Review</h2>

        {analysis ? (
          <div className="flex flex-col w-full gap-6 sm:gap-10 max-w-5xl animate-in fade-in duration-1000">
            {/* ✅ Summary Section */}
            <Summary feedback={analysis} />

            {/* ✅ ATS Score Section */}
            {analysis.ATS && (
              <ATS
                score={analysis.ATS.score || 0}
                suggestions={analysis.ATS.tips || []}
              />
            )}

            {/* ✅ Detailed Feedback */}
            <Details feedback={analysis} />
          </div>
        ) : (
          // 🔄 Loading Animation
          <div className="flex flex-col items-center justify-center mt-10">
            <img
              src="/images/resume-scan-2.gif"
              alt="Loading"
              className="w-48 sm:w-64 opacity-90"
            />
            <p className="text-gray-500 mt-4 text-sm sm:text-lg">Analyzing your resume...</p>
          </div>
        )}
      </section>
    </main>
  );
};

export default Resume;
