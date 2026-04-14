import { Routes, Route } from 'react-router-dom'
import {Toaster} from "react-hot-toast" ;
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import MeetingDetail from './pages/MeetingDetail'
import Login from './pages/Login'
import Signup from './pages/Signup'

function App() {
  return (
    <div>
      <Toaster />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/meeting/:id" element={<MeetingDetail />} />
      </Routes>
    </div>
  )
}

export default App