import { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from '../components/Navbar'
import StatsCard from '../components/StatsCard'
import MeetingCard from '../components/MeetingCard'
import NewMeetingModal from '../components/NewMeetingModal'

function Dashboard() {
  const [meetings, setMeetings] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [search, setSearch] = useState('')

  // fetching all the meetings (history)
  async function fetchAllMeeting() {
    try {
      const response = await axios.get('http://localhost:5000/api/meetings/all')
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
    fetchAllMeeting()
  }, [])

  // search filter
  const filteredMeetings = meetings.filter((m) =>
    m.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onNewMeeting={() => setShowModal(true)} search={search} setSearch={setSearch} />
      <div className="max-w-6xl mx-auto px-6 py-8">

        <div className="grid grid-cols-4 gap-4 mb-8">
          <StatsCard label="Total Meetings" value={meetings.length} color="text-purple-600" />
          <StatsCard label="Action Items" value={meetings.reduce((acc, m) => acc + m.tasks.length, 0)} color="text-blue-500" />
          <StatsCard label="High Priority" value={meetings.reduce((acc, m) => acc + m.tasks.filter(t => t.priority === 'High').length, 0)} color="text-red-500" />
          <StatsCard label="Analyzed" value={meetings.length} color="text-green-500" />
        </div>

        {loading ? (
          <p className="text-gray-400 text-center">Loading...</p>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {/* to display filtered meeting (if anyone filtered, otherwise whole meetings) */}
            {filteredMeetings.map((meeting) => (
              <MeetingCard key={meeting.id} meeting={meeting} />
            ))}
          </div>
        )}

      </div>

      {/* to display/hide new meeting modal*/}
      {showModal && (
        <NewMeetingModal
          onClose={() => setShowModal(false)}
          onMeetingCreated={fetchAllMeeting}
        />
      )}
    </div>
  )
}

export default Dashboard