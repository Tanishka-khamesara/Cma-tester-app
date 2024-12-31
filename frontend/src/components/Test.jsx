import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


import Calculator from './Calculator';

const cmaQuestions = [
    // ... (your 25 CMA questions - simplified example)
    { id: 1, text: "A leading manufacturer of electric vehicles has accumulated customer driving interaction data through its unique pilot driver-assist program. This data will be used to further develop more advanced autonomous features that the company plans to implement in the near future on its most popular model. In integrated reporting, the system used to accumulate and analyze the driving data is best categorized as", options: ["A", "B", "C", "D"], userAnswer: null },
    { id: 2, text: "Question 2", options: ["A", "B", "C", "D"], userAnswer: null },
    { id: 3, text: "Question 3", options: ["A", "B", "C", "D"], userAnswer: null },
    { id: 4, text: "Question 4", options: ["A", "B", "C", "D"], userAnswer: null },
    { id: 5, text: "Question 5", options: ["A", "B", "C", "D"], userAnswer: null },
    { id: 6, text: "Question 6", options: ["A", "B", "C", "D"], userAnswer: null },
    { id: 7, text: "Question 7", options: ["A", "B", "C", "D"], userAnswer: null },
    { id: 8, text: "Question 8", options: ["A", "B", "C", "D"], userAnswer: null },
    { id: 9, text: "Question 9", options: ["A", "B", "C", "D"], userAnswer: null },
    { id: 10, text: "Question 10", options: ["A", "B", "C", "D"], userAnswer: null },
    { id: 11, text: "Question 11", options: ["A", "B", "C", "D"], userAnswer: null },
    { id: 12, text: "Question 12", options: ["A", "B", "C", "D"], userAnswer: null },
    { id: 13, text: "Question 13", options: ["A", "B", "C", "D"], userAnswer: null },
    { id: 14, text: "Question 14", options: ["A", "B", "C", "D"], userAnswer: null },
    { id: 15, text: "Question 15", options: ["A", "B", "C", "D"], userAnswer: null },
    { id: 16, text: "Question 16", options: ["A", "B", "C", "D"], userAnswer: null },
    { id: 17, text: "Question 17", options: ["A", "B", "C", "D"], userAnswer: null },
    { id: 18, text: "Question 18", options: ["A", "B", "C", "D"], userAnswer: null },
    { id: 19, text: "Question 19", options: ["A", "B", "C", "D"], userAnswer: null },
    { id: 20, text: "Question 20", options: ["A", "B", "C", "D"], userAnswer: null },
    { id: 21, text: "Question 21", options: ["A", "B", "C", "D"], userAnswer: null },
    { id: 22, text: "Question 22", options: ["A", "B", "C", "D"], userAnswer: null },
    { id: 23, text: "Question 23", options: ["A", "B", "C", "D"], userAnswer: null },
    { id: 24, text: "Question 24", options: ["A", "B", "C", "D"], userAnswer: null },
    { id: 25, text: "Question 25", options: ["A", "B", "C", "D"], userAnswer: null },
];

function Exam() {
    const navigate = useNavigate();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [questions, setQuestions] = useState([...cmaQuestions]);
    const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
    const [sectionTimeLeft, setSectionTimeLeft] = useState(2246);
    const [showScrollMessage, setShowScrollMessage] = useState(false);

    const userId = 'user123'; 
    


    useEffect(() => {
        const fetchProgress = async () => {
            try {
                const response = await fetch(`https://cma-tester-app.onrender.com/api/progress/${userId}`);
                if (!response.ok) {
                    const errorData = await response.json(); // Try to get error details from the server
                    throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.message || 'Unknown error'}`);
                }
                const data = await response.json();
                if (data.progress) {
                    setCurrentQuestionIndex(data.progress.currentQuestionIndex);
                    setQuestions(questions.map(q => ({ ...q, selectedAnswer: data.progress.answers?.[q.id] })));
                }
            } catch (error) {
                console.error('Error fetching progress:', error);
                // Handle the error appropriately, e.g., display an error message to the user
                alert("Failed to Load the progress")
            }
        };

        fetchProgress();
    }, [userId]); // Add userId as a dependency

    useEffect(() => {
        const saveProgress = async () => {
            try {
                const response = await fetch('https://cma-tester-app.onrender.com/api/progress', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        userId,
                        progress: {
                            currentQuestionIndex,
                            answers: questions.reduce((acc, q) => ({ ...acc, [q.id]: q.selectedAnswer }), {}),
                        },
                    }),
                });
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.message || 'Unknown error'}`);
                }
            } catch (error) {
                console.error('Error saving progress:', error);
                // Optionally, handle save errors, but it's often less critical than load errors
                alert("Failed to save the progress")
            }
        };

        saveProgress();
    }, [currentQuestionIndex, questions, userId]);

    useEffect(() => {
        if (sectionTimeLeft === 0) {
            navigate('/timeout');
            return;
        }
        const timerId = setInterval(() => {
            setSectionTimeLeft((prevTime) => prevTime - 1);
        }, 1000);
        return () => clearInterval(timerId);
    }, [sectionTimeLeft, navigate]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(remainingSeconds).padStart(2, '0');
        return `${formattedMinutes}:${formattedSeconds}`;
    };

    const handleAnswerSelect = (selectedOption) => {
        const updatedQuestions = [...questions];
        updatedQuestions[currentQuestionIndex].selectedAnswer = selectedOption;
        setQuestions(updatedQuestions);
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const toggleCalculator = () => {
        setIsCalculatorOpen(!isCalculatorOpen);
    };

    const answeredQuestionsCount = questions.filter(q => q.selectedAnswer).length;
    const progress = (answeredQuestionsCount / questions.length) * 100;
    const currentQuestion = questions[currentQuestionIndex];

    const handleScroll = () => {
        if (window.pageYOffset > 0) {
            setShowScrollMessage(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleFinishTest = () => {
        if (window.confirm("Are you sure you want to finish the test?")) {
            // Submit test data (logic depends on your backend implementation)
            window.confirm("If you select Finish, your answers will be submitted and you will not be able to return to the exam.")
          console.log("Submit test data"); 
          navigate('/finish'); 
        }
      };
    
      const allQuestionsAnswered = questions.every(question => question.selectedAnswer !== null);
    

    return (
        <div className="exam-container">
            <div className="top-bar">
                
                <div className="page-section">
                  <p>Question: {currentQuestionIndex + 1} <br></br> <span className="section-label">Section: 1</span></p>  
                </div>
                <div className="timer-progress">
                    Section Time Remaining: <span className="timer">{formatTime(sectionTimeLeft)}</span>
                    <div className="progress-bar-container">
                        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
                    </div>
                    {/* Finish Test */}
                    <button className="finish-button finish-test-button" onClick={handleFinishTest}>Finish Test</button>
                </div>

            </div>
            <div className="test-info">
              <div>Test: CMA Exam Simulation</div> 
              <div className="candidate">Candidate: USER Demo</div>
                    </div>
            <div className="main-content">
                <aside className="sidebar">
                   
                    <ul className="question-list">
                        {questions.map((question, index) => (
                            <li
                                key={question.id}
                                className={`question-item ${question.selectedAnswer ? 'answered' : ''} ${currentQuestionIndex === index ? 'active' : ''}`}
                                onClick={() => setCurrentQuestionIndex(index)}
                            >
                                {question.id}
                            </li>
                        ))}
                    </ul>
                </aside>
                <div className="content-area">
                    
                    <div className="question-content">
                        <p>{currentQuestion.text}</p>
                        <div className='calculator-btn' onClick={toggleCalculator}>Calculator</div>
                        <ul className="options-list">
                            {currentQuestion.options.map((option, index) => (
                                <li key={index} className={currentQuestion.selectedAnswer === option ? 'selected' : ''} onClick={() => handleAnswerSelect(option)}>
                                    {option}
                                </li>
                            ))}
                        </ul>
                    </div>
                    {showScrollMessage && (
                        <div className="scroll-message">This page requires scrolling X</div>
                    )}
                </div>
            </div>
            <div className="bottom-nav">
                <div className="settings-grid">⚙️ ▦ ❓</div>
                <div className="nav-buttons">
                    <button className="back-button" onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0}>
                        &lt; Back
                    </button>
                    <button className="next-button" onClick={handleNextQuestion} disabled={currentQuestionIndex === questions.length - 1}>
                        Next &gt;
                    </button>
                    {/* Conditionally render the Finish Test button */}
          {/* {!allQuestionsAnswered && <button className="finish-button" onClick={handleFinishTest}>Finish Test</button>} */}
                </div>
            </div>
            <div className='calculator-displaying'>
            {isCalculatorOpen && <Calculator onClose={toggleCalculator} />}
            </div>
        </div>
    );
}

export default Exam;