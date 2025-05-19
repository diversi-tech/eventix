import React from 'react';
import EventDisplay from './components/EventDisplay';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Together - Event & Meal Coordination</h1>
        <p>Plan events and coordinate meals with friends and family</p>
      </header>
      <main>
        <EventDisplay />
      </main>
    </div>
  );
}

export default App;