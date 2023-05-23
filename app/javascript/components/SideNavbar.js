import React from 'react';
import { Link } from 'react-router-dom';

function SideNavbar() {
  return (
    <section className="sidebar">
      <header>
        <h2 className="fs-3">Offcanvas</h2>
        <button type="button">&times;</button>
      </header>
      <div className="d-flex gap-1 flex-column">
        <Link to="/">Home</Link>
        <Link to="/reservation">Reservation</Link>
        <Link to="/new_course">New Course</Link>
        <Link to="/delete_course">Delete Course</Link>
        <Link to="/login">Log In</Link>
      </div>
    </section>
  );
}

export default SideNavbar;

