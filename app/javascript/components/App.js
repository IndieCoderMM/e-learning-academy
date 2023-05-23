import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Stack from 'react-bootstrap/Stack';
import { useSelector } from 'react-redux';
import { Container } from 'react-bootstrap';
import Home from '../pages/Home';
import Reservation from '../pages/Reservation';
import NewCourse from '../pages/NewCourse';
import DeleteCourse from '../pages/DeleteCourse';
import SideNavbar from './SideNavbar';
import Login from '../pages/Login';
import Header from './Header';

function App() {
  return (
    <main>
      <Stack direction="horizontal">
        <SideNavbar />
        <Container className="page-section p-0" fluid>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/new_course" element={<NewCourse />} />
            <Route path="/reservation" element={<Reservation />} />
            <Route path="/delete_course" element={<DeleteCourse />} />
          </Routes>
        </Container>
      </Stack>
    </main>
  );
}

export default App;
