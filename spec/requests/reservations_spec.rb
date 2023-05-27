require 'rails_helper'

RSpec.describe 'Api::ReservationsController', type: :request do
  describe 'GET /api/users/:user_id/reservations' do
    it 'returns a list of reservations for a user' do
      user = User.create(name: 'John')
      course = Course.create(
        title: 'Course 1',
        img_url: 'https://example.com/course1.jpg',
        description: 'Course 1 description',
        price: 165,
        duration: 300,
        instructor: 'Instructor 1'
      )
      reservation = Reservation.create(user:, course:, date: Date.today, city: 'City 1')

      get "/api/users/#{user.id}/reservations"

      expect(response).to have_http_status(:ok)
      expect(response.body).to eq([
        {
          id: reservation.id,
          course:,
          date: reservation.date,
          city: reservation.city
        }
      ].to_json)
    end
  end

  describe 'POST /api/users/:user_id/reservations' do
    it 'creates a new reservation' do
      user = User.create(name: 'John')
      course = Course.create(
        title: 'Course 1',
        img_url: 'https://example.com/course1.jpg',
        description: 'Course 1 description',
        price: 165,
        duration: 300,
        instructor: 'Instructor 1'
      )
      reservation_params = {
        reservation: {
          user_id: user.id,
          course_id: course.id,
          date: Date.today,
          city: 'City 1'
        }
      }

      post "/api/users/#{user.id}/reservations", params: reservation_params

      expect(response).to have_http_status(:created)
      expect(response.body).to eq({ message: 'Reservation created successfully' }.to_json)
    end

    it 'returns an error if reservation creation fails' do
      user = User.create(name: 'John')
      invalid_params = {
        reservation: {
          user_id: nil,
          course_id: nil,
          date: nil,
          city: nil
        }
      }

      post "/api/users/#{user.id}/reservations", params: invalid_params

      expect(response).to have_http_status(:unprocessable_entity)
      expect(response.body).to include('User must exist', 'Course must exist', 'Date can\'t be blank',
                                       'City can\'t be blank')
    end
  end

  describe 'DELETE /api/reservations/:id' do
    it 'deletes a reservation' do
      user = User.create(name: 'John')
      course = Course.create(
        title: 'Course 1',
        img_url: 'https://example.com/course1.jpg',
        description: 'Course 1 description',
        price: 165,
        duration: 300,
        instructor: 'Instructor 1'
      )
      reservation = Reservation.create(course:, user:, date: Date.today, city: 'City 1')

      delete "/api/users/#{user.id}/reservations/#{reservation.id}"

      expect(response).to have_http_status(:ok)
      expect(response.body).to eq({ message: 'Reservation deleted successfully' }.to_json)
    end

    it 'returns an error if reservation not found' do
      user = User.create(name: 'John')
      delete "/api/users/#{user.id}/reservations/999"

      expect(response).to have_http_status(:not_found)
      expect(response.body).to eq({ error: 'Reservation not found' }.to_json)
    end
  end
end
