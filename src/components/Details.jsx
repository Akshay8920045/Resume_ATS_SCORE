import React from 'react';
import { cn } from '../utils/cn';
import { Accordion, AccordionContent, AccordionHeader, AccordionItem } from './Accordion';

const ScoreBadge = ({ score }) => {
  return (
    <div
      className={cn(
        "flex flex-row gap-1 items-center px-2 py-0.5 rounded-[96px] text-xs sm:text-sm",
        score > 69
          ? "bg-badge-green"
          : score > 39
            ? "bg-badge-yellow"
            : "bg-badge-red"
      )}
    >
      <img
        src={score > 69 ? "/icons/check.svg" : "/icons/warning.svg"}
        alt="score"
        className="size-3 sm:size-4"
      />
      <p
        className={cn(
          "text-xs sm:text-sm font-medium",
          score > 69
            ? "text-badge-green-text"
            : score > 39
              ? "text-badge-yellow-text"
              : "text-badge-red-text"
        )}
      >
        {score}/100
      </p>
    </div>
  );
};

const CategoryHeader = ({ title, categoryScore }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-start sm:items-center py-2">
      <p className="text-lg sm:text-2xl font-semibold">{title}</p>
      <ScoreBadge score={categoryScore} />
    </div>
  );
};

const CategoryContent = ({ tips }) => {
  return (
    <div className="flex flex-col gap-4 items-center w-full">
      <div className="bg-gray-50 w-full rounded-lg px-3 sm:px-5 py-3 sm:py-4 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {tips.map((tip, index) => (
          <div className="flex flex-row gap-2 items-start sm:items-center text-xs sm:text-base" key={index}>
            <img
              src={tip.type === "good" ? "/icons/check.svg" : "/icons/warning.svg"}
              alt="score"
              className="size-4 sm:size-5 flex-shrink-0"
            />
            <p className="text-gray-600">{tip.tip}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-4 w-full">
        {tips.map((tip, index) => (
          <div
            key={index + tip.tip}
            className={cn(
              "flex flex-col gap-2 rounded-2xl p-3 sm:p-4 text-xs sm:text-base",
              tip.type === "good"
                ? "bg-green-50 border border-green-200 text-green-700"
                : "bg-yellow-50 border border-yellow-200 text-yellow-700"
            )}
          >
            <div className="flex flex-row gap-2 items-start sm:items-center">
              <img
                src={tip.type === "good" ? "/icons/check.svg" : "/icons/warning.svg"}
                alt="score"
                className="size-4 sm:size-5 flex-shrink-0"
              />
              <p className="text-sm sm:text-xl font-semibold">{tip.tip}</p>
            </div>
            <p className="text-xs sm:text-sm">{tip.explanation}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const Details = ({ feedback }) => {
  return (
    <div className="flex flex-col gap-4 w-full">
      <Accordion>
        <AccordionItem id="tone-style">
          <AccordionHeader itemId="tone-style">
            <CategoryHeader title="Tone & Style" categoryScore={feedback.toneAndStyle.score} />
          </AccordionHeader>
          <AccordionContent itemId="tone-style">
            <CategoryContent tips={feedback.toneAndStyle.tips} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem id="content">
          <AccordionHeader itemId="content">
            <CategoryHeader title="Content" categoryScore={feedback.content.score} />
          </AccordionHeader>
          <AccordionContent itemId="content">
            <CategoryContent tips={feedback.content.tips} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem id="structure">
          <AccordionHeader itemId="structure">
            <CategoryHeader title="Structure" categoryScore={feedback.structure.score} />
          </AccordionHeader>
          <AccordionContent itemId="structure">
            <CategoryContent tips={feedback.structure.tips} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem id="skills">
          <AccordionHeader itemId="skills">
            <CategoryHeader title="Skills" categoryScore={feedback.skills.score} />
          </AccordionHeader>
          <AccordionContent itemId="skills">
            <CategoryContent tips={feedback.skills.tips} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Details;