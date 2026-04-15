function Navbar({ onNewMeeting, search, setSearch, handleLogout }) {
  return (
    <nav className="bg-white border-gray-200 px-6 py-2 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="bg-gradient-to-r from-violet-700 to-purple-600 text-white rounded-full w-9 h-9 flex items-center justify-center font-bold">
          M
        </div>
        <span className="text-xl font-semibold text-gray-800">MeetingIQ</span>
      </div>

      <input
        type="text"
        placeholder="Search meetings..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border border-gray-200 rounded-full px-4 py-2 text-sm w-72 outline-none focus:border-purple-400"
      />

      <button
        onClick={onNewMeeting}
        className="text-white px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-violet-700 to-purple-600 hover:from-violet-800 hover:to-purple-700 transition"
      >
        + New Meeting
      </button>
    </nav>
  )
}

export default Navbar