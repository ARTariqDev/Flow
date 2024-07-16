import './App.css';
import React, { useState } from 'react';
import Calendar from './Calendar.js';
import Timer from './Timer.js';
import Home from './Home.js';
import Alarm from './Alarm.js';
import { ChakraProvider, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';

function App() {
  const [tabIndex, setTabIndex] = useState(0); // Initialize tabIndex state with 0

  // Function to handle tab change
  const handleTabChange = (index) => {
    setTabIndex(index); // Update tabIndex state to switch tabs
  };

  return (
    <ChakraProvider>
      <div id="App">
        <h1>Flow</h1>
        <h2>Simplifying Your Day, All in One</h2>
        <Tabs index={tabIndex} onChange={handleTabChange} variant='soft-rounded' colorScheme='blue'>
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
             
            </TabPanel>
            <TabPanel>
              <Timer />
            </TabPanel>
            <TabPanel>
              <Alarm />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </ChakraProvider>
  );
}

export default App;
