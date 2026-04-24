import { useState, useEffect } from 'react'
import axios from 'axios'
import StatsCard from '../components/StatsCard'
import MeetingCard from '../components/MeetingCard'
import NewMeetingModal from '../components/NewMeetingModal'

function Dashboard() {
  const [meetings, setMeetings] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)

  async function fetchAllMeeting() {
    try {
      const response = await axios.get('/api/meetings/all', { withCredentials: true });
      const data = response.data.message.map((m) => ({
        ...m,
        tasks: typeof m.tasks === 'string' ? JSON.parse(m.tasks) : (m.tasks || [])
      }))
      setMeetings(data)
      setLoading(false)
    } catch (err) {
      if (err.response?.status === 401) {
        window.location.href = "/login";
      }
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAllMeeting()
  }, [])

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-6xl w-full mx-auto px-6 py-8">

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <StatsCard label="Total Meetings" value={meetings.length} color="text-violet-600" />
          <StatsCard
            label="Action Items"
            value={meetings.reduce((acc, m) => acc + m.tasks.length, 0)}
            color="text-blue-500"
          />
          <StatsCard
            label="High Priority"
            value={meetings.reduce((acc, m) => acc + m.tasks.filter(t => t.priority === 'High').length, 0)}
            color="text-red-500"
          />
        </div>

        {/* Meetings Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 border-2 border-violet-600 border-t-transparent rounded-full animate-spin" />
              <p className="text-sm text-gray-400">Loading meetings...</p>
            </div>
          </div>
        ) : meetings.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <p className="text-gray-400 text-sm">No meetings found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {meetings.map((meeting) => (
              <MeetingCard key={meeting.id} meeting={meeting} />
            ))}
          </div>
        )}

        {showModal && (
          <NewMeetingModal
            onClose={() => setShowModal(false)}
            onMeetingCreated={fetchAllMeeting}
          />
        )}
      </div>
    </div>
  )
}

export default Dashboard