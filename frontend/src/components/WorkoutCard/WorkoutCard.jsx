import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import FormModal from "../FormModal/FormModal";
import './style.css'
const WorkoutCard = () => {
    const location = useLocation();
    const [workouts, setworkouts] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    return (
        <section className="py-16">
            <div className="page-center">
                <div className="">
                    <div className="text-center">
                        <h2 className="">Workouts</h2>
                        {/* <p className="text-gray-600 mt-2">Extend and automate your workflow by using integrations for your favorite tools.</p> */}
                    </div>
                    {
                        workouts.length <= 0 ? <div className="">
                            <h6 className="text-center mt-8 ">No Workouts Found. Please add workouts to get started. </h6>
                            <div onClick={() => setIsModalOpen(true)} className="border rounded-lg bg-amber-50 p-5 text-center cursor-pointer my-3 mt-5 max-w-1/3 mx-auto">

                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8 text-black text-center m-auto mb-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                                <p className="large" style={{ color: '#000' }}>Create Workout</p>

                            </div>
                        </div> : <ul className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            {
                                workouts?.map((item, idx) => (
                                    <li key={idx} className="border rounded-lg bg-amber-50">
                                        <div className="flex items-start justify-between p-5" style={{ minHeight: '150px' }}>
                                            <div className="space-y-2 ">
                                                <h5 className="text-gray-800 pb-2">{item.title}</h5>
                                                {
                                                    item?.exercises?.map((exer, index) => (
                                                        <span key={index} className="text-black">{exer.name}   {index !== item.exercises.length - 1 && " || "}</span>
                                                    ))
                                                }
                                            </div>
                                            {/* <button className="text-gray-500 text-sm border rounded-lg px-3 py-2 duration-150 hover:bg-gray-100 cursor-pointer min-w-[120px]">Add Workout</button> */}
                                        </div>
                                        <div className="p-5 pb-3 border-t text-right">
                                            <Link to={`/workout/${item.id}`} state={{ workoutData: item }}
                                                className="text-indigo-600 hover:text-indigo-500 text-sm font-medium">
                                                Start Workout
                                            </Link>
                                        </div>
                                    </li>
                                ))
                            }
                            <div onClick={() => setIsModalOpen(true)} className="border rounded-lg bg-amber-50 p-5 text-center cursor-pointer flex flex-col items-center justify-center" >

                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8 text-black text-center mx-auto mb-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                                <p className="large" style={{ color: '#000' }}>Create Workout</p>

                            </div>
                        </ul>
                    }

                    {
                        location.pathname === '/workouts' ? null : <div className="btn text-center">
                            <Link to='/workouts'
                                className="text-indigo-600 hover:text-indigo-500 text-sm font-medium button mt-6 text-center " style={{display:'inline-block'}}>
                                <span>View All Workouts</span>
                            </Link>
                        </div>
                    }


                </div>
                <FormModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                />
            </div>
        </section >
    )
}

export default WorkoutCard