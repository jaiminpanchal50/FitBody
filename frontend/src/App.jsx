
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Sidebar from './components/Sidebar/Sidebar'
import Workouts from './screens/Workouts/Workouts'

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <main className='main' style={{ backgroundColor: '#1A1B2E' }}>
          <div className='flex h-full relative ' style={{ minHeight: '100%' }}>
            <div className='bar absolute top-1 left-1 lg:hidden z-20 cursor-pointer' style={{ backgroundColor: '#0F0F23' }}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
              </svg>

            </div>
            <div className='sidebar-container h-full  ps-1 pe-10 lg:hidden ' style={{ backgroundColor: '#0F0F23' }}>
              <Sidebar />
            </div>
            <div className='routes-container'>
              <Routes>
                <Route path="/" element={<div>Home Page</div>} />
                <Route path="/workouts" element={<Workouts />} />
              </Routes>
            </div>
          </div>
        </main>
        <Footer />

      </BrowserRouter >
    </>
  )
}

export default App
