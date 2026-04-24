import { Routes, Route } from 'react-router-dom'
import { Toaster } from "react-hot-toast";
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import MeetingDetail from './pages/MeetingDetail'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ProfilePage from './pages/ProfilePage';
import AppLayout from './layouts/AppLayout';

function App() {
  return (
    <div>
      <Toaster />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/meeting/:id" element={<MeetingDetail />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App