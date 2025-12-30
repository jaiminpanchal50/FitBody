
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Workouts from './screens/Workouts/Workouts'
import Home from './screens/Home/Home'
import Workout from './screens/Workout/Workout'

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <main className='main' style={{ backgroundColor: '#1A1B2E' }}>
         
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/workouts" element={<Workouts />} />
                <Route path="/workout/:id" element={<Workout />} />
              </Routes>
           
        </main>
        <Footer />

      </BrowserRouter >
    </>
  )
}

export default App
