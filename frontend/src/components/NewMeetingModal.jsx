import { useState } from 'react'
import axios from 'axios'

function NewMeetingModal({ onClose, onMeetingCreated }) {
    const [title, setTitle] = useState('')
    const [transcript, setTranscript] = useState('')
    const [audioFile, setAudioFile] = useState(null)
    const [mode, setMode] = useState('transcript') // 'transcript' ya 'audio'
    const [loading, setLoading] = useState(false)

    // handle new meeting submission
    async function handleSubmit() {
        if (!title) return alert('Title required')

        const formData = new FormData()
        formData.append('title', title)

        if (mode === 'audio' && audioFile) {
            formData.append('audio', audioFile)
        } else if (mode === 'transcript' && transcript) {
            formData.append('transcript', transcript)
        } else {
            return alert('Please provide transcript or audio')
        }

        try {
            setLoading(true)
            await axios.post('http://localhost:5000/api/meetings/create', formData)
            onMeetingCreated() // dashboard refresh karo
            onClose()
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 w-full max-w-lg">

                <div className="flex items-center justify-between mb-1">
                    <h2 className="text-xl font-semibold">New Meeting</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">✕</button>
                </div>
                <p className="text-sm text-gray-400 mb-6">Paste transcript or upload audio to extract AI insights</p>

                {/* Title */}
                <label className="text-sm text-gray-600 mb-1 block">Meeting Title</label>
                <input
                    type="text"
                    placeholder="e.g. Q1 Planning Call"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm mb-4 outline-none focus:border-purple-400"
                />

                {/* Mode toggle */}
                <div className="flex gap-2 mb-4">
                    <button
                        onClick={() => setMode('transcript')}
                        className={`px-4 py-1.5 rounded-full text-sm ${mode === 'transcript' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-500'}`}
                    >
                        Transcript
                    </button>
                    <button
                        onClick={() => setMode('audio')}
                        className={`px-4 py-1.5 rounded-full text-sm ${mode === 'audio' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-500'}`}
                    >
                        Audio
                    </button>
                </div>

                {/* Transcript input */}
                {mode === 'transcript' && (
                    <textarea
                        placeholder="Paste your meeting transcript here..."
                        value={transcript}
                        onChange={(e) => setTranscript(e.target.value)}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm h-40 outline-none focus:border-purple-400 resize-none"
                    />
                )}

                {/* Audio input */}
                {mode === 'audio' && (
                    <input
                        type="file"
                        accept="audio/*"
                        onChange={(e) => setAudioFile(e.target.files[0])}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm"
                    />
                )}

                {/* Buttons */}
                <div className="flex justify-end gap-3 mt-6">
                    <button onClick={onClose} className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700">Cancel</button>
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="bg-purple-600 text-white px-5 py-2 rounded-full text-sm hover:bg-purple-700"
                    >
                        {loading ? 'Analyzing...' : '✦ Analyze & Save'}
                    </button>
                </div>

            </div>
        </div>
    )
}

export default NewMeetingModal