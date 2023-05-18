import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Reservation from '../pages/Reservation';
import NewCourse from '../pages/NewCourse';
import DeleteCourse from '../pages/DeleteCourse';
import SideNavbar from './SideNavbar';

function App() {
  return (
    <main>
      <SideNavbar />
      <section>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new_course" element={<NewCourse />} />
          <Route path="/reservation" element={<Reservation />} />
          <Route path="/delete_course" element={<DeleteCourse />} />
        </Routes>
      </section>
    </main>
  );
}

export default App;
