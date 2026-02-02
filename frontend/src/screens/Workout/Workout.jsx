import React, { use,useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./style.css";

const Workout = () => {
  const location = useLocation();
  const navigate = useNavigate()
  const [seconds, setSeconds] = useState(0);
  const [status, setStatus] = useState("stop");
  const timerRef = useRef(null);

  // Dynamic sets per exercise + completed tracking
  const [exerciseData, setExerciseData] = useState(() =>
    location.state?.workoutData?.exercises?.map((ex) => ({
      id: ex.id ?? crypto.randomUUID(),
      name: ex.name,
      sets: [{ reps: "", weight: "" }],
    })) || []
  );

  const [completedSets, setCompletedSets] = useState({});

  // Max weight tracking per exercise
  const [maxWeights, setMaxWeights] = useState({});

  const workoutId = location.state?.workoutData?.id ?? location.state?.workoutData?.title;
  const workoutTitle = location.state?.workoutData?.title ?? "Untitled Workout";

  // Timer functions
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
    setStatus("reset");
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

  // Update set data + track max weight
  const handleSetChange = (exIndex, setIndex, e) => {
    const { name, value } = e.target;

    setExerciseData((prev) =>
      prev.map((exercise, i) =>
        i === exIndex
          ? {
            ...exercise,
            sets: exercise.sets.map((set, j) =>
              j === setIndex ? { ...set, [name]: value } : set
            ),
          }
          : exercise
      )
    );

    // Track max weight for this exercise when weight changes
    if (name === "weight") {
      const weightNum = parseFloat(value) || 0;
      setMaxWeights((prev) => {
        const exKey = exIndex.toString();
        const currentMax = prev[exKey] || 0;
        return {
          ...prev,
          [exKey]: Math.max(currentMax, weightNum),
        };
      });
    }
  };

  // Add new set to specific exercise
  const addSet = (exIndex) => {
    setExerciseData((prev) =>
      prev.map((exercise, i) =>
        i === exIndex
          ? {
            ...exercise,
            sets: [...exercise.sets, { reps: "", weight: "" }],
          }
          : exercise
      )
    );
  };

  // Remove set (keep at least 1)
  const removeSet = (exIndex, setIndex) => {
    setExerciseData((prev) =>
      prev.map((exercise, i) =>
        i === exIndex && exercise.sets.length > 1
          ? {
            ...exercise,
            sets: exercise.sets.filter((_, j) => j !== setIndex),
          }
          : exercise
      )
    );
  };

  // Submit SINGLE set
  const handleSetSubmit = (exIndex, setIndex) => {
    if ("vibrate" in navigator) {
    navigator.vibrate(200); // vibrate for 200ms
  }
    const setData = exerciseData[exIndex].sets[setIndex];
    console.log(`Set ${setIndex + 1} saved:`, setData);

    // Mark as completed
    setCompletedSets((prev) => ({
      ...prev,
      [`${exIndex}-${setIndex}`]: true,
    }));
  };

  // Reset completed set
  const resetSet = (exIndex, setIndex) => {
    setCompletedSets((prev) => {
      const key = `${exIndex}-${setIndex}`;
      const newCompleted = { ...prev };
      delete newCompleted[key];
      return newCompleted;
    });
  };

  // Get only completed workout data
  const getCompletedWorkoutData = () => {
    return {
      workoutId,
      title: workoutTitle,
      date: new Date().toLocaleDateString(),
      exercises: exerciseData.map((ex, exIndex) => ({
        id: ex.id,
        name: ex.name,
        maxWeight: maxWeights[exIndex.toString()] || 0,
        sets: ex.sets
          .map((set, setIndex) => ({
            ...set,
            _key: `${exIndex}-${setIndex}`,
          }))
          .filter((setWithKey) => completedSets[setWithKey._key])
          .map(({ ...clean }) => clean),
      })),
    };
  };

  // Update THIS function in your component
  const handleSaveWorkout = () => {
    const current = getCompletedWorkoutData();

    // Remove exercises with no completed sets
    current.exercises = current.exercises.filter((ex) => ex.sets.length > 0);

    if (!current.exercises.length) {
      alert("No completed sets to save.");
      return;
    }

    const key = "workoutLogs"; // your existing key
    const existingRaw = localStorage.getItem(key);
    let existing = [];

    if (existingRaw) {
      try {
        existing = JSON.parse(existingRaw);
      } catch {
        existing = [];
      }
    }

    // **UPDATE**: Replace/add this specific workout instead of appending
    const updated = existing.filter((w) => w.id !== workoutId).concat([current]);

    localStorage.setItem(key, JSON.stringify(updated, null, 2));
    alert("Workout updated!");
    navigate('/workouts');
  };


  return (
    <section className="workout-details-section py-10">
      <div className="page-center">
        <h1 className="text-center text-white">Workout Details</h1>

        <div className="my-4 sm:flex justify-between items-center">
          <h6 className="my-7 sm:my-0">
            Template Name:{" "}
            <span className="bg-green-300 text-black px-2">
              {location.state?.workoutData?.title}
            </span>
          </h6>

          <div className="timer flex gap-6 items-center justify-center sm:justify-normal">
            <h6>{formatTime()}</h6>
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

        <div className="max-w-2xl mx-auto mt-10">
          {exerciseData.map((exercise, exIndex) => {
            const exMaxWeight = maxWeights[exIndex.toString()];
            return (
              <div key={exercise.id} className="exercise-section mb-8 p-4 lg:p-6 bg-gray-300 rounded-lg">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="large text-white text-2xl font-bold">{exercise.name}</h3>
                  {exMaxWeight > 0 && (
                    <div className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-bold">
                      Max: {exMaxWeight}kg
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => addSet(exIndex)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600 flex items-center gap-2"
                  >
                    + Add Set
                  </button>
                </div>

                {exercise.sets.map((set, setIndex) => {
                  const isCompleted = completedSets[`${exIndex}-${setIndex}`];

                  return (
                    <div
                      key={setIndex}
                      className={`flex items-center justify-between p-2 lg:p-4 border-2 rounded-lg mb-3 ${isCompleted
                          ? "border-green-500 bg-green-900/30"
                          : "border-gray-600 hover:border-gray-400"
                        }`}
                    >
                      <div className="flex items-center gap-2 lg:gap-6 flex-1">
                        <div className="w-15 lg:w-24">
                          <label className="block text-sm text-gray-300 mb-2">Reps</label>
                          <input
                            type="number"
                            name="reps"
                            required
                            value={set.reps}
                            onChange={(e) => handleSetChange(exIndex, setIndex, e)}
                            className={`w-full text-center rounded-lg py-0 lg:py-2 border-2 border-white text-lg font-medium bg-gray-700/50 text-white transition-all ${isCompleted
                                ? "bg-green-600/50 border-green-400 cursor-not-allowed"
                                : "hover:border-blue-400 focus:border-blue-400"
                              }`}
                            min="0"
                            disabled={isCompleted}
                          />
                        </div>

                        <span className="text-2xl font-bold text-white">×</span>

                        <div className="w-15 lg:w-24">
                          <label className="block text-sm text-gray-300 mb-2">Weight</label>
                          <input
                            type="number"
                            name="weight"
                            required
                            value={set.weight}
                            onChange={(e) => handleSetChange(exIndex, setIndex, e)}
                            className={`w-full text-center rounded-lg py-0 lg:py-2 border-2 border-white text-lg font-medium bg-gray-700/50 text-white transition-all ${isCompleted
                                ? "bg-green-600/50 border-green-400 cursor-not-allowed"
                                : "hover:border-blue-400 focus:border-blue-400"
                              }`}
                            min="0"
                            step="0.5"
                            disabled={isCompleted}
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-2 ml-4">
                        {isCompleted ? (
                          <button
                            type="button"
                            onClick={() => resetSet(exIndex, setIndex)}
                            className="bg-yellow-500 hover:bg-yellow-600 cursor-pointer text-white px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1"
                            title="Reset set"
                          >
                            ↻ Reset
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleSetSubmit(exIndex, setIndex)}
                            className="bg-green-500 hover:bg-green-600 cursor-pointer text-white px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={!set.reps || !set.weight}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="18"
                              height="18"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="inline"
                            >
                              <path d="M20 6 9 17l-5-5" />
                            </svg>
                            Done
                          </button>
                        )}

                        {exercise.sets.length > 1 && !isCompleted && (
                          <button
                            type="button"
                            onClick={() => removeSet(exIndex, setIndex)}
                            className="bg-red-500 hover:bg-red-600 text-white px-2 cursor-pointer py-1 rounded-lg text-lg font-bold transition-all"
                            title="Remove set"
                          >
                            ×
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>

        {/* Save workout button */}
        <div className="mt-12 flex justify-center">
          <button
            type="button"
            onClick={handleSaveWorkout}
            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all"
          >
            💾 Save Workout
          </button>
        </div>
      </div>
    </section>
  );
};

export default Workout;
