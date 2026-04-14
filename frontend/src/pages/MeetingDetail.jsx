import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

function MeetingDetail() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [meeting, setMeeting] = useState(null)
    const [loading, setLoading] = useState(true)
    const [showTranscript, setShowTranscript] = useState(false)

    // fetching meeting detail of particular id
    async function fetchMeeting() {
        try {
            const response = await axios.get(`/api/meetings/${id}`, { withCredentials: true })
            const m = response.data.message  // retrieving the actual meeting detail from the rsponse
            
            // parsing the tasks to apply filter on it
            const data = ({
                ...m,
                tasks: typeof m.tasks === 'string' ? JSON.parse(m.tasks) : (m.tasks || [])
            })
            setMeeting(data)
            setLoading(false)
        } catch (err) {
            console.log(err)
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchMeeting()
    }, [])

    if (loading) return <p className="text-center mt-10 text-gray-400">Loading...</p>
    if (!meeting) return <p className="text-center mt-10 text-gray-400">Meeting not found</p>

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <button onClick={() => navigate('/dashboard')} className="text-sm text-gray-400 hover:text-gray-600 mb-6 block">
                ← Back
            </button>

            <div className="max-w-2xl mx-auto bg-white rounded-2xl p-8 shadow-sm">

                <h1 className="text-2xl font-semibold mb-1">{meeting.title}</h1>
                <p className="text-sm text-gray-400 mb-6">
                    📅 {new Date(meeting.createdAt).toLocaleDateString()}
                </p>

                <h2 className="text-sm font-semibold text-gray-500 uppercase mb-2">Summary</h2>
                <p className="text-sm text-gray-600 bg-blue-50 rounded-xl p-4 mb-6">{meeting.summary}</p>

                <h2 className="text-sm font-semibold text-gray-500 uppercase mb-3">
                    Action Items ({meeting.tasks.length})
                </h2>
                <div className="flex flex-col gap-3 mb-6">
                    {meeting.tasks.map((task, index) => (
                        <div key={index} className="flex items-center justify-between border border-gray-100 rounded-xl px-4 py-3">
                            <p className="text-sm text-gray-700">{task.task}</p>
                            <div className="flex items-center gap-3 text-xs text-gray-400 shrink-0 ml-4">
                                <span>👤 {task.assignee || 'null'}</span>
                                <span>📅 {task.due_date || 'null'}</span>
                                <span className={`px-2 py-1 rounded-full font-medium ${task.priority === 'High' ? 'bg-red-50 text-red-500' : 'bg-yellow-50 text-yellow-500'}`}>
                                    {task.priority}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                <button
                    onClick={() => setShowTranscript(!showTranscript)}
                    className="text-sm text-gray-400 hover:text-gray-600"
                >
                    {showTranscript ? '▲ Hide Transcript' : '▼ Show Transcript'}
                </button>
                
                {/* to hide/display transcript */}
                {showTranscript && (
                    <div className="mt-3 bg-gray-50 rounded-xl p-4 text-sm text-gray-600 leading-relaxed">
                        {meeting.transcript}
                    </div>
                )}

            </div>
        </div>
    )
}

export default MeetingDetail