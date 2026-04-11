function Navbar({ onNewMeeting, search, setSearch }) {
  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-evenly">
      <div className="flex items-center gap-2">
        <div className="bg-purple-600 text-white rounded-full w-9 h-9 flex items-center justify-center font-bold">
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
        className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-purple-700"
      >
        + New Meeting
      </button>
    </nav>
  )
}

export default Navbar