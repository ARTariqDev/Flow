// Home.jsx
import './App.css';
import React, { useState, useEffect } from 'react';

const Home = () => {
  const [events, setEvents] = useState([]);
  const [timers, setTimers] = useState([]);
  const [alarms, setAlarms] = useState([]);
  
  const STORAGE_KEY_EVENTS = 'calendarEvents';
  const STORAGE_KEY_TIMERS = 'activeTimers';
  const STORAGE_KEY_ALARMS = 'activeAlarms';

  useEffect(() => {
    // Load events
    const storedEvents = JSON.parse(localStorage.getItem(STORAGE_KEY_EVENTS)) || [];
    setEvents(storedEvents);

    // Load timers
    const storedTimers = JSON.parse(localStorage.getItem(STORAGE_KEY_TIMERS)) || [];
    setTimers(storedTimers);

    // Load alarms
    const storedAlarms = JSON.parse(localStorage.getItem(STORAGE_KEY_ALARMS)) || [];
    setAlarms(storedAlarms);
  }, []);

  useEffect(() => {
    // Set up an interval to update timers
    const intervalId = setInterval(() => {
      const updatedTimers = timers.map(timer => {
        if (timer.timeLeft > 0) {
          return { ...timer, timeLeft: timer.timeLeft - 1 };
        }
        return timer;
      }).filter(timer => timer.timeLeft > 0);

      setTimers(updatedTimers);

      // Save updated timers to localStorage
      localStorage.setItem(STORAGE_KEY_TIMERS, JSON.stringify(updatedTimers));
    }, 1000); // Update every second

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [timers]);

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Home</h1>

      <section style={{ marginBottom: '20px' }}>
        <h2>Upcoming Events</h2>
        {events.length > 0 ? (
          events.map((event, index) => (
            <div key={index} style={{ marginBottom: '10px' }}>
              <p>{event.title} - {event.date}</p>
            </div>
          ))
        ) : (
          <p>No upcoming events.</p>
        )}
      </section>

      <section style={{ marginBottom: '20px' }}>
        <h2>Active Timers</h2>
        {timers.length > 0 ? (
          timers.map((timer, index) => (
            <div key={index} style={{ marginBottom: '10px' }}>
              <p>{timer.name} - {timer.timeLeft} seconds left</p>
            </div>
          ))
        ) : (
          <p>No active timers.</p>
        )}
      </section>

      <section>
        <h2>Active Alarms</h2>
        {alarms.length > 0 ? (
          alarms.map((alarm, index) => (
            <div key={index} style={{ marginBottom: '10px' }}>
              <p>{alarm.time} - {alarm.message}</p>
            </div>
          ))
        ) : (
          <p>No active alarms.</p>
        )}
      </section>
    </div>
  );
};

export default Home;
