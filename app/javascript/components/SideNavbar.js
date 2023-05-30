import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { FaFacebookF, FaTwitter } from 'react-icons/fa';
import { TfiGithub, TfiLinkedin } from 'react-icons/tfi';
import { GrClose } from 'react-icons/gr';
import { useSelector } from 'react-redux';

const SideNavbar = ({ show, toggleNav }) => {
  const authenticated = useSelector((state) => state.user.id) != null;
  return (
    <section className="sidebar" style={show ? {} : { display: 'none' }}>
      <header className="sidebar__header">
        <h1 className="sidebar__brand brand-logo">ClassUp</h1>
        <button type="button" onClick={toggleNav} className="sidebar__close">
          <GrClose />
        </button>
      </header>
      <div className="sidebar__nav">
        <NavLink className="sidebar__navlink" to="/" onClick={toggleNav}>
          Home
        </NavLink>
        <NavLink
          className="sidebar__navlink"
          to="/reservation"
          onClick={toggleNav}
        >
          Reservations
        </NavLink>
        <NavLink
          className="sidebar__navlink"
          to="/new_course"
          onClick={toggleNav}
        >
          New Course
        </NavLink>
        <NavLink
          className="sidebar__navlink"
          to="/new_reservation"
          onClick={toggleNav}
        >
          New Reservation
        </NavLink>
        <NavLink
          className="sidebar__navlink"
          to="/delete_course"
          onClick={toggleNav}
        >
          Delete Course
        </NavLink>
        {authenticated ? (
          <NavLink
            className="sidebar__navlink"
            to="/profile"
            onClick={toggleNav}
          >
            Profile
          </NavLink>
        ) : (
          <NavLink className="sidebar__navlink" to="/login" onClick={toggleNav}>
            Log In
          </NavLink>
        )}
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
        <p>&copy; 2023 ClassUp - eLearningAcademy</p>
      </footer>
    </section>
  );
};

SideNavbar.propTypes = {
  show: PropTypes.bool.isRequired,
  toggleNav: PropTypes.func.isRequired,
};

export default SideNavbar;
