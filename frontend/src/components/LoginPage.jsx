import React, { useState } from 'react';
import './Loginpage.css';
import { useNavigate } from 'react-router-dom'; 

function LoginPage() {
  const [keycode, setKeycode] = useState('........');
  const [InvalidText, setInvalidText] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setKeycode(event.target.value);
  };

  const handleOkClick = () => {
    

    if (keycode.length == 8) {
      navigate('/confirm');
    } else {
      setInvalidText("Invalid Keycode:Please enter your 8 character HTML Keycode.")
    }
  };

  return (
    <div className="app">
      <div className="container">
        <h1 className="title">Enter Keycode</h1>
        <button className="test-delivery">Test Delivery</button>
        <p className="instruction">Please enter your 8 character HTML Keycode.</p>

        <div className="input-group">
          <input
            type="password"
            className="input-field"
            maxLength="8"
            value={keycode}
            onChange={handleInputChange}
          />
          <button className="ok-button" onClick={handleOkClick}>✔ OK</button>
        </div>
        <div>
          <h4>{InvalidText}</h4>
        </div>

        <div className="button-group">
          <button className="button">✔ System Check</button>
          <button className="button">Preferences</button>
        </div>
        <div className="prometric">Prometric</div>
      </div>
    </div>
  );
}

export default LoginPage;