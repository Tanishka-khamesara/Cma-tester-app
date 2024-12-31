import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


function Terms() {
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes in seconds
  const navigate = useNavigate();

  useEffect(() => {
    if (timeLeft === 0) {
      if (window.confirm("Are you sure Your details are incorrect?")) {
        // Submit test data (logic depends on your backend implementation)
        console.log("Submit test data"); 
        navigate('/')
      }  // Redirect when time runs out
      return;
    }

    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(intervalId); // Clear interval on unmount
  }, [timeLeft, navigate]);

    const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  const handleContinue = () => {
    if (acceptedTerms) {
      navigate('/introduction'); // Navigate to the next page
    }
  };

  return (
    <div className="agreement-container">
      <div className="agreement-wrapper">
      <div className='black-confirm2'>
          <div>Agree to Terms</div>
          <div className='timer'>Time Remaining: {formatTime(timeLeft)}</div>
        </div>
        <div className='confirm-details-box2'>
        <div className="agreement-Logo">
              <img src="https://training.prod.prometric.mindgrb.io/CMA-Tutorial/StylePackages/34/445/f1b4d59d-b478-4a13-9be1-39c7caf415ab.jpeg" alt="CMA Logo"  />
          </div>
        <div className="agreement-content">
          <h2 className="agreement-title">CONFIDENTIALITY AGREEMENT</h2>
          <div className="agreement-text-area">
            {/* Your agreement text here */}
            <p>
            I hereby attest that I will not divulge the content of this examination, nor will I remove any examination materials, notes or other unauthorized materials from the examination room. I understand that failure to comply with this attestation may result in invalidation of my grades and disqualification from future examinations. For those already certified by the Institute of Certified Management Accountants, failure to comply with the statement will be considered a violation of IMA’s Statement of Ethical Professional Practice and could result in revocation of the certification.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
              ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
              pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
              culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <p>Copyright© 2021 by<br/>Institute of Certified Management Accountants</p>
          </div>
        </div>
       
        <div className="agreement-checkbox">
          <input
            type="checkbox"
            id="acceptTerms"
            checked={acceptedTerms}
            onChange={setAcceptedTerms}
          />
          <label htmlFor="acceptTerms">I accept these terms.</label>
        </div>
        <div className="agreement-buttons">
          <button className="exit-button" onClick={() => navigate('/')}>X Exit</button>
          <button className="continue-button" disabled={!acceptedTerms} onClick={handleContinue}>
            ✔ Continue
          </button>
        </div>
        <div className="prometric">Prometric</div>
        </div>
      </div>
    </div>
  );
}

export default Terms;