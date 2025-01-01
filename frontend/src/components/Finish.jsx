import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';



function Finish() {
    const navigate = useNavigate();
    const [timeLeft, setTimeLeft] = useState(50); 

    useEffect(() => {
        if (timeLeft === 0) {
            navigate('/');  
            return;
        }

        const intervalId = setInterval(() => {
            setTimeLeft((prevTime) => prevTime - 1);
        }, 1000);

        return () => clearInterval(intervalId); 
    }, [timeLeft, navigate]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(remainingSeconds).padStart(2, '0');
        return `${formattedMinutes}:${formattedSeconds}`;
    };

    const handleFinishTest = () => {
        navigate('/'); 
    };

    const progress = ((50 - timeLeft) / 50) * 100; 

    return (
        <div className="finish-container">
            <div className="top-bar">
                <div className="page-section">
                    Page: 1 <span className="section-label">Section: Finish</span>
                </div>
                <div className="timer-progress">
                    Finish Time Remaining <span className="timer">{formatTime(timeLeft)}</span>
                    <div className="progress-bar-container">
                        <div
                            className="progress-bar"
                            style={{ width: `${progress}%` }} 
                        ></div>
                    </div>
                </div>
                <button className="finish-test-button" onClick={handleFinishTest}>
                    Finish Test
                </button>
            </div>
            <div className="content-area">
                <div className="test-info">
                    Test: CMA Exam Simulation <span className="candidate">Candidate: USER Demo</span>
                </div>
                <div className="finish-content">
                    <img src="https://training.prod.prometric.mindgrb.io/CMA-Tutorial/StylePackages/34/445/f1b4d59d-b478-4a13-9be1-39c7caf415ab.jpeg" alt="CMA Logo" className="cma-logo" />
                    <div className="ima-text">
                        IMA's Certification for<br />
                        Accountants and<br />
                        Financial Professionals<br />
                        in Business
                    </div>
                    <p>You have completed your CMA Exam Simulation.</p>
                    <p>Thank you for testing with Prometric.</p>
                    <p>
                        Please click the "Finish Test" button in the upper-right corner now to finish your
                        exam.
                    </p>
                </div>
            </div>
            <div className="bottom-nav">
                <div className="settings-grid">⚙️ ▦</div>
            </div>
        </div>
    );
}

export default Finish;
