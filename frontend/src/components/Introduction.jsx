import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const examContent = [
  // Page 1 Content
  {
    title: 'CMA Exam Simulation - Introduction',
    text: [
      "This CMA Exam Simulation contains 25 multiple-choice questions presented in one (1) content section. You will have 45 minutes to complete the exam.",
      "Please note that the purpose of this Exam Simulation is to give you a sense of the experience of the exam as it will be in the test center. The simulated exam experience is not indicative of the breadth and depth of the CMA exam content. This Exam Simulation is shorter than the CMA certification exams, and contains only one section.",
      "Please note that for the CMA certification exam, you will have 2 content sections and you will have 3 hours to complete both sections. The first (1) content section will be multiple-choice and you will have 3 hours to complete this section. You must answer at least 50% of the multiple-choice questions correctly to continue to the essay content section will contain two essays and related questions There will be a post-exam survey in the CMA certification",
    ],
  },
  // Page 2 Content
  { title: 'Page 2', text: ["Content for page 2.", "More content for page 2."] },
  { title: 'Page 3', text: ["Content for page 3."] },
  { title: 'Page 4', text: ["Content for page 4.", "More content."] },
  { title: 'Page 5', text: ["Content for page 5."] },
  { title: 'Page 6', text: ["Content for page 6.", "More content."] },
  { title: 'Page 7', text: ["Content for page 7."] },
  { title: 'Page 8', text: ["Content for page 8.", "More content."] },
  { title: 'Page 9', text: ["Content for page 9."] },
  { title: 'Page 10', text: ["Content for page 10.", "More content."] },
  { title: 'Page 11', text: ["Content for page 11."] },
  { title: 'Page 12', text: ["Content for page 12.", "More content."] },
  { title: 'Page 13', text: ["Content for page 13."] },
  { title: 'Page 14', text: ["Content for page 14.", "Last page content."] },
];

function Introduction() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [timeLeft, setTimeLeft] = useState(897); //14 minutes 57 seconds
  const [showScrollMessage, setShowScrollMessage] = useState(true);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
};

  useEffect(() => {
      if (timeLeft === 0) {
          navigate('/test');
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

  const handleNext = () => {
      if (currentPage < examContent.length - 1) {
          setCurrentPage(currentPage + 1);
      } else {
          navigate('/exam');
      }
  };

  const handleBack = () => {
      if (currentPage > 0) {
          setCurrentPage(currentPage - 1);
      }
  };

  const handleStartTest = () => {
      navigate('/test');
  };

  const handleScroll = () => {
      if (window.pageYOffset > 0) {
          setShowScrollMessage(false);
      }
  };

  useEffect(() => {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currentContent = examContent[currentPage];
  // const progress = ((currentPage + 1) / examContent.length) * 100;

  return (
      <div className="exam-intro-container">
          <div className="top-bar">
              <div className="page-section">
                  Page: {currentPage+1} <br></br><span className="section-label">Section: Introduction</span>
              </div>
              <div className="timer-progress">
                  Introduction Time Rem... <span className="timer">{formatTime(timeLeft)}</span>
                  <div className="progress-bar-container">
                      <div className="progress-bar" style={{ width: `${0}%` }}></div>
                  </div>
<button className='finish-test-button'>Finish Test</button>
              </div>
          </div>
          <div className="test-info">
              <div>Test: CMA Exam Simulation</div> 
              <div className="candidate">Candidate: USER Demo</div>
                    </div>
     
          <div className="main-content"> {/* Main content area */}
                <aside className="sidebar"> {/* Sidebar */}
                   
                    <ul className="page-list">
                        {examContent.map((page, index) => (
                            <li
                                key={index}
                                className={`page-item ${currentPage === index ? 'active' : ''}`}
                                onClick={() => handlePageChange(index)}
                            >
                                {index + 1}
                            </li>
                        ))}
                    </ul>
              </aside>
              
                <div className="content-area">
                    
                    <div className="exam-title">{currentContent.title}</div>
                    <div className="exam-text">
                        {currentContent.text.map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                        ))}
                    </div>
                    {/* ... (scroll message) */}
                </div>
            </div>
          <div className="bottom-nav">
              <div className="settings-grid">⚙️ ▦ ❓</div>
              <div className="nav-buttons">
                  <button className="back-button" onClick={handleBack} disabled={currentPage === 0}>
                      &lt; Back
                  </button>
                  <button className="next-button" onClick={handleNext}>
                      {currentPage === examContent.length - 1 ? 'Start the Test >' : 'Next >'}
          </button>
          <button  className="back-button" onClick={handleStartTest}>Start the test </button>
              </div>
          </div>
      </div>
  );
}

export default Introduction;