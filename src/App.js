import './App.css';
import React, { useState } from 'react';
import Calendar from './Calendar.js';
import Home from './Home.js';
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
        <h2>The better way to manage yourself</h2>
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
              <div id="container">
                <Home />
              </div>
            </TabPanel>
            {/* Add TabPanel for other tabs if needed */}
          </TabPanels>
        </Tabs>
      </div>
    </ChakraProvider>
  );
}

export default App;
