import React, { useState, useEffect, useRef } from 'react';

const Calculator = ({ onClose }) => {
    const [displayValue, setDisplayValue] = useState('0');
    const displayRef = useRef(null);

    useEffect(() => {
        if (displayRef.current) {
            displayRef.current.scrollLeft = displayRef.current.scrollWidth;
        }
    }, [displayValue]);

    const handleButtonClick = (value) => {
        if (displayValue === '0' || displayValue === 'Error') {
            setDisplayValue(value);
        } else {
            setDisplayValue(displayValue + value);
        }
    };

    const handleClear = () => {
        setDisplayValue('0');
    };

    const handleCalculate = () => {
        try {
            // eslint-disable-next-line no-eval
            const result = eval(displayValue);
            if (isNaN(result) || !isFinite(result)) {
                setDisplayValue('Error');
            } else {
                setDisplayValue(result.toString());
            }
        } catch (error) {
            setDisplayValue('Error');
        }
    };

    const handleDelete = () => {
        if (displayValue.length === 1 || displayValue === 'Error') {
            setDisplayValue('0');
        } else {
            setDisplayValue(displayValue.slice(0, -1));
        }
    };

    return (
        <div className="calculator">
            <div className='calculator-header'>
                <button onClick={onClose} className='close-btn'>X</button>
            </div>
            <div className="display" ref={displayRef}>{displayValue}</div>
            <div className="buttons">
                <button onClick={() => handleButtonClick('7')}>7</button>
                <button onClick={() => handleButtonClick('8')}>8</button>
                <button onClick={() => handleButtonClick('9')}>9</button>
                <button onClick={() => handleButtonClick('/')}>/</button>
                <button onClick={() => handleButtonClick('4')}>4</button>
                <button onClick={() => handleButtonClick('5')}>5</button>
                <button onClick={() => handleButtonClick('6')}>6</button>
                <button onClick={() => handleButtonClick('*')}>*</button>
                <button onClick={() => handleButtonClick('1')}>1</button>
                <button onClick={() => handleButtonClick('2')}>2</button>
                <button onClick={() => handleButtonClick('3')}>3</button>
                <button onClick={() => handleButtonClick('-')}>-</button>
                <button onClick={() => handleButtonClick('0')}>0</button>
                <button onClick={() => handleButtonClick('.')}>.</button>
                <button onClick={handleCalculate}>=</button>
                <button onClick={() => handleButtonClick('+')}>+</button>
                <button className='clear-btn' onClick={handleClear}>C</button>
                <button className='delete-btn' onClick={handleDelete}>Del</button>
            </div>
        </div>
    );
};

export default Calculator;