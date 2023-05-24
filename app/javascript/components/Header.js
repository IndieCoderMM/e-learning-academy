import React, { useState } from 'react';
import {
  Button,
  ButtonGroup,
  Dropdown,
  Nav,
  NavDropdown,
} from 'react-bootstrap';
import { FaUserCircle } from 'react-icons/fa';
import { BiLogInCircle } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logOutUser } from '../store/user';

const Header = ({ openNav, toggleNav }) => {
  const currentUser = useSelector((state) => state.user.name);
  const dispatch = useDispatch();

  const logOut = () => {
    dispatch(logOutUser());
  };

  return (
    <header className="d-flex justify-content-between p-1 main-header">
      <div className="d-flex align-items-center gap-1">
        <button
          type="button"
          onClick={toggleNav}
          className="d-flex flex-column justify-content-center gap-2 hamburger-btn"
        >
          <span className="hamburger-btn__bar"></span>
          <span className="hamburger-btn__bar"></span>
        </button>
        {!openNav && <h1 className="brand-logo">ELearningAcademy</h1>}
      </div>
      {currentUser ? (
        <div className="d-flex align-items-center gap-1">
          <Dropdown as={ButtonGroup}>
            <Button variant="light">{currentUser}</Button>

            <Dropdown.Toggle split variant="light" id="dropdown-split-basic" />

            <Dropdown.Menu>
              <Dropdown.Item onClick={logOut}>Log Out</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <FaUserCircle className="fs-2" />
        </div>
      ) : (
        <Button
          as={Link}
          to="/login"
          variant="outline-light"
          className="d-flex align-items-center fs-2"
        >
          <BiLogInCircle />
        </Button>
      )}
    </header>
  );
};

export default Header;
