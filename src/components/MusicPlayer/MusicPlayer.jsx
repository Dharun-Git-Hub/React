import React, { useState, useRef, useEffect } from "react";
import "./MusicPlayer.css";

const songs = [
  {
    path: "res/1.mp3",
    displayName: "The Charmer's Call",
    cover: "res/1.jpg",
    artist: "Hanu Dixit",
  },
  {
    path: "res/2.mp3",
    displayName: "You Will Never See Me Coming",
    cover: "res/2.jpg",
    artist: "NEFFEX",
  },
  {
    path: "res/3.mp3",
    displayName: "Intellect",
    cover: "res/3.jpg",
    artist: "Yung Logos",
  },
];

const MusicPlayer = () => {
  const [musicIndex, setMusicIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const music = useRef(new Audio());
  const progressRef = useRef(null);

  const { path, displayName, cover, artist } = songs[musicIndex];

  useEffect(() => {
    music.current.src = path;
    if (isPlaying) {
      music.current.play();
    }
  }, [musicIndex, isPlaying, path]);

  const togglePlay = () => {
    if (isPlaying) {
      music.current.pause();
    } else {
      music.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const changeMusic = (direction) => {
    setMusicIndex((prev) => (prev + direction + songs.length) % songs.length);
  };

  const updateProgressBar = () => {
    if (progressRef.current) {
      const { duration, currentTime } = music.current;
      const progressPercent = (currentTime / duration) * 100;
      progressRef.current.style.width = `${progressPercent}%`;
    }
  };

  const setProgressBar = (e) => {
    const width = e.target.clientWidth;
    const clickX = e.nativeEvent.offsetX;
    music.current.currentTime = (clickX / width) * music.current.duration;
  };

  useEffect(() => {
    const handleTimeUpdate = () => updateProgressBar();
    const handleEnded = () => changeMusic(1);

    music.current.addEventListener("timeupdate", handleTimeUpdate);
    music.current.addEventListener("ended", handleEnded);

    return () => {
      music.current.removeEventListener("timeupdate", handleTimeUpdate);
      music.current.removeEventListener("ended", handleEnded);
    };
  }, []);

  return (
    <div className="body-cont"
    style ={{ backgroundImage: `url(${cover})`,
    position : "relative",
    overflow: "hidden",
    zIndex: 0,
  }}
    >
    <div className="container1" style={{
      zIndex: 1,
    }}>
      <div className="player-img">
        <img src={cover} className="active" alt="cover" />
      </div>

      <h2>{displayName}</h2>
      <h3>{artist}</h3>

      <div className="player-progress" onClick={setProgressBar}>
        <div className="progress" ref={progressRef}></div>
        <div className="music-duration">
          <span>{formatTime(music.current.currentTime)}</span>
          <span>{formatTime(music.current.duration)}</span>
        </div>
      </div>

      <div className="player-controls">
        <i className="fa-solid fa-backward" title="Previous" onClick={() => changeMusic(-1)}></i>
        <i
          className={`fa-solid ${isPlaying ? "fa-pause" : "fa-play"} play-button`}
          title={isPlaying ? "Pause" : "Play"}
          onClick={togglePlay}
        ></i>
        <i className="fa-solid fa-forward" title="Next" onClick={() => changeMusic(1)}></i>
      </div>
    </div>
    </div>
  );
};

const formatTime = (time) => {
  if (isNaN(time)) return "0:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
};

export default MusicPlayer;