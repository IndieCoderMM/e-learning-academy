require 'swagger_helper'

schema_course = {
  type: :object,
  properties: {
    id: { type: :integer },
    title: { type: :string },
    description: { type: :string },
    price: { type: :integer },
    duration: { type: :integer },
    img_url: { type: :string },
    instructor: { type: :string }
  },
  required: %w[id title description price duration img_url instructor]
}

course_props = {
  title: { type: :string },
  description: { type: :string },
  price: { type: :integer },
  duration: { type: :integer },
  img_url: { type: :string },
  instructor: { type: :string }
}
RSpec.describe 'api/courses', type: :request do
  path '/api/courses' do
    get('get all courses') do
      tags 'Courses'
      produces 'application/json'

      response(200, 'successful') do
        schema type: :array,
               items: schema_course

        run_test!
      end
    end

    post('create new course') do
      tags 'Courses'
      consumes 'application/json'
      produces 'application/json'
      parameter name: :course, in: :body, schema: {
        type: :object,
        properties: course_props,
        required: %w[title description price duration img_url instructor]
      }

      response(201, 'successful') do
        let(:course) { { title: 'New Course', description: 'New Description', price: 150, duration: 120, img_url: 'https://imgurl', instructor: 'New Instructor' } }

        run_test!
      end

      response(422, 'unprocessable entity') do
        let(:course) do
          { title: 'Invalid Course', description: '', price: 0, duration: 0, img_url: '', instructor: '' }
        end

        run_test!
      end
    end
  end

  path '/api/courses/{id}' do
    parameter name: 'id', in: :path, type: :integer, description: 'Course ID'

    get('get a course') do
      tags 'Courses'
      produces 'application/json'
      parameter name: 'id', in: :path, type: :integer, description: 'Course ID'

      response(200, 'successful') do
        schema schema_course

        let(:id) { Course.create(title: 'Course', description: 'Description', price: 200, duration: 90, img_url: 'https://imgurl', instructor: 'Instructor').id }

        run_test!
      end

      response(404, 'not found') do
        let(:id) { 'invalid_id' }

        run_test!
      end
    end

    delete('delete a course') do
      tags 'Courses'
      produces 'application/json'
      parameter name: 'id', in: :path, type: :integer, description: 'Course ID'

      response(204, 'no content') do
        let(:id) { Course.create(title: 'Course', description: 'Description', price: 200, duration: 90, img_url: 'https://imgurl', instructor: 'Instructor').id }

        run_test!
      end

      response(404, 'not found') do
        let(:id) { 'invalid_id' }

        run_test!
      end
    end
  end
end
