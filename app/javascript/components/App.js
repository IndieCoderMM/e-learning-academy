import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Stack from 'react-bootstrap/Stack';
import Container from 'react-bootstrap/Container';
import Home from '../pages/Home';
import Reservation from '../pages/Reservation';
import NewCourse from '../pages/NewCourse';
import DeleteCourse from '../pages/DeleteCourse';
import NewReservation from '../pages/NewReservation';
import SideNavbar from './SideNavbar';
import Login from '../pages/Login';
import Detail from '../pages/Details';
import Header from './Header';
import Profile from '../pages/Profile';

const App = () => {
  const [openNav, setOpenNav] = useState(true);

  const toggleNav = () => {
    setOpenNav((state) => !state);
  };

  return (
    <main>
      <Stack direction="horizontal">
        <SideNavbar show={openNav} toggleNav={toggleNav} />
        <Container className="p-0 main-content" fluid>
          <Header openNav={openNav} toggleNav={toggleNav} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/new_course" element={<NewCourse />} />
            <Route path="/courses/:id" element={<Detail />} />
            <Route path="/reservation" element={<Reservation />} />
            <Route path="/new_reservation/:id?" element={<NewReservation />} />
            <Route path="/delete_course" element={<DeleteCourse />} />
          </Routes>
        </Container>
      </Stack>
    </main>
  );
};

export default App;
