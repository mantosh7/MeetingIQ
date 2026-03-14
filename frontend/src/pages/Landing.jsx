import { useNavigate } from 'react-router-dom'
import meetingImage from "../assets/LandingPageImage.png";

function Landing() {
    const navigate = useNavigate()

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #f5f3ff 0%, #ffffff 100%)',
            backgroundImage: `url(${meetingImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            alignItems: 'center',
            padding: '0 80px',
            gap: '60px'
        }}>

            {/* Left Side */}
            <div style={{ flex: 1 }}>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '32px' }}>
                    <div style={{
                        background: '#7c3aed', color: 'white', borderRadius: '50%',
                        width: '42px', height: '42px', display: 'flex',
                        alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '18px'
                    }}>
                        M
                    </div>
                    <span style={{ fontSize: '22px', fontWeight: '600', color: '#1f2937' }}>MeetingIQ</span>
                </div>

                <p style={{ color: '#7c3aed', fontSize: '12px', fontWeight: '700', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '16px' }}>
                    AI Powered Meetings
                </p>

                <h1 style={{ fontSize: '56px', fontWeight: '800', color: '#1f2937', lineHeight: '1.15', marginBottom: '24px' }}>
                    Turn Meetings <br /> into Action
                </h1>

                <p style={{ color: '#9ca3af', fontSize: '17px', lineHeight: '1.8', maxWidth: '420px', marginBottom: '44px' }}>
                    Upload your meeting audio or paste transcript — MeetingIQ extracts key insights, action items, and summaries using AI.
                </p>

                <button
                    onClick={() => navigate('/login')}
                    style={{
                        background: '#7c3aed', color: 'white', padding: '14px 36px',
                        borderRadius: '999px', fontSize: '15px', fontWeight: '600',
                        border: 'none', cursor: 'pointer'
                    }}
                    onMouseEnter={e => e.target.style.background = '#6d28d9'}
                    onMouseLeave={e => e.target.style.background = '#7c3aed'}
                >
                    Get Started →
                </button>

            </div>

            {/* Right Side */}
            {/* <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                <img
                    src={meetingImage}
                    alt="Team Meeting"
                    style={{
                        width: '100%', maxWidth: '540px', height: '440px',
                        objectFit: 'cover', borderRadius: '24px',
                        boxShadow: '0 25px 60px rgba(124, 58, 237, 0.15)'
                    }}
                />
            </div> */}

        </div>
    )
}

export default Landing