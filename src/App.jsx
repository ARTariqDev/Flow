import './App.css';
import React, { useState } from 'react';
import Calendar from './Calendar';
import Timer from './Timer';
import Alarm from './Alarm';
import StopWatch from './StopWatch';
import TodoList from './ToDo';
import { ChakraProvider, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';

function App() {
  const [tabIndex, setTabIndex] = useState(0); // Tab index state


  // Handle tab change
  const handleTabChange = (index) => {
    setTabIndex(index);
  };

  // Main app view
  return (
    <ChakraProvider>
      <div id="App">
        <h1>Flow</h1>
        <h2>Simplifying Your Day, All in One</h2>
        <button onClick={() => setLoggedIn(false)} className="logout-button">Log Out</button>
        <Tabs index={tabIndex} onChange={handleTabChange} variant="soft-rounded" colorScheme="blue">
          <TabList>
            <Tab>Calendar</Tab>
            <Tab>To-Do List</Tab>
            <Tab>Timers</Tab>
            <Tab>Alarm</Tab>
            <Tab>Stopwatch</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Calendar />
            </TabPanel>
            <TabPanel>
              <TodoList />
            </TabPanel>
            <TabPanel>
              <Timer />
            </TabPanel>
            <TabPanel>
              <Alarm />
            </TabPanel>
            <TabPanel>
              <StopWatch />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </ChakraProvider>
  );
}

export default App;
