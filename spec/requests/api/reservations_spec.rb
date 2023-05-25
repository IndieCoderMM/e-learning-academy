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

schema_reservation = {
  type: :object,
  properties: {
    id: { type: :integer },
    date: { type: :string },
    city: { type: :string },
    course: schema_course
  },
  required: %w[id course date city]
}

RSpec.describe 'api/reservations', type: :request do
  let(:user) { User.create!(name: 'Tom') }
  let(:course) do
    Course.create!(
      title: 'Title',
      description: 'some description',
      price: 399,
      duration: 30,
      img_url: 'https://imgurl',
      instructor: 'Instructor'
    )
  end
  let(:reservation) { Reservation.create!(course:, user:, date: '22-12-2023', city: 'Yangon') }

  path '/api/users/{user_id}/reservations' do
    parameter name: 'user_id', in: :path, type: :string, description: 'User ID'

    get('get reservations for a user') do
      tags 'Reservations'
      produces 'application/json'
      parameter name: 'user_id', in: :path, type: :string, description: 'User ID'

      response(200, 'successful') do
        schema type: :array,
               items: schema_reservation

        let(:user_id) { user.id }
        run_test!
      end
    end
  end

  path '/api/users/{user_id}/reservations' do
    parameter name: 'user_id', in: :path, type: :string, description: 'User ID'

    post('create new reservation') do
      tags 'Reservations'
      consumes 'application/json'
      produces 'application/json'
      parameter name: 'user_id', in: :path, type: :string, description: 'User ID'
      parameter name: :reservation, in: :body, schema: {
        type: :object,
        properties: {
          course_id: { type: :integer },
          user_id: { type: :integer },
          date: { type: :string },
          city: { type: :string }
        },
        required: %w[course_id user_id date city]
      }

      response(201, 'successful') do
        let(:user_id) { user.id }
        let(:reservation) { { course_id: course.id, user_id: user.id, date: '2023-05-25', city: 'New York' } }

        run_test!
      end

      response(422, 'unprocessable entity') do
        let(:user_id) { user.id }
        let(:reservation) { { course_id: course.id, user_id: user.id, date: '', city: 'New York' } }

        run_test!
      end
    end
  end

  path '/api/users/{user_id}/reservations/{id}' do
    parameter name: 'user_id', in: :path, type: :string, description: 'User ID'
    parameter name: 'id', in: :path, type: :string, description: 'Reservation ID'

    delete('delete reservation') do
      tags 'Reservations'
      produces 'application/json'

      parameter name: 'user_id', in: :path, type: :string, description: 'User ID'
      parameter name: 'id', in: :path, type: :string, description: 'Reservation ID'

      response(200, 'successful') do
        let(:user_id) { user.id }
        let(:id) { reservation.id }

        run_test!
      end

      response(404, 'not found') do
        let(:user_id) { user.id }
        let(:id) { 'invalid_id' }

        run_test!
      end
    end
  end
end
