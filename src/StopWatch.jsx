import React, { useState, useRef, useEffect } from 'react';

const StopWatch = () => {
  const [time, setTime] = useState(0);
  const [laps, setLaps] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const requestRef = useRef(null);
  const startTimeRef = useRef(0);
  const previousTimeRef = useRef(0);

  const formatTime = (time) => {
    const getMilliseconds = `0${time % 1000}`.slice(-3);
    const seconds = Math.floor((time / 1000) % 60);
    const getSeconds = `0${seconds}`.slice(-2);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    const getMinutes = `0${minutes}`.slice(-2);

    return `${getMinutes}:${getSeconds}:${getMilliseconds}`;
  };

  const update = () => {
    setTime(Date.now() - startTimeRef.current);
    requestRef.current = requestAnimationFrame(update);
  };

  const startStopWatch = () => {
    if (!isRunning) {
      startTimeRef.current = Date.now() - time;
      requestRef.current = requestAnimationFrame(update);
      setIsRunning(true);
    }
  };

  const pauseStopWatch = () => {
    cancelAnimationFrame(requestRef.current);
    setIsRunning(false);
  };

  const resetStopWatch = () => {
    cancelAnimationFrame(requestRef.current);
    setTime(0);
    setLaps([]);
    setIsRunning(false);
  };

  const markLap = () => {
    setLaps([...laps, time]);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>StopWatch</h1>
      <div style={{ fontSize: '48px', marginBottom: '20px' }}>
        {formatTime(time)}
      </div>
      <div style={{ marginBottom: '20px' }}>
        {isRunning ? (
          <button onClick={pauseStopWatch} style={{ marginRight: '10px' }}>Pause</button>
        ) : (
          <button onClick={startStopWatch} style={{ marginRight: '10px' }}>Start</button>
        )}
        <button onClick={resetStopWatch} style={{ marginRight: '10px' }}>Reset</button>
        <button onClick={markLap} disabled={!isRunning}>Lap</button>
      </div>
      {laps.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h2>Laps</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px' }}>
            {laps.map((lap, index) => (
              <div key={index} style={{ border: '1px solid #ddd', padding: '10px', borderRadius: '5px'}}>
                <strong>Lap {index + 1}</strong>
                <div>{formatTime(lap)}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StopWatch;
