import React from 'react'
import './style.scss'
import { NavLink } from 'react-router-dom'
import { LiaDumbbellSolid } from "react-icons/lia";
import { MdOutlineToday } from "react-icons/md";
import { FaHistory } from "react-icons/fa";
import { GiProgression } from "react-icons/gi";


const Sidebar = () => {
    return (
        <div className="menu-items flex gap-5 flex-col py-10 lg:py-0 lg:flex-row lg:items-start ">
            <NavLink
                to="/"
                className={({ isActive }) => `menu-item ${isActive ? 'active' : ''} flex items-center gap-2 p-1`}
            >
                <MdOutlineToday className="size-6 lg:hidden" />
                Today
            </NavLink>

            <NavLink
                to="/workouts"
                className={({ isActive }) => `menu-item ${isActive ? 'active' : ''} flex items-center gap-2 p-1`}
            >
                <LiaDumbbellSolid className="size-6 lg:hidden" />
                Workouts
            </NavLink>

            <NavLink
                to="/history"
                className={({ isActive }) => `menu-item ${isActive ? 'active' : ''} flex items-center gap-2 p-1`}
            >
                <FaHistory className="size-4 lg:hidden" />
                History
            </NavLink>

            <NavLink
                to="/progress"
                className={({ isActive }) => `menu-item ${isActive ? 'active' : ''} flex items-center gap-2 p-1`}
            >
                <GiProgression className="size-4 lg:hidden" />
                Progress
            </NavLink>

        </div>
    )
}

export default Sidebar
