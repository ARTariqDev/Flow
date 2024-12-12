import React, { useState, useEffect } from 'react';
import Switch from 'react-switch';
import audio from './alarm.mp3';
import './App.css';

const Alarm = () => {
  const [alarms, setAlarms] = useState([]);
  const [time, setTime] = useState('');
  const [intervalId, setIntervalId] = useState(null);
  const [activeAlarmIndex, setActiveAlarmIndex] = useState(null);

  const handleAddAlarm = () => {
    setAlarms([...alarms, { time, isActive: true, isRinging: false }]);
    setTime('');
  };

  const handleDeleteAlarm = (index) => {
    if (index === activeAlarmIndex) {
      handleStopAlarm();
    }
    setAlarms(alarms.filter((_, i) => i !== index));
  };

  const handleToggleAlarm = (index) => {
    setAlarms(alarms.map((alarm, i) => i === index ? { ...alarm, isActive: !alarm.isActive } : alarm));
  };

  const handleStopAlarm = () => {
    const audio = document.getElementById('alarm-audio');
    audio.pause();
    audio.currentTime = 0;
    clearInterval(intervalId);
    setIntervalId(null);
    setActiveAlarmIndex(null);
    setAlarms(alarms.map(alarm => ({ ...alarm, isRinging: false, isActive: false }))); // Mark the alarm as inactive
  };

  useEffect(() => {
    const checkAlarms = setInterval(() => {
      const now = new Date();
      const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
      
      alarms.forEach((alarm, index) => {
        if (alarm.isActive && alarm.time === currentTime && !alarm.isRinging) {
          const audio = document.getElementById('alarm-audio');
          audio.play();
          audio.loop = true;
          setIntervalId(setInterval(() => {
            audio.play();
          }, 1000));
          setActiveAlarmIndex(index);
          setAlarms(alarms.map((alarm, i) => i === index ? { ...alarm, isRinging: true } : alarm));
        }
      });
    }, 1000);

    return () => clearInterval(checkAlarms);
  }, [alarms]);

  return (
    <div className="alarm-container">
      <h1>Alarm</h1>
      <div className="alarm-setter">
        <input 
          type="time" 
          value={time} 
          onChange={(e) => setTime(e.target.value)} 
        />
        <button onClick={handleAddAlarm} style={{ color: 'white' }}>Add Alarm</button>
      </div>
      <div className="alarm-list">
        {alarms.map((alarm, index) => (
          <div 
            key={index} 
            className={`alarm-card ${alarm.isRinging ? 'ringing' : ''}`}
          >
            <span>{alarm.time}</span>
            <Switch 
              onChange={() => handleToggleAlarm(index)} 
              checked={alarm.isActive} 
              onColor="blue" 
              offColor="#CCCCCC" 
              uncheckedIcon={false} 
              checkedIcon={false} 
            />
            <button onClick={handleStopAlarm}>Stop</button>
            <button onClick={() => handleDeleteAlarm(index)}>Delete</button>
          </div>
        ))}
      </div>
      <audio id="alarm-audio" src={audio}></audio>
    </div>
  );
};

export default Alarm;
