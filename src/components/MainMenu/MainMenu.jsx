import React, { useState } from 'react';
import './MainMenu.css';
import { useNavigate } from 'react-router-dom';
import { assets } from '../../assets/assets';

const MainMenu = () => {
  const [selectedOption, setSelectedOption] = useState('Select one');
  const [isListVisible, setIsListVisible] = useState(false);
  const navigate = useNavigate();

  const tasks = {
    AI: () => navigate("/main"),
    Youtube: () => navigate("/text-editor"),
    Instagram: () => navigate("/coder"),
    Twitter: () => alert('/translator'),
    Whatsapp: () => navigate("/musicplayer"),
    ImageGen: () => navigate("/imagegen"),
  };

  const options = [
    { src: assets.gemini_icon, label: 'AI Assistant', task: tasks.AI },
    { src: '/images/youtube.png', label: 'Text Editor', task: tasks.Youtube },
    { src: '/images/instagram.png', label: 'Live Code-Editor', task: tasks.Instagram },
    { src: '/images/twitter.png', label: 'Translator', task: tasks.Twitter },
    { src: '/images/whatsapp.png', label: 'Music Player', task: tasks.Whatsapp },
    { src: '/images/whatsapp.png', label: 'AI Image Generator', task: tasks.ImageGen },
  ];

  const handleOptionClick = (label, task) => {
    setSelectedOption(label);
    setIsListVisible(false);
    task();
  };

  const toggleListVisibility = () => {
    setIsListVisible(!isListVisible);
  };

  return (
    <div className="hero">
      <div className="selector">
        <div id="selectField" onClick={toggleListVisibility}>
          <p id="selectText">{selectedOption}</p>
          <img
            src="/images/arrow.png"
            id="arrowIcon"
            alt="arrow"
            className={isListVisible ? 'rotate' : ''}
          />
        </div>
        <ul id="list" className={isListVisible ? '' : 'hide'}>
          {options.map((option, index) => (
            <li
              key={index}
              className="options"
              onClick={() => handleOptionClick(option.label, option.task)}>
              <img src={option.src} alt={option.label} />
              <p>{option.label}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MainMenu;