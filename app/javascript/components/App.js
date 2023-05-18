import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Reservation from '../pages/Reservation';
import NewCourse from '../pages/NewCourse';
import DeleteCourse from '../pages/DeleteCourse';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new_course" element={<NewCourse />} />
        <Route path="/reservation" element={<Reservation />} />
        <Route path="/delete_course" element={<DeleteCourse />} />
      </Routes>
    </Router>
  );
}

export default App;
