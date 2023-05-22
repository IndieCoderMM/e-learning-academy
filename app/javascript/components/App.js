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

function App() {
  const currentUser = useSelector((state) => state.user.name);
  return (
    <main>
      <Stack direction="horizontal">
        <SideNavbar />
        <Container className="page-section p-0" fluid>
          <header className="d-flex justify-content-between bg-light">
            <h1 className="fs-3">ELearningAcademy</h1>
            {currentUser && (
              <p>
                Logged In as:
                {currentUser}
              </p>
            )}
          </header>
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
