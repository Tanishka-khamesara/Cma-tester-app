import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


function ConfirmDetails() {
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes in seconds
  const navigate = useNavigate();

  useEffect(() => {
    if (timeLeft === 0) {
      window.confirm("Your time is over to confirm the details.")
      navigate('/'); // Redirect to the root path when time runs out
      return; // Important: Stop the interval
    }

    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(intervalId); // Clear interval on unmount
  }, [timeLeft, navigate]); // Add navigate to dependency array

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  function ConfirmAgain() {
    if (window.confirm("Are you sure Your details are incorrect?")) {
      // Submit test data (logic depends on your backend implementation)
      console.log("Submit test data"); 
      navigate('/')
    } 
  }

  return (
    <div className="confirm-details-container">
      <div className="confirm-details-wrapper">
        {/* <div className="confirm-details-timer">{formatTime(timeLeft)}</div> */}
        <div className='black-confirm'>
          <div>Confirm Details</div>
        <div className="confirm-details-timer">{formatTime(timeLeft)}</div>
        </div>
        <div className='confirm-details-box'>
        <div className="confirm-details-header">
          
          <div className="confirm-details-logo">
              <img src="https://training.prod.prometric.mindgrb.io/CMA-Tutorial/StylePackages/34/445/f1b4d59d-b478-4a13-9be1-39c7caf415ab.jpeg" alt="CMA Logo"  />
          </div>
        </div>

        <div className="confirm-details-info">
          <div className="confirm-details-info-row">
            <div className="confirm-details-label">Last Name:</div>
            <div className="confirm-details-value">USER</div>
          </div>
          <div className="confirm-details-info-row">
            <div className="confirm-details-label">First Name:</div>
            <div className="confirm-details-value">Demo</div>
          </div>
          <div className="confirm-details-info-row">
            <div className="confirm-details-label">Exam Name:</div>
            <div className="confirm-details-value">CMA Exam Simulation</div>
          </div>
          <div className="confirm-details-info-row">
            <div className="confirm-details-label">Language:</div>
            <div className="confirm-details-value">English</div>
          </div>
        </div>

        <div className="confirm-details-confirmation-text">Are the details above correct?</div>
        </div>

        <div className="confirm-details-button-group">
          <button className="confirm-details-confirm-button" onClick={()=>navigate('/terms')}>✔ Confirm</button>
          <button className="confirm-details-cancel-button" onClick={ConfirmAgain}>X Cancel</button>
        </div>
        <div className="confirm-details-prometric">Prometric</div>
      </div>
    </div>
  );
}

export default ConfirmDetails;