import './App.css';
import React, { useState } from 'react';
import Calendar from './Calendar';
import Timer from './Timer';
import Alarm from './Alarm';
import StopWatch from './StopWatch';
import TodoList from './ToDo';

function App() {
  const [activeTab, setActiveTab] = useState(0); // Active tab index

  // Tab content components
  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return <Calendar />;
      case 1:
        return <TodoList />;
      case 2:
        return <Timer />;
      case 3:
        return <Alarm />;
      case 4:
        return <StopWatch />;
      default:
        return null;
    }
  };

  return (
    <div id="App">
      <h1>Flow</h1>
      <h2>Simplifying Your Day, All in One</h2>
      <div className="tabs">
        {/* Tab buttons */}
        <div className="tab-list">
          <button
            className={`tab-button ${activeTab === 0 ? 'active' : ''}`}
            onClick={() => setActiveTab(0)}
          >
            Calendar
          </button>
          <button
            className={`tab-button ${activeTab === 1 ? 'active' : ''}`}
            onClick={() => setActiveTab(1)}
          >
            To-Do List
          </button>
          <button
            className={`tab-button ${activeTab === 2 ? 'active' : ''}`}
            onClick={() => setActiveTab(2)}
          >
            Timers
          </button>
          <button
            className={`tab-button ${activeTab === 3 ? 'active' : ''}`}
            onClick={() => setActiveTab(3)}
          >
            Alarm
          </button>
          <button
            className={`tab-button ${activeTab === 4 ? 'active' : ''}`}
            onClick={() => setActiveTab(4)}
          >
            Stopwatch
          </button>
        </div>

        {/* Tab content */}
        <div className="tab-content">{renderTabContent()}</div>
      </div>
    </div>
  );
}

export default App;
