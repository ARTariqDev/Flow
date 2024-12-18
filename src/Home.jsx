import React, { useState, useEffect } from 'react';
import './App.css';
import TodoList from './TodoList'; // Import the TodoList component

const Home = () => {
  const [timers, setTimers] = useState(() => {
    const savedTimers = localStorage.getItem('timers');
    return savedTimers ? JSON.parse(savedTimers) : [];
  });

  const [events, setEvents] = useState(() => {
    const savedEvents = localStorage.getItem('events');
    return savedEvents ? JSON.parse(savedEvents) : [];
  });

  const [alarms, setAlarms] = useState(() => {
    const savedAlarms = localStorage.getItem('alarms');
    return savedAlarms ? JSON.parse(savedAlarms) : [];
  });

  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  useEffect(() => {
    localStorage.setItem('timers', JSON.stringify(timers));
  }, [timers]);

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem('alarms', JSON.stringify(alarms));
  }, [alarms]);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addEvent = (title, date) => {
    const newEvent = { id: Date.now(), title, date };
    setEvents([...events, newEvent]);
  };

  const removeEvent = (id) => {
    setEvents(events.filter(event => event.id !== id));
  };

  const addAlarm = (time) => {
    const newAlarm = { id: Date.now(), time, isRinging: false };
    setAlarms([...alarms, newAlarm]);
  };

  const removeAlarm = (id) => {
    // Stop the alarm if it is ringing
    setAlarms(alarms.map(alarm => {
      if (alarm.id === id && alarm.isRinging) {
        return { ...alarm, isRinging: false };
      }
      return alarm;
    }));
    // Remove the alarm
    setAlarms(alarms.filter(alarm => alarm.id !== id));
  };

  return (
    <div className="home">
      <h1>Timers, Events, Alarms, and To-Do List</h1>
      
      <div className="section">
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

      <div className="section">
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

      <div className="section">
        <h2>Alarms</h2>
        {alarms.length > 0 ? (
          alarms.map(alarm => (
            <div key={alarm.id} className="alarm-card">
              <div className="alarm-time">
                {alarm.time}
              </div>
              {alarm.isRinging && <p>Alarm ringing!</p>}
              <button onClick={() => removeAlarm(alarm.id)}>Remove</button>
            </div>
          ))
        ) : (
          <p>No alarms set.</p>
        )}
      </div>

      <div className="section">
        <h2>To-Do List</h2>
        <TodoList />
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
