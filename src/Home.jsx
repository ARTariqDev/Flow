import React, { useState, useEffect } from 'react';
import './App.css';

const Home = () => {
  const [timers, setTimers] = useState(() => {
    const savedTimers = localStorage.getItem('timers');
    return savedTimers ? JSON.parse(savedTimers) : [];
  });

  const [events, setEvents] = useState(() => {
    const savedEvents = localStorage.getItem('events');
    return savedEvents ? JSON.parse(savedEvents) : [];
  });

  useEffect(() => {
    localStorage.setItem('timers', JSON.stringify(timers));
  }, [timers]);

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  const addEvent = (title, date) => {
    const newEvent = { id: Date.now(), title, date };
    setEvents([...events, newEvent]);
  };

  const removeEvent = (id) => {
    setEvents(events.filter(event => event.id !== id));
  };

  return (
    <div className="home">
      <h1>Timers and Events</h1>
      <div className="timer-cards">
        <h2>Timers</h2>
        {timers.length > 0 ? (
          timers.map(timer => (
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
          ))
        ) : (
          <p>No timers set.</p>
        )}
      </div>
      <div className="event-cards">
        <h2>Upcoming Events</h2>
        {events.length > 0 ? (
          events.map(event => (
            <div key={event.id} className="event-card">
              <div className="event-title">
                {event.title}
              </div>
              <div className="event-date">
                {new Date(event.date).toLocaleString()}
              </div>
              <button onClick={() => removeEvent(event.id)}>Remove</button>
            </div>
          ))
        ) : (
          <p>No upcoming events.</p>
        )}
      </div>
    </div>
  );

  // Timer control functions
  const startTimer = (id) => {
    setTimers(timers.map(timer => {
      if (timer.id === id && timer.seconds > 0 && !timer.isRunning) {
        return { ...timer, isRunning: true, isRinging: false };
      }
      return timer;
    }));
  };

  const stopTimer = (id) => {
    setTimers(timers.map(timer => {
      if (timer.id === id) {
        return { ...timer, isRunning: false, isRinging: false };
      }
      return timer;
    }));
  };

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
  };

  const removeTimer = (id) => {
    setTimers(timers.filter(timer => timer.id !== id));
  };
};

export default Home;
