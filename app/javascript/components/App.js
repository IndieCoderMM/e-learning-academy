import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Stack from 'react-bootstrap/Stack';
import { useSelector } from 'react-redux';
import Home from '../pages/Home';
import Reservation from '../pages/Reservation';
import NewCourse from '../pages/NewCourse';
import DeleteCourse from '../pages/DeleteCourse';
import SideNavbar from './SideNavbar';
import Login from '../pages/Login';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const currentUser = useSelector((state) => state.user.name);
  return (
    <main>
      <header className="d-flex justify-content-between w-100 bg-light">
        <h1 className="fs-3">ELearningAcademy</h1>
        {currentUser && (
          <p>
            Logged In as:
            {currentUser}
          </p>
        )}
      </header>
      <Stack direction="horizontal">
        <SideNavbar />
        <section className="page-section">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/new_course" element={<NewCourse />} />
            <Route path="/reservation" element={<Reservation />} />
            <Route path="/delete_course" element={<DeleteCourse />} />
          </Routes>
        </section>
      </Stack>
    </main>
  );
}

export default App;
