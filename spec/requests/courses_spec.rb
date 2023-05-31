require 'rails_helper'

RSpec.describe 'Api::CoursesController', type: :request do
  describe 'GET /api/courses' do
    it 'returns a list of courses' do
      # Create some sample courses for testing
      course1 = Course.create(
        title: 'Course 1',
        img_url: 'https://example.com/course1.jpg',
        description: 'Course 1 description',
        price: 165,
        duration: 300,
        instructor: 'Instructor 1'
      )
      course2 = Course.create(
        title: 'Course 2',
        img_url: 'https://example.com/course2.jpg',
        description: 'Course 2 description',
        price: 10.80,
        duration: 45,
        instructor: 'Instructor 2'
      )

      # Make a GET request to the index action
      get '/api/courses'

      # Assert the response status and body
      expect(response).to have_http_status(:ok)
      expect(response.body).to eq([course1, course2].to_json)
    end
  end

  describe 'POST /api/courses' do
    it 'creates a new course' do
      # Create course parameters for testing
      course_params = {
        course: {
          title: 'Test Course',
          img_url: 'https://example.com/image.jpg',
          description: 'This is a test course',
          price: 124.50,
          duration: 90,
          instructor: 'Margaret Aluoch'
        }
      }

      # Make a POST request to the create action
      post '/api/courses', params: course_params

      # Assert the response status and body
      expect(response).to have_http_status(:created)
      expect(response.body).to eq(Course.last.to_json)
    end
  end

  describe 'GET /api/courses/:id' do
    it 'returns the details of a course' do
      # Create a sample course for testing
      course = Course.create(
        title: 'Test Course',
        img_url: 'https://example.com/image.jpg',
        description: 'This is a test course',
        price: 80,
        duration: 180,
        instructor: 'Margaret Aluoch'
      )

      # Make a GET request to the show action with the course ID
      get "/api/courses/#{course.id}"

      # Follow redirects if any
      # follow_redirect!

      # Assert the response status and body
      expect(response).to have_http_status(:ok)
    end
  end

  describe 'DELETE /api/courses/:id' do
    it 'deletes a course' do
      # Create a sample course for testing
      course = Course.create(
        title: 'Test Course',
        img_url: 'https://example.com/image.jpg',
        description: 'This is a test course',
        price: 5.50,
        duration: 40,
        instructor: 'Margaret Aluoch'
      )

      # Make a DELETE request to the destroy action with the course ID
      delete "/api/courses/#{course.id}"

      # Assert the response status
      expect(response).to have_http_status(:no_content)

      # Ensure the course is actually deleted from the database
      expect(Course.exists?(course.id)).to be_falsey
    end
  end
end
