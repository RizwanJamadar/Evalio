import clsx from "clsx";
import React, { useState } from "react";

const Agent = ({
  userName,
  userId,
  interviewId,
  feedbackId,
  type,
  questions,
}) => {
  const [isSpeaking, setIsSpeaking] = useState(true);
  const [callStatus, setCallStatus] = useState("INACTIVE");

  const handleCall = () => {
    setCallStatus("CONNECTING");

    setTimeout(() => {
      setCallStatus("ACTIVE");
    }, 2000);
  };

  const handleDisconnect = () => {
    setCallStatus("FINISHED");

    setTimeout(() => {
      setCallStatus("INACTIVE");
    }, 1000);
  };

  const messages = ["hey there, i'm dacky!!"];
  const lastMessage = messages[messages.length - 1];

  return (
    <>
      <div className="call-view">
        {/* AI Interviewer Card */}
        <div className="card-interviewer">
          <div className="avatar">
            <img
              src="/ai-avatar.png"
              alt="profile-image"
              width={65}
              height={54}
              className="object-cover"
            />
            {isSpeaking && <span className="animate-speak" />}
          </div>
          <h3>AI Interviewer</h3>
        </div>

        {/* User Profile Card */}
        <div className="card-border">
          <div className="card-content">
            <img
              src="/user-avatar.png"
              alt="profile-image"
              width={539}
              height={539}
              className="rounded-full object-cover size-[120px]"
            />
            <h3>{userName}</h3>
          </div>
        </div>
      </div>

      {messages.length > 0 && (
        <div className="transcript-border">
          <div className="transcript">
            <p
              key={lastMessage}
              className={clsx(
                "transition-opacity duration-500 opacity-0",
                "animate-fadeIn opacity-100"
              )}
            >
              {lastMessage}
            </p>
          </div>
        </div>
      )}

      <div className="w-full flex justify-center">
        {callStatus !== "ACTIVE" ? (
          <button className="relative btn-call" onClick={() => handleCall()}>
            <span
              className={
                clsx("absolute animate-ping rounded-full opacity-75",
                callStatus !== "CONNECTING" && "hidden")
              }
            />

            <span className="relative">
              {callStatus === "INACTIVE" || callStatus === "FINISHED"
                ? "Call"
                : "Calling.."}
            </span>
          </button>
        ) : (
          <button className="btn-disconnect" onClick={() => handleDisconnect()}>
            End
          </button>
        )}
      </div>
    </>
  );
};

export default Agent;
