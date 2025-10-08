import React from 'react';
import {
  FaPlayCircle,
  FaStepForward,
  FaStepBackward,
  FaPauseCircle,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useRef } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

const formatTime = (timeInSeconds) => {
  const minutes = Math.floor(timeInSeconds / 60)
    .toString()
    .padStart(2, '0');

  const seconds = Math.floor(timeInSeconds - minutes * 60)
    .toString()
    .padStart(2, '0');
  return `${minutes}:${seconds}`;
};

const timeInSeconds = (timeString) => {
  const splitArray = timeString.split(':');
  const minutes = Number(splitArray[0]);
  const seconds = Number(splitArray[1]);

  return seconds + minutes * 60;
};

const Player = ({
  duration,
  randomIdFromArtist,
  randomId2FromArtist,
  audio,
}) => {
  const audioPlayer = useRef();
  const progressBar = useRef();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(formatTime(0));
  const durationInSeconds = timeInSeconds(duration);

  const playPause = () => {
    isPlaying ? audioPlayer.current.pause() : audioPlayer.current.play();

    setIsPlaying(!isPlaying);
  };

  const changeSong = () => {
    audioPlayer.current.pause();
    setIsPlaying(false);
    audioPlayer.current.currentTime = 0;
    setCurrentTime(formatTime(0));
    progressBar.current.style.setProperty('--_progress', '0%');
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (isPlaying)
        setCurrentTime(formatTime(audioPlayer.current.currentTime));
      progressBar.current.style.setProperty(
        '--_progress',
        (audioPlayer.current.currentTime / durationInSeconds) * 100 + '%'
      );
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isPlaying]);

  return (
    <div className="player">
      <div className="player__controllers">
        <Link to={`/song/${randomIdFromArtist}`} onClick={() => changeSong()}>
          <FaStepBackward className="player__icon" />
        </Link>

        <div onClick={() => playPause()}>
          {isPlaying ? (
            <FaPauseCircle className="player__icon player__icon--play" />
          ) : (
            <FaPlayCircle className="player__icon player__icon--play" />
          )}
        </div>

        <Link to={`/song/${randomId2FromArtist}`} onClick={() => changeSong()}>
          <FaStepForward className="player__icon" />
        </Link>
      </div>
      <div className="player__progress">
        <p>{currentTime}</p>
        <div className="player__bar">
          <div ref={progressBar} className="player__bar-progress"></div>
        </div>
        <p>{duration}</p>
      </div>

      <audio ref={audioPlayer} src={audio}></audio>
    </div>
  );
};

export default Player;
