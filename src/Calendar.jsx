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

  return (
    <div>
      <button onClick={addEvent}>Add Event</button>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
      />
    </div>
  );
}
