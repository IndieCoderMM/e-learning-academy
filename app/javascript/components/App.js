import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Reservation from '../pages/Reservation';
import NewCourse from '../pages/NewCourse';
import DeleteCourse from '../pages/DeleteCourse';
import SideNavbar from './SideNavbar';
import Login from '../pages/Login';
import Stack from 'react-bootstrap/Stack';
import { useSelector } from 'react-redux';

function App() {
  const authenticated = useSelector((state) => state.user.id) != null;
  return (
    <Stack direction="horizontal">
      <SideNavbar />
      <section className="page-section">
        <Routes>
          <Route path="/" element={authenticated ? <Home /> : <Login />} />
          <Route path="/new_course" element={<NewCourse />} />
          <Route path="/reservation" element={<Reservation />} />
          <Route path="/delete_course" element={<DeleteCourse />} />
        </Routes>
      </section>
    </Stack>
  );
}

export default App;
