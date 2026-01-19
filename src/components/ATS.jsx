import React from 'react';

const ATS = ({ score, suggestions }) => {
  const gradientClass = score > 69
    ? 'from-green-100'
    : score > 49
      ? 'from-yellow-100'
      : 'from-red-100';

  const iconSrc = score > 69
    ? '/icons/ats-good.svg'
    : score > 49
      ? '/icons/ats-warning.svg'
      : '/icons/ats-bad.svg';

  const subtitle = score > 69
    ? 'Great Job!'
    : score > 49
      ? 'Good Start'
      : 'Needs Improvement';

  return (
    <div className={`bg-gradient-to-b ${gradientClass} to-white rounded-2xl shadow-md w-full p-4 sm:p-6`}>
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
        <img src={iconSrc} alt="ATS Score Icon" className="w-10 sm:w-12 h-10 sm:h-12 flex-shrink-0" />
        <div>
          <h2 className="text-lg sm:text-2xl font-bold">ATS Score - {score}/100</h2>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg sm:text-xl font-semibold mb-2">{subtitle}</h3>
        <p className="text-gray-600 mb-4 text-sm sm:text-base">
          This score represents how well your resume is likely to perform in Applicant Tracking Systems used by employers.
        </p>

        <div className="space-y-3">
          {suggestions.map((suggestion, index) => (
            <div key={index} className="flex items-start gap-3">
              <img
                src={suggestion.type === "good" ? "/icons/check.svg" : "/icons/warning.svg"}
                alt={suggestion.type === "good" ? "Check" : "Warning"}
                className="w-4 sm:w-5 h-4 sm:h-5 mt-1 flex-shrink-0"
              />
              <p className={`text-xs sm:text-sm ${suggestion.type === "good" ? "text-green-700" : "text-amber-700"}`}>
                {suggestion.tip}
              </p>
            </div>
          ))}
        </div>
      </div>

      <p className="text-gray-700 italic text-xs sm:text-sm">
        Keep refining your resume to improve your chances of getting past ATS filters and into the hands of recruiters.
      </p>
    </div>
  );
};

export default ATS;