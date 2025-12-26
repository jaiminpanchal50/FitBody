import React from 'react'
import './style.scss'
const Footer = () => {
    return (
        <footer style={{ backgroundColor: '#16213E' }} className='footer py-4 sm:py-2'>
            <div className='page-center'>
                <div className='logo-container'>
                    <img src="/logo.png" alt="FitBody Logo" className="sm:h-16 h-10 w-auto" />
                </div>
                <div className='copyright-text sm:py-4 py-2 text-center border-t-blue-100 mt-2 sm:mt-4' style={{ borderTopWidth: 1 }}>
                    <p>&copy; 2025 FitBody. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer