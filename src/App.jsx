import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ResumeProvider } from './contexts/ResumeContext';
import Home from './pages/Home';
import Upload from './pages/Upload';
import Resume from './pages/Resume';
// import './App.css';

function App() {
  return (
    <ResumeProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/resume" element={<Resume />} />
          </Routes>
        </div>
      </Router>
    </ResumeProvider>
  );
}

export default App;