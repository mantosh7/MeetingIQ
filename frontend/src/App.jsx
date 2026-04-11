import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import MeetingDetail from './pages/MeetingDetail'

function App() {
  return (
    <Routes>
      {/* <Route path="/" element={<Landing />} /> */}
      <Route path="/" element={<Dashboard />} />
      <Route path="/meeting/:id" element={<MeetingDetail />} />
    </Routes>
  )
}

export default App