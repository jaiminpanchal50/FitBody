import React, { useState } from "react";
import Banner from "../../components/Banner/Banner";
import Section1 from "../../components/Banner/Banner";
import bgvideo from "../../assets/bgVideo.mp4";
import bgImage from "../../assets/bg-image1.jpg";
import { Link } from "react-router-dom";
const Home = () => {
    const [workout, setworkout] = useState("Back & Biceps");
    const workouts = [
        {
            id: 1,
            title: "Back & Biceps",
            exercises: [
                {
                    name: "Pull Ups",
                    sets: [{ reps: 12 }, { reps: 12 }, { reps: 12 }],
                },
                {
                    name: "Barbell Rows",
                    sets: [{ reps: 10 }, { reps: 10 }, { reps: 10 }],
                },
                {
                    name: "Bicep Curls",
                    sets: [{ reps: 12 }, { reps: 12 }, { reps: 12 }],
                },
            ],
        },

        {
            id: 2,
            title: "Legs & Abs",
            exercises: [
                {
                    name: "Squats",
                    sets: [{ reps: 12 }, { reps: 12 }, { reps: 12 }],
                },
                {
                    name: "Leg Press",
                    sets: [{ reps: 10 }, { reps: 10 }, { reps: 10 }],
                },
                {
                    name: "Plank",
                    sets: [{ time: "30s" }, { time: "30s" }, { time: "30s" }],
                },
            ],
        },

        {
            id: 3,
            title: "Chest & Triceps",
            exercises: [
                {
                    name: "Bench Press",
                    sets: [{ reps: 10 }, { reps: 10 }, { reps: 10 }],
                },
                {
                    name: "Incline Dumbbell Press",
                    sets: [{ reps: 12 }, { reps: 12 }, { reps: 12 }],
                },
                {
                    name: "Tricep Dips",
                    sets: [{ reps: 12 }, { reps: 12 }, { reps: 12 }],
                },
            ],
        },

        {
            id: 4,
            title: "Shoulders & Forearms",
            exercises: [
                {
                    name: "Overhead Press",
                    sets: [{ reps: 10 }, { reps: 10 }, { reps: 10 }],
                },
                {
                    name: "Lateral Raises",
                    sets: [{ reps: 12 }, { reps: 12 }, { reps: 12 }],
                },
                {
                    name: "Wrist Curls",
                    sets: [{ reps: 15 }, { reps: 15 }, { reps: 15 }],
                },
            ],
        },
    ];

    return (
        <>
            <Banner
                tag="h1"
                title="Your fitness journey is a reflection of your discipline and dedication"
                description="Track every workout, measure your progress, and build sustainable habits that lead to long-term strength and confidence."
                btnText={"learn more"}
                link={"/"}
                bgVideo={bgvideo}
            />

            <div
                className=" bg-no-repeat bg-center bg-cover py-30 md:py-40"
                style={{ backgroundColor: "#0F0F13" }}
            >
                <div className="page-center">
                    <div className="max-w-3xl mx-auto text-center ">
                        <h2 className="m-0 pb-4 md:pb-6 text-center">Today's Workout</h2>
                        <p className="large m-0 pb-4 md:pb-6 text-center">
                            what exactly am I doing today?
                        </p>
                        <div className="flex flex-wrap items-center gap-3 mt-4 max-w-2xl mx-auto justify-center">
                            {/* Label */}
                            <p className="text-sm text-text-secondary font-medium whitespace-nowrap mb-0">
                                Selected workout:
                            </p>

                            {/* Main Pill Dropdown */}
                            <div className="relative group">
                                <button
                                    style={{ backgroundColor: "#1A1B2E" }}
                                    className="flex items-center gap-2 px-4 py-2.5 rounded-full border-2 border-border-subtle hover:border-fitness-blue-500 hover:bg-fitness-blue-500/5 text-text-primary font-semibold text-sm transition-all duration-200 min-w-[180px] justify-between"
                                >
                                    <span>Back & Biceps</span>
                                    <svg
                                        className="h-4 w-4 transition-transform group-hover:-rotate-180"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </svg>
                                </button>

                                {/* Dropdown Menu */}
                                <div
                                    style={{ backgroundColor: "#1A1B2E" }}
                                    className="absolute top-full left-0 mt-2 w-64 border border-border-subtle rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible z-50 transition-all duration-200 py-1"
                                >
                                    <div className="px-4 py-2 text-text-secondary text-xs border-b border-border-subtle">
                                        Your Workouts {workouts.length}
                                    </div>
                                    {workouts?.map((workout) => (
                                        <button
                                            onClick={(e) => setworkout(e.target.value)}
                                            value={workout.title}
                                            key={workout.id}
                                            className="w-full text-left px-4 py-2   transition-colors rounded-t-xl"
                                        >
                                            {workout.title}
                                        </button>
                                    ))}
                                </div>
                               
                            </div>
                        </div>
                        {workouts
                            .filter((w) => w.title === workout)
                            .map((w) => (
                                <div
                                    key={w.id}
                                    className="bg-blue-300 rounded-md p-4 my-6 mt-9 max-w-[400px] mx-auto"
                                >
                                    <h6 className="font-primary mb-3">{workout}</h6>
                                    {w.exercises.map((exercise, index) => (
                                        <span key={index} className="small font-primary">
                                            {exercise.name} ,{" "}
                                        </span>
                                    ))}
                                    <div className="btn mt-5 mb-3">
                                        <Link
                                            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                                            to="/workout"
                                            state={{ itemData: w }}
                                        >
                                            Start Workout
                                        </Link>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
