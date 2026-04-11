import { useState } from "react";
import landingPageImage from "../assets/landingpage.png";
import {useNavigate} from "react-router-dom" ;

export default function MeetingIQHomepage() {
    const [email, setEmail] = useState("");
    const navigate = useNavigate() ;

    return (
        <div className="h-screen overflow-hidden flex flex-col bg-[#F5F4FA]">

            {/* ── NAV ── */}
            <nav className="flex items-center justify-between px-12 h-16 shrink-0 z-50">
                <div className="flex items-center gap-3 ml-10">
                    <div className="w-9 h-9 rounded-full bg-purple-600 flex items-center justify-center text-white font-semibold text-sm">
                        M
                    </div>
                    <span className="text-black font-semibold text-lg">
                        MeetingIQ
                    </span>
                </div>

                <div className="flex items-center">
                    <button onClick={()=>navigate("/signup")} className="text-sm px-5 py-2 rounded-full bg-purple-600 text-white font-medium mr-4 hover:bg-purple-700 transition-colors">
                        Register
                    </button>
                    <button onClick={()=>navigate("/login")} className="text-sm px-5 py-2 rounded-full bg-purple-600 text-white font-medium mr-10 hover:bg-purple-700 transition-colors">
                        Log In
                    </button>
                </div>
            </nav>

            {/* ── HERO ── */}
            <div className="flex items-center flex-1 px-12 gap-20 overflow-hidden">

                {/* LEFT */}
                <div className="flex-1 max-w-lg ml-40">

                    <div className="inline-flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-full bg-purple-100 text-purple-700 border border-purple-200 mb-5">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-600" />
                        Powered by Whisper + Groq LLaMA 3.1
                    </div>

                    <h1 className="text-5xl font-semibold leading-tight text-[#1a1a2e] mb-4 tracking-tight">
                        You Have Meetings,
                        <br />
                        We Have{" "}
                        <span className="text-purple-600">Brilliant</span>
                        <br />
                        <span className="text-purple-600">Insights.</span>
                    </h1>

                    <p className="text-sm text-gray-500 leading-relaxed mb-7 max-w-sm">
                        Upload any recording and get AI-powered summaries, action items,
                        assignees and deadlines — 100% offline, no data leaks.
                    </p>

                    <div className="flex items-center bg-white border border-purple-100 rounded-full pl-5 pr-1 py-1 max-w-sm mb-3 shadow-sm">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="flex-1 text-sm text-gray-700 bg-transparent outline-none placeholder-gray-300"
                        />
                        <button className="text-sm px-5 py-2 bg-purple-600 text-white rounded-full font-medium hover:bg-purple-700 transition-colors whitespace-nowrap">
                            Get Started
                        </button>
                    </div>

                    <p className="text-xs text-gray-400 flex items-center gap-1.5">
                        <span className="w-4 h-4 rounded-full bg-purple-600 text-white flex items-center justify-center text-[9px]">
                            ✓
                        </span>
                        Free to try · No credit card required · 100% offline
                    </p>
                </div>

                {/* RIGHT */}
                <div className="flex-1 flex items-center justify-center relative h-full">
                    <img
                        src={landingPageImage}
                        alt="MeetingIQ Dashboard"
                        className="w-full h-full object-cover"
                    />
                </div>

            </div>
        </div>
    );
}