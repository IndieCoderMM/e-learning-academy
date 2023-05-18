import React from 'react';
import { Link } from 'react-router-dom';

function SideNavbar() {
  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/reservation">Reservation</Link>
      <Link to="/new_course">New Course</Link>
      <Link to="/delete_course">Delete Course</Link>
    </div>
  );
}

export default SideNavbar;
