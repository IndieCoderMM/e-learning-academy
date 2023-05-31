import React from 'react';
import axios from 'axios';
import { render, screen, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../app/javascript/store/configureStore';
import Home from '../../app/javascript/pages/Home';

jest.mock('../../app/javascript/components/CustomCarousel', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(({ items }) => (
    <div data-testid="mocked-custom-carousel">
      {items.map((item) => (
        <div key={item.key}>{item.element.props.course.title}</div>
      ))}
    </div>
  )),
}));

jest.mock('axios');

const responseData = [
  {
    id: 1,
    title: 'Course 1',
    description: 'Description for course 1',
    instructor: 'Instructor 1',
    price: 5.99,
    duration: 300,
    img_url: 'image1.jpg',
  },
  {
    id: 2,
    title: 'Course 2',
    description: 'Description for course 2',
    instructor: 'Instructor 2',
    price: 5.99,
    duration: 300,
    img_url: 'image2.jpg',
  },
];

describe('Home page', () => {
  it('displays all available courses', async () => {
    // Arrange
    axios.get.mockResolvedValue({ data: responseData });
    let asFragment;

    // Act
    await act(() => {
      const component = render(
        <BrowserRouter>
          <Provider store={store}>
            <Home />
          </Provider>
          ,
        </BrowserRouter>,
      );
      asFragment = component.asFragment;
    });
    await screen.findByText('Course 1');

    // Assert
    expect(asFragment()).toMatchSnapshot();
    expect(
      screen.getByRole('heading', { name: /featured courses/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /\(\s*2\s*Available\s*\)/i }),
    ).toBeInTheDocument();
    expect(screen.getByText('Course 2')).toBeInTheDocument();
  });
});
