import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!

export default function Calendar() {
  const [events, setEvents] = useState([]);
  const STORAGE_KEY = 'calendarEvents'; // Key to store events

  useEffect(() => {
    // Load events from localStorage and parse them as an array if they exist
    const storedEvents = localStorage.getItem(STORAGE_KEY);
    if (storedEvents) {
      try {
        const parsedEvents = JSON.parse(storedEvents);
        if (Array.isArray(parsedEvents)) {
          setEvents(parsedEvents);
        } else {
          console.error('Events data is not an array:', parsedEvents);
        }
      } catch (error) {
        console.error('Failed to parse events data:', error);
      }
    }
  }, []);

  useEffect(() => {
    // Save events to localStorage whenever they change
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  }, [events]);

  // Function to add a new event
  const addEvent = () => {
    const title = prompt('Enter event title:');
    const date = prompt('Enter event date (YYYY-MM-DD):');
    if (title && date) {
      const newEvent = { title, date }; // FullCalendar understands 'title' and 'date' keys
      const updatedEvents = [...events, newEvent];
      setEvents(updatedEvents); // Update state and trigger useEffect
    } else {
      alert('Invalid title or date!');
    }
  };

  return (
    <div>
      <button
        onClick={addEvent}
        style={{
          margin: '10px',
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: '#ffffff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Add Event
      </button>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events} // Pass events directly here
      />
    </div>
  );
}
