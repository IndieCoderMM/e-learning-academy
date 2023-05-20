import React from 'react';

const ReservedCourse = ({ course, date, city }) => {
  return (
    <div>
      <h3>{course.title}</h3>
      <p>{course.instructor}</p>
      <p>{course.description}</p>
      <p>City: {city}</p>
      <p>Date: {date}</p>
    </div>
  );
};

export default ReservedCourse;
