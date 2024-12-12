import React, { useState, useEffect, useRef } from 'react';
import audio from './alarm.mp3';
import './App.css';

const Timer = () => {
  const [timers, setTimers] = useState([]);
  const [inputHours, setInputHours] = useState('');
  const [inputMinutes, setInputMinutes] = useState('');
  const [inputSeconds, setInputSeconds] = useState('');
  const alarmRef = useRef(null);

  // Function to handle the form submission for adding a new timer
  const handleFormSubmit = (event) => {
    event.preventDefault();
    const hours = Number(inputHours) || 0;
    const minutes = Number(inputMinutes) || 0;
    const seconds = Number(inputSeconds) || 0;
    const totalSeconds = (hours * 3600) + (minutes * 60) + seconds;
    const newTimer = {
      id: Date.now(), // Unique ID for each timer
      time: `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`,
      seconds: totalSeconds,
      initialSeconds: totalSeconds, // Store initial time to restart timer
      isRunning: false,
      isRinging: false,
    };
    setTimers([...timers, newTimer]);
    setInputHours('');
    setInputMinutes('');
    setInputSeconds('');
  };

  // Function to start a specific timer
  const startTimer = (id) => {
    setTimers(timers.map(timer => {
      if (timer.id === id && timer.seconds > 0 && !timer.isRunning) {
        return {
          ...timer,
          isRunning: true,
          isRinging: false, // Reset ringing status when starting
        };
      }
      return timer;
    }));
  };

  // Function to stop a specific timer
  const stopTimer = (id) => {
    setTimers(timers.map(timer => {
      if (timer.id === id) {
        return {
          ...timer,
          isRunning: false,
          isRinging: false, // Stop ringing when stopped
        };
      }
      return timer;
    }));

    if (alarmRef.current) {
      alarmRef.current.pause();
      alarmRef.current.currentTime = 0;
    }
  };

  // Function to restart a specific timer
  const restartTimer = (id) => {
    setTimers(timers.map(timer => {
      if (timer.id === id) {
        const hours = Math.floor(timer.initialSeconds / 3600);
        const minutes = Math.floor((timer.initialSeconds % 3600) / 60);
        const seconds = timer.initialSeconds % 60;
        return {
          ...timer,
          time: `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`,
          seconds: timer.initialSeconds,
          isRunning: false,
          isRinging: false,
        };
      }
      return timer;
    }));

    if (alarmRef.current) {
      alarmRef.current.pause();
      alarmRef.current.currentTime = 0;
    }
  };

  // Function to remove a specific timer
  const removeTimer = (id) => {
    setTimers(timers => {
      const updatedTimers = timers.filter(timer => timer.id !== id);
      const anyTimerRinging = updatedTimers.some(timer => timer.isRinging);
      if (!anyTimerRinging && alarmRef.current) {
        alarmRef.current.pause();
        alarmRef.current.currentTime = 0;
      }
      return updatedTimers;
    });
  };

  // Effect to handle countdown for each timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTimers(prevTimers => {
        const updatedTimers = prevTimers.map(timer => {
          if (timer.seconds === 0 && timer.isRunning) {
            return { ...timer, isRunning: false, isRinging: true };
          } else if (timer.isRunning) {
            const updatedSeconds = timer.seconds - 1;
            const hours = Math.floor(updatedSeconds / 3600);
            const minutes = Math.floor((updatedSeconds % 3600) / 60);
            const secs = updatedSeconds % 60;
            return { ...timer, time: `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`, seconds: updatedSeconds };
          }
          return timer;
        });

        const anyTimerRinging = updatedTimers.some(timer => timer.isRinging);
        if (anyTimerRinging && alarmRef.current) {
          alarmRef.current.play();
          alarmRef.current.loop = true;
        } else if (!anyTimerRinging && alarmRef.current) {
          alarmRef.current.pause();
          alarmRef.current.currentTime = 0;
        }

        return updatedTimers;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="timer">
      <h1>Timer</h1>
      <div className="timer-setter">
        <h2>Set Timer</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="input-group">
            <input
              type="number"
              placeholder="HH"
              value={inputHours}
              onChange={(e) => setInputHours(e.target.value)}
            />
            <p>:</p>
            <input
              type="number"
              placeholder="MM"
              value={inputMinutes}
              onChange={(e) => setInputMinutes(e.target.value)}
            />
            <p>:</p>
            <input
              type="number"
              placeholder="SS"
              value={inputSeconds}
              onChange={(e) => setInputSeconds(e.target.value)}
            />
            <button type="submit">Add Timer</button>
          </div>
        </form>
      </div>

      <div className="timer-cards">
        {timers.map(timer => (
          <div key={timer.id} className="timer-card">
            <div className="time-display">
              {timer.time}
            </div>
            {timer.isRinging && <p>Timer up!</p>}
            <div className="timer-buttons">
              <button onClick={() => startTimer(timer.id)}>Start</button>
              <button onClick={() => stopTimer(timer.id)}>Stop</button>
              <button onClick={() => restartTimer(timer.id)}>Reset</button>
              <button onClick={() => removeTimer(timer.id)}>Remove</button>
            </div>
          </div>
        ))}
      </div>

      <audio ref={alarmRef} src={audio}>
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default Timer;
