/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Button, Form, Alert,
} from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { coursesActions } from '../store/coursesSlice';

const NewCourse = ({ createCourse }) => {
  const [title, setTitle] = useState('');
  const [instructor, setInstructor] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [duration, setDuration] = useState('');
  const [img_url, setImgUrl] = useState('');
  const [message, setMessage] = useState('');
  const currentUser = useSelector((state) => state.user);
  const errorMessage = useSelector((state) => state.courses.error);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newCourse = {
      title,
      instructor,
      description,
      price,
      duration,
      img_url,
    };

    createCourse(newCourse);

    setMessage('Course created successfully!');

    dispatch(coursesActions.crea
  };

  useEffect(() => {
    if (errorMessage) setMessage(errorMessage);
  }, [errorMessage]);

  return (
    <section className="page form-page">
      <div className="styled-form-container">
        <h2 className="page__title">Make New Course</h2>
        {currentUser.id == null && (
          <Alert variant="primary" className="py-1">
            Please log in to create a new course.
          </Alert>
        )}

        {/* {alert !== '' && (
          <Alert variant="danger" className="py-1">
            {alert}
          </Alert>
        )} */}

        <Form
          onSubmit={handleSubmit}
        >
          {message && (
          <Alert variant={errorMessage ? 'danger' : 'success'}>
            {message}
          </Alert>
          )}
          <Form.Label>
            Title:
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="styled-form__input"
              placeholder="Title"
              required
            />
          </Form.Label>
          <br />

          <Form.Label>
            Course Image URL
            <Form.Control
              type="text"
              value={img_url}
              onChange={(e) => setImgUrl(e.target.value)}
              className="styled-form__input"
              placeholder="Course Image URL"
              required
            />
          </Form.Label>
          <br />

          <Form.Label>
            Course Instructor
            <Form.Control
              type="text"
              value={instructor}
              onChange={(e) => setInstructor(e.target.value)}
              className="styled-form__input"
              placeholder="Course Instructor"
              required
            />
          </Form.Label>
          <br />

          <Form.Label>
            Description
            <Form.Control
              type="textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="styled-form__input"
              placeholder="Description"
              required
            />
          </Form.Label>
          <br />

          <Form.Label>
            Price
            <Form.Control
              type="number"
              value={price}
              min={0}
              onChange={(e) => setPrice(e.target.value)}
              className="styled-form__input"
              placeholder="Price"
              required
            />
          </Form.Label>
          <br />

          <Form.Label>
            Duration
            <Form.Control
              type="number"
              min={1}
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="styled-form__input"
              placeholder="Duration"
              required
            />
          </Form.Label>
          <br />

          <div className="d-flex gap-2 justify-content-center w-100 mt-3">
            <Button onClick={() => navigate(-1)} className="styled-form__action">
              Cancel
            </Button>
            <Button type="submit" className="styled-form__action">
              Confirm
            </Button>
          </div>
        </Form>
      </div>
    </section>
  );
};
/* eslint-enable camelcase */

NewCourse.propTypes = {
  createCourse: PropTypes.func.isRequired,
};

export default connect(null, { createCourse: coursesActions.createCourse })(
  NewCourse,
);
