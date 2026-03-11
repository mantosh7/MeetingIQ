function MeetingCard({ meeting }) {
  const highPriorityCount = meeting.tasks?.filter(t => t.priority === 'High').length || 0

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm cursor-pointer hover:shadow-md transition-shadow">
      
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold text-gray-800">{meeting.title}</h3>
        <span className="text-gray-400">›</span>
      </div>

      <p className="text-sm text-gray-500 mb-4 line-clamp-2">{meeting.summary}</p>

      <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
        <span>📅 {new Date(meeting.createdAt).toLocaleDateString()}</span>
        <span>✓ {meeting.tasks?.length || 0} actions</span>
      </div>

      {highPriorityCount > 0 && (
        <span className="text-xs text-red-500 bg-red-50 px-3 py-1 rounded-full">
          {highPriorityCount} High Priority
        </span>
      )}

    </div>
  )
}

export default MeetingCard