import axios from "axios";
import toast from "react-hot-toast"; 
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function handleSubmit() {
        try {
            await axios.post("/api/auth/signup",
                { name, email, password },
            );

            toast.success("Signup successful! ✅");
            navigate("/login");

        } catch (err) {
            toast.error(err.response?.data?.message || "Something went wrong");
        }
    }

    return (
        <div className="h-screen bg-[#F5F4FA] flex items-center justify-center">

            {/* Home button */}
            <button
                onClick={() => navigate('/')}
                className="absolute top-6 left-6 text-sm text-gray-400 hover:text-gray-600"
            >
                ← Home
            </button>

            {/* Centered content */}
            <div className="w-full h-full flex items-center justify-center">

                <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-purple-100">

                    {/* Logo */}
                    <div className="flex items-center gap-2 mb-6">
                        <div className="w-9 h-9 rounded-full bg-purple-600 flex items-center justify-center text-white font-semibold">
                            M
                        </div>
                        <span className="font-semibold text-lg">MeetingIQ</span>
                    </div>

                    {/* Heading */}
                    <h2 className="text-2xl font-semibold text-[#1a1a2e] mb-2">
                        Create your account 🚀
                    </h2>
                    <p className="text-sm text-gray-500 mb-6">
                        Start using AI-powered meeting insights
                    </p>

                    {/* Form */}
                    <form
                        className="flex flex-col gap-4"
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSubmit() ;
                        }}
                    >

                        <input
                            type="text"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />

                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />

                        <input
                            type="password"
                            placeholder="Create a password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />

                        <button
                            type="submit"
                            className="w-full py-3 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 transition-colors"
                        >
                            Sign Up
                        </button>

                    </form>

                    {/* Footer */}
                    <p className="text-sm text-gray-500 mt-6 text-center">
                        Already have an account?{" "}
                        <span
                            onClick={() => navigate("/login")}
                            className="text-purple-600 font-medium cursor-pointer"
                        >
                            Log In
                        </span>
                    </p>

                </div>

            </div>
        </div>
    );
}