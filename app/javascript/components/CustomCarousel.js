import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSnapCarousel } from 'react-snap-carousel';
import { BiLeftArrow, BiRightArrow } from 'react-icons/bi';
import { Container } from 'react-bootstrap';

const CustomCarousel = ({ items }) => {
  const {
    scrollRef,
    snapPointIndexes,
    activePageIndex,
    pages,
    refresh,
    prev,
    next,
    goTo,
  } = useSnapCarousel();

  useEffect(() => {
    refresh();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <Container className="p-0" fluid>
      <div className="d-flex justify-content-center gap-1 mb-1">
        {pages.map((p, i) => (
          <button
            key={p}
            type="button"
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
          <button
            type="button"
            onClick={() => prev()}
            className="carousel__arrow"
          >
            <BiLeftArrow />
          </button>
        </div>

        <ul ref={scrollRef} className="carousel">
          {items.map((item, i) => (
            <li
              key={item.key}
              className="carousel__item"
              style={{
                scrollSnapAlign: snapPointIndexes.has(i) ? 'start' : '',
              }}
            >
              {item.element}
            </li>
          ))}
        </ul>

        <div
          className={`carousel__control next ${
            activePageIndex === pages.length - 1 ? 'disabled' : ''
          }`}
        >
          <button
            type="button"
            onClick={() => next()}
            className="carousel__arrow"
          >
            <BiRightArrow />
          </button>
        </div>
      </div>
    </Container>
  );
};

const ItemPropType = PropTypes.shape({
  element: PropTypes.element.isRequired,
  key: PropTypes.number.isRequired,
});

CustomCarousel.propTypes = {
  items: PropTypes.arrayOf(ItemPropType).isRequired,
};

export default CustomCarousel;
