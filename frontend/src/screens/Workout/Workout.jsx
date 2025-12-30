import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import "./style.css";

const Workout = () => {
  const location = useLocation();

  const [seconds, setSeconds] = useState(0);
  const [status, setStatus] = useState("stop");
  const timerRef = useRef(null);

  const startTimer = () => {
    if (timerRef.current) return;

    timerRef.current = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = null;
  };

  const resetTimer = () => {
    stopTimer();
    setSeconds(0);
    setStatus("stop");
  };

  useEffect(() => {
    if (status === "start") startTimer();
    if (status === "stop") stopTimer();
    if (status === "reset") resetTimer();

    return () => stopTimer();
  }, [status]);

  const formatTime = () => {
    const hrs = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${hrs}:${mins}:${secs}`;
  };

  return (
    <section className="workout-details-section py-10">
      <div className="page-center">
        <h1 className="text-center text-white">Workout Details</h1>

        <div className="my-4  sm:flex justify-between items-center">
          <h6 className="my-7 sm:my-0">
            Workout Name :{" "}
            <span className="bg-green-300 text-black px-2">
              {location.state?.workoutData?.title}
            </span>
          </h6>

          <div className="timer flex gap-6 items-center justify-center sm:justify-normal">
            <h6 className="">{formatTime()}</h6>

            {/* ✅ Your Styled Buttons */}
            <div className="radio-input">
              <label className="label">
                <input
                  type="radio"
                  name="timer"
                  checked={status === "start"}
                  onChange={() => setStatus("start")}
                />
                <span className="text">Start</span>
              </label>

              <label className="label">
                <input
                  type="radio"
                  name="timer"
                  checked={status === "stop"}
                  onChange={() => setStatus("stop")}
                />
                <span className="text">Stop</span>
              </label>

              <label className="label">
                <input
                  type="radio"
                  name="timer"
                  checked={status === "reset"}
                  onChange={() => setStatus("reset")}
                />
                <span className="text">Reset</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Workout;
