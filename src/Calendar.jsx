import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!

export default function Calendar() {
  const [events, setEvents] = useState(() => {
    const storedEvents = localStorage.getItem('calendarEvents');
    return storedEvents ? JSON.parse(storedEvents) : [];
  });

  useEffect(() => {
    localStorage.setItem('calendarEvents', JSON.stringify(events));
  }, [events]);

  const addEvent = () => {
    const title = prompt('Enter event title:');
    const date = prompt('Enter event date (YYYY-MM-DD):');
    if (title && date) {
      const newEvent = { title, date };
      setEvents([...events, newEvent]);
    } else {
      alert('Invalid title or date!');
    }
  };

  const removeEvent = () => {
    if (events.length === 0) {
      alert('No events to remove!');
      return;
    }
    const eventTitles = events.map((event, index) => `${index + 1}: ${event.title}`).join('\n');
    const toRemove = prompt(`Enter the event number to remove:\n${eventTitles}`);
    const index = parseInt(toRemove, 10) - 1;
    if (index >= 0 && index < events.length) {
      setEvents(events.filter((_, i) => i !== index));
    } else {
      alert('Invalid event number!');
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <button onClick={addEvent} >Add Event</button>
        <button onClick={removeEvent}>Remove Event</button>
      </div>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
      />
      <div className="event-cards">
        {events.length > 0 ? (
          events.map((event, index) => (
            <div key={index} className="event-card">
              <div className="event-title">
                {event.title}
              </div>
              <div className="event-date">
                {new Date(event.date).toLocaleString()}
              </div>
            </div>
          ))
        ) : (
          <p>No upcoming events.</p>
        )}
      </div>
    </div>
  );
}
