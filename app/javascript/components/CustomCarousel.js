import React, { useEffect } from 'react';
import { useSnapCarousel } from 'react-snap-carousel';
import { BiLeftArrow, BiRightArrow } from 'react-icons/bi';
import { Container } from 'react-bootstrap';

const CustomCarousel = ({ items }) => {
  const {
    scrollRef,
    snapPointIndexes,
    activePageIndex,
    pages,
    prev,
    next,
    goTo,
  } = useSnapCarousel();

  return (
    <Container className="p-0" fluid>
      <div className="d-flex justify-content-center gap-1">
        {pages.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`pagination-btn ${
              activePageIndex === i ? 'active' : ''
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
      <div className="carousel-container">
        <div
          className={`carousel__control prev ${
            activePageIndex === 0 ? 'disabled' : ''
          }`}
        >
          <button onClick={() => prev()} className="carousel__arrow">
            <BiLeftArrow />
          </button>
        </div>

        <ul ref={scrollRef} className="carousel">
          {items.map((element, i) => (
            <li
              key={i}
              className="carousel__item"
              style={{
                scrollSnapAlign: snapPointIndexes.has(i) ? 'start' : '',
              }}
            >
              {element}
            </li>
          ))}
        </ul>

        <div
          className={`carousel__control next ${
            activePageIndex === pages.length - 1 ? 'disabled' : ''
          }`}
        >
          <button onClick={() => next()} className="carousel__arrow">
            <BiRightArrow />
          </button>
        </div>
      </div>
    </Container>
  );
};

export default CustomCarousel;
