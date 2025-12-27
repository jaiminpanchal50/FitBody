import React, { useState } from 'react'
import DatePicker from "react-datepicker";
import Cookies from 'js-cookie';
import './style.css'
import "react-datepicker/dist/react-datepicker.css";
import Sidebar from '../Sidebar/Sidebar';

const Header = () => {

    const [date, setDate] = useState(new Date());


    function randomColorGenerator() {
        if (Cookies.get('profileColor')) {
            return Cookies.get('profileColor');
        } else {
            const letters = '0123456789ABCDEF';
            let color = '#';
            for (let i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            Cookies.set('profileColor', color,);
            return color;
        }
    }
    randomColorGenerator()
    return (
        <header className='header-container  shadow-md' style={{ backgroundColor: '#16213E' }}>
            <div className='page-center'>
                <div className='flex justify-between items-center py-4 sm:py-2 gap-2'>

                    <div className='logo-container'>
                        <img src="/logo.png" alt="FitBody Logo" className="sm:h-16 h-10 w-auto" />
                    </div>
                    {/* <div className='date-container flex items-center gap-2 relative border border-x-amber-50 p-1 rounded ' style={{ cursor: 'pointer' }}>
                        <DatePicker dateFormat="dd/MM/yy" selected={date} onChange={(date) => setDate(date)} className='outline-hidden border-0 z-10 relative cursor-pointer' />
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" style={{ zIndex: 2 }} strokeWidth={1.5} stroke="currentColor" className="size-6 absolute right-0 pe-1  cursor-pointer">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                        </svg>
                    </div> */}
                    <div className='sidebar-toggle lg:block hidden'>
                        <Sidebar />
                    </div>
                    <div className='profile-container p-2 rounded-b-full cursor-pointer border border-b-blue-100' style={{ backgroundColor: randomColorGenerator() }}>
                        <h6 className='large'>JP</h6>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header