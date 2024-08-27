import React from 'react';
import { Navbar, Home, NFTMinter } from "./components";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/mint" element={<NFTMinter />} /> {/* Add this route for Contact */}
      </Routes>
    </Router>
  );
}

export default App;
