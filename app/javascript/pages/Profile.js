import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaUserCircle } from 'react-icons/fa';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { logOutUser } from '../store/user';

const Profile = () => {
  const currentUser = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOut = () => {
    dispatch(logOutUser());
    navigate('/login');
  };

  if (currentUser.id == null) {
    return null;
  }
  return (
    <section
      className="page"
      style={{ backgroundColor: 'var(--primary-green)', color: '#fff' }}
    >
      <h2 className="page__title">User Profile</h2>
      <FaUserCircle style={{ fontSize: '5rem' }} />
      <p className="my-2 fs-3 fw-bold">{currentUser.name}</p>
      <p className="my-2 fs-5">
        User ID: #
        {currentUser.id}
      </p>
      <hr />
      <Button variant="outline-light" className="btn-lg" onClick={logOut}>
        Log Out
      </Button>
    </section>
  );
};

export default Profile;
