import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaFacebookF, FaTwitter } from 'react-icons/fa';
import { TfiGithub, TfiLinkedin } from 'react-icons/tfi';

const SideNavbar = ({ show }) => {
  return (
    <section className="sidebar" style={show ? {} : { display: 'none' }}>
      <h2 className="sidebar__brand">ClassGo</h2>
      <div className="sidebar__nav">
        <NavLink className="sidebar__navlink" to="/">
          Home
        </NavLink>
        <NavLink className="sidebar__navlink" to="/reservation">
          Reservation
        </NavLink>
        <NavLink className="sidebar__navlink" to="/new_course">
          New Course
        </NavLink>
        <NavLink className="sidebar__navlink" to="/new_reservation">
          New Reservation
        </NavLink>
        <NavLink className="sidebar__navlink" to="/delete_course">
          Delete Course
        </NavLink>
        <NavLink className="sidebar__navlink" to="/login">
          Log In
        </NavLink>
      </div>
      <footer className="sidebar__footer">
        <div className="d-flex p-1 justify-content-around">
          <a
            className="sidebar__social"
            href="https://twitter.com/Tanveer98589023"
            target="__blank"
          >
            <FaTwitter />
          </a>
          <a
            className="sidebar__social"
            href="http://indiecodermm.github.io/hthant-portfolio/"
            target="__blank"
          >
            <FaFacebookF />
          </a>
          <a
            className="sidebar__social"
            href="https://linkedin.com/in/tobuya"
            target="__blank"
          >
            <TfiLinkedin />
          </a>
          <a
            className="sidebar__social"
            href="https://github.com/IndieCoderMM/e-learning-academy"
            target="__blank"
          >
            <TfiGithub />
          </a>
        </div>
        <p>&copy; 2023 elearningacademy.com </p>
      </footer>
    </section>
  );
};

export default SideNavbar;

