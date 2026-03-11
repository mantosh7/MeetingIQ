function StatsCard({ label, value, color }) {
    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm">
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">{label}</p>
            <p className={`text-4xl font-bold ${color}`}>{value}</p>
        </div>
    )
}

export default StatsCard