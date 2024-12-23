import React, { useState, useContext, useRef, useEffect } from 'react';
import './Main.css';
import { assets } from '../../assets/assets';
import { Context } from '../../context/Context';

const Main = () => {
  const { onSent, recentPrompt, showResult, loading, resultData, setInput, input } = useContext(Context);
  const inputRef = useRef(null);
  const [mic, setMic] = useState(false);
  const textarearef = useRef(null);
  const [dark, setDark] = useState(false);
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && input) {
      onSent();
    }
  };

  const handleCard = (newValue) => {
    if (inputRef.current) {
      inputRef.current.value = newValue;
    }
    setInput(newValue);
  };

  useEffect(() => {
    if (dark) {
      document.documentElement.style.setProperty('--background-color', 'black');
      document.documentElement.style.setProperty('--color','white');
      document.documentElement.style.setProperty('--dark-hover','white');
      document.documentElement.style.setProperty('--dark-clr','black');
      document.documentElement.style.setProperty('--input-border','0.2px solid grey');
      document.documentElement.style.setProperty('--card-back','black');
      document.documentElement.style.setProperty('--sidebar-color','#121212');
    } else {
      document.documentElement.style.setProperty('--background-color', 'white');
      document.documentElement.style.setProperty('--color','black');
      document.documentElement.style.setProperty('--dark-hover','black');
      document.documentElement.style.setProperty('--dark-clr','white');
      document.documentElement.style.setProperty('--input-border','none');
      document.documentElement.style.setProperty('--card-back','#f0f4f9');
      document.documentElement.style.setProperty('--sidebar-color','#f0f4f9');
    }
    if (resultData && mic) {
    window.speechSynthesis.cancel();
    const ress = resultData.split("</br>");
    const resultData1 = ress.join(" ");
    const utterance = new SpeechSynthesisUtterance(resultData1);
    window.speechSynthesis.speak(utterance);
} else {
    window.speechSynthesis.cancel();
}

  }, [resultData, mic, dark]);



  return (
    <div className="main">
      <div className="nav">
        <p>Chat-Bot</p>
        <div>
        <img id="mobileDp" onClick={() => setDark(prev=>!prev) } src={assets.moon_icon} />
        <img className="image" src={assets.user_icon} alt="" />
        </div>
      </div>
      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p><span>Hii !</span></p>
              <p>How can I help you?</p>
            </div>
            <div className="cards">
              <div onClick={() => handleCard("What about today ?")} className="card">
                <p>What about today ?</p>
                <img src={assets.compass_icon} alt="" />
              </div>
              <div onClick={() => handleCard("What is AI ?")} className="card">
                <p>What is AI ?</p>
                <img src={assets.bulb_icon} alt="" />
              </div>
              <div onClick={() => handleCard("How an AI will be useful for Human ?")} className="card1">
                <p>How an AI will be useful for Human ?</p>
                <img src={assets.message_icon} alt="" />
              </div>
              <div onClick={() => handleCard("Shall we do some Math or Code ?")} className="card1">
                <p>Shall we do some Math or Code ?</p>
                <img src={assets.code_icon} alt="" />
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src={assets.user_icon} alt="" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="" />
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              )}
            </div>
          </div>
        )}
        <div className="main-bottom">
          <div className="search-box">
            <input
              className="in"
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              value={input}
              type="text"
              placeholder="Enter a prompt here..."
              ref={inputRef}
            />
            <div style={{ userselect: "none" }}>
              <img src={assets.gallery_icon} alt="" />
              { !mic?<img title="Speak" onClick={() => setMic(prev => !prev)} src={assets.speaker_icon} alt="" /> 
              :
              <img title="Stop-Speak" onClick={() => setMic(prev => !prev)} src={assets.speaker_on} alt="" />
            }
              {input ? (
                <img onClick={() => onSent()} src={assets.send_icon} alt="" />
              ) : null}
            </div>
          </div>
          <p className="bottom-info">
            This is gemini Clone you can use it from here
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
