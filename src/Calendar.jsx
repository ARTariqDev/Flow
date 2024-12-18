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

  const removeEvent = (index) => {
    setEvents(events.filter((_, i) => i !== index));
  };

  return (
    <div>
      <button onClick={addEvent}>Add Event</button>
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
              <button onClick={() => removeEvent(index)}>Remove</button>
            </div>
          ))
        ) : (
          <p>No upcoming events.</p>
        )}
      </div>
    </div>
  );
}
