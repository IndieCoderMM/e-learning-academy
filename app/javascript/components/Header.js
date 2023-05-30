import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import { FaUserAlt } from 'react-icons/fa';
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

  logOut();

  return (
    <header className="d-flex justify-content-between p-1 main-header">
      <div className="d-flex align-items-center gap-1">
        <button
          type="button"
          onClick={toggleNav}
          className="d-flex flex-column justify-content-center gap-2 hamburger-btn"
        >
          <span className="hamburger-btn__bar" />
          <span className="hamburger-btn__bar" />
        </button>
        <h1
          className="brand-logo"
          style={openNav ? { visibility: 'hidden' } : {}}
        >
          ClassUp
        </h1>
      </div>
      {currentUser ? (
        <Button
          as={Link}
          to="/profile"
          variant="outline-light"
          className="d-flex align-items-center fs-2"
        >
          <FaUserAlt />
        </Button>
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

Header.propTypes = {
  openNav: PropTypes.bool.isRequired,
  toggleNav: PropTypes.func.isRequired,
};

export default Header;
