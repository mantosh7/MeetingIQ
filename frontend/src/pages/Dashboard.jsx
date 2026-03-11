import { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from '../components/Navbar'
import StatsCard from '../components/StatsCard'
import MeetingCard from '../components/MeetingCard'

function Dashboard() {
  const [meetings, setMeetings] = useState([])
  const [loading, setLoading] = useState(true)

  async function fetchAllMeeting() {
    try {
      const response = await axios.get('http://localhost:5000/api/meetings/all');

      // converting tasks into json format to apply filter on tasks
      const data = response.data.message.map((m) => ({
        ...m,
        tasks: typeof m.tasks === 'string' ? JSON.parse(m.tasks) : (m.tasks || [])
      }))
      setMeetings(data)
      setLoading(false)
    } catch (err) {
      console.log(err)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAllMeeting();
  }, [])

  const totalActions = meetings.reduce((acc, m) => acc + (m.tasks?.length || 0), 0)
  const highPriority = meetings.reduce((acc, m) => acc + (m.tasks?.filter(t => t.priority === 'High').length || 0), 0)

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 py-8">

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <StatsCard label="Total Meetings" value={meetings.length} color="text-purple-600" />
          <StatsCard label="Action Items" value={totalActions} color="text-blue-500" />
          <StatsCard label="High Priority" value={highPriority} color="text-red-500" />
          <StatsCard label="Analyzed" value={meetings.length} color="text-green-500" />
        </div>

        {/* Meeting Cards */}
        {loading ? (
          <p className="text-gray-400 text-center">Loading...</p>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {meetings.map((meeting) => (
              <MeetingCard key={meeting.id} meeting={meeting} />
            ))}
          </div>
        )}

      </div>
    </div>
  )
}

export default Dashboard