import React from 'react';
import ScoreGauge from './ScoreGauge';
import ScoreBadge from './ScoreBadge';

const Category = ({ title, score }) => {
  const textColor = score > 70 ? 'text-green-600'
    : score > 49 ? 'text-yellow-600' : 'text-red-600';

  return (
    <div className="resume-summary">
      <div className="category">
        <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center justify-center">
          <p className="text-lg sm:text-2xl font-semibold">{title}</p>
          <ScoreBadge score={score} />
        </div>
        <p className="text-lg sm:text-2xl">
          <span className={textColor}>{score}</span>/100
        </p>
      </div>
    </div>
  );
};

const Summary = ({ feedback }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md w-full">
      <div className="flex flex-col sm:flex-row items-center p-4 gap-4 sm:gap-8">
        <div className="w-full sm:w-auto flex justify-center">
          <ScoreGauge score={feedback.overallScore} />
        </div>

        <div className="flex flex-col gap-2 text-center sm:text-left">
          <h2 className="text-xl sm:text-2xl font-bold">Your Resume Score</h2>
          <p className="text-xs sm:text-sm text-gray-500">
            This score is calculated based on the variables listed below.
          </p>
        </div>
      </div>

      <Category title="Tone & Style" score={feedback.toneAndStyle.score} />
      <Category title="Content" score={feedback.content.score} />
      <Category title="Structure" score={feedback.structure.score} />
      <Category title="Skills" score={feedback.skills.score} />
    </div>
  );
};

export default Summary;