import React from "react";
import dayjs from "dayjs";

import { getRandomInterviewCover } from "../lib/action.js";
import { Link } from "react-router-dom";

const InterviewCard = ({
  interviewId,
  userId,
  role,
  type,
  techstack,
  createdAt,
}) => {
  const feedback = null;

  const formattedDate = dayjs(
    feedback?.createdAt || createdAt || Date.now()
  ).format("MMM D, YYYY");

  return (
    <div className="card-border w-[360px] max-sm:w-full min-h-fit relative">
      <div className="card-interview">
        {/* Type Badge */}
        <div className="absolute top-0 right-0 px-4 py-1 rounded-bl-lg bg-gray-700 text-white text-xs font-semibold">
          <p className="text-sm font-semibold capitalize">technical</p>
        </div>

        {/* Cover Image */}
        <div className="flex items-center gap-2">
          <img
            src={getRandomInterviewCover()}
            alt="cover-image"
            width={60}
            height={60}
            className="rounded-full object-fit size-[60px]"
          />

          {/* Interview Role */}
          <h3 className="text-lg font-semibold">{role} Interview</h3>
        </div>

        {/* Date & Score */}
        <div className="flex flex-row gap-5 mt-3 text-gray-400">
          <div className="flex flex-row gap-2 items-center">
            <img src="/calendar.svg" width={22} height={22} alt="calendar" />
            <p>{formattedDate}</p>
          </div>

          <div className="flex flex-row gap-2 items-center">
            <img src="/star.svg" width={22} height={22} alt="star" />
            <p>{feedback?.totalScore || "---"}/100</p>
          </div>
        </div>

        {/* Feedback or Placeholder Text */}
        <p className="text-sm text-gray-300 mt-3 line-clamp-2">
          {feedback?.finalAssessment ||
            "You haven't taken this interview yet. Take it now to improve your skills."}
        </p>

        {/* Buttons */}
        <div className="flex justify-between mt-5">
          {/* Optional Tech Stack Icons */}
          {/* <DisplayTechIcons techStack={techstack} /> */}

          <button className="btn btn-primary">
            <Link to="/interview/123">{feedback ? "Check Feedback" : "View Interview"}</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default InterviewCard;
