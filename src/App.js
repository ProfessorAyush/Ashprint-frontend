import React from 'react';
import Navbar from './components/Navbar';
import Homepage from './components/Homepage';
import About from './components/About';
import Timeline from './components/Timeline';

const App = () => {
  return (
    <div>
      <Navbar />
      <Homepage />
      <About />
      <Timeline /> 
    </div>
  );
};

export default App;
