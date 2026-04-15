import { useState, useEffect } from 'react'
import axios from 'axios'
import toast from "react-hot-toast";
import { Menu, X, User, Lock, LogOut, LayoutDashboard } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from '../components/Navbar'
import StatsCard from '../components/StatsCard'
import MeetingCard from '../components/MeetingCard'
import NewMeetingModal from '../components/NewMeetingModal'

function Dashboard() {
  const [meetings, setMeetings] = useState([])
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [search, setSearch] = useState('')
  const navigate = useNavigate();

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

  const filteredMeetings = meetings.filter((m) =>
    m.title.toLowerCase().includes(search.toLowerCase())
  )

  async function handleLogout() {
    await axios.post("/api/auth/logout", {}, { withCredentials: true });
    toast.success("Logged out!");
    navigate("/login");
  }

  return (
    <div className="min-h-screen bg-gray-50 flex overflow-hidden">

      {/* Sidebar */}
      <div
        className={`
          flex-shrink-0 h-screen sticky top-0
          bg-white border-r border-gray-100
          transition-all duration-300 ease-in-out overflow-hidden
          ${sidebarOpen ? "w-64" : "w-0"}
        `}
      >
        {/* Min-width wrap so content doesn't squish during animation */}
        <div className="w-64 h-full flex flex-col">

          {/* Sidebar Header */}
          <div className="h-19.5 flex items-center justify-between px-5 bg-gradient-to-r from-violet-700 to-purple-600">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-violet-200 font-medium">
                Workspace
              </p>
              <h2 className="text-white font-semibold text-base mt-0.5">MeetingIQ</h2>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition text-white"
            >
              <X size={16} />
            </button>
          </div>

          {/* Nav Items */}
          <nav className="flex-1 px-3 py-4 space-y-1">

            <p className="text-[10px] uppercase tracking-widest text-gray-400 font-medium px-3 mb-2">
              Menu
            </p>

            <button onClick={()=>navigate("/dashboard")} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl
              hover:bg-violet-50 hover:text-violet-700 text-gray-600 transition group text-sm font-medium">
              <LayoutDashboard size={16} className="text-gray-400 group-hover:text-violet-600" />
              Dashboard
            </button>

            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl
              hover:bg-violet-50 hover:text-violet-700 text-gray-600 transition group text-sm font-medium">
              <User size={16} className="text-gray-400 group-hover:text-violet-600" />
              Profile
            </button>

            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl
              hover:bg-violet-50 hover:text-violet-700 text-gray-600 transition group text-sm font-medium">
              <Lock size={16} className="text-gray-400 group-hover:text-violet-600" />
              Change Password
            </button>

          </nav>

          {/* Logout  */}
          <div className="px-3 py-4 border-t border-gray-100">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl
                hover:bg-red-50 hover:text-red-600 text-gray-500 transition group text-sm font-medium"
            >
              <LogOut size={16} className="text-gray-400 group-hover:text-red-500" />
              Logout
            </button>
          </div>

        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Top Navbar */}
        <div className="sticky top-0 z-30 flex items-center gap-3 px-6 py-3
          bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">

          {/* Hamburger */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-md border border-gray-200 hover:bg-gray-50
              hover:border-violet-300 transition text-gray-500 hover:text-violet-600"
          >
            <Menu size={18} />
          </button>

          <div className="flex-1">
            <Navbar
              onNewMeeting={() => setShowModal(true)}
              search={search}
              setSearch={setSearch}
              handleLogout={handleLogout}
            />
          </div>
        </div>

        {/* Dashboard Body */}
        <div className="flex-1 max-w-6xl w-full mx-auto px-6 py-8">

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            <StatsCard
              label="Total Meetings"
              value={meetings.length}
              color="text-violet-600"
            />
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
            <StatsCard
              label="Analyzed"
              value={meetings.length}
              color="text-green-500"
            />
          </div>

          {/* Meetings Grid */}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-8 border-2 border-violet-600 border-t-transparent
                  rounded-full animate-spin" />
                <p className="text-sm text-gray-400">Loading meetings...</p>
              </div>
            </div>
          ) : filteredMeetings.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3">
              <p className="text-gray-400 text-sm">No meetings found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredMeetings.map((meeting) => (
                <MeetingCard key={meeting.id} meeting={meeting} />
              ))}
            </div>
          )}

        </div>
      </div>

      {/* Modal */}
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