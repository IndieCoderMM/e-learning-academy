require 'rails_helper'

RSpec.describe Reservation, type: :model do
  let(:reservation) { Reservation.new(course: Course.new, user: User.new, date: Date.today, city: 'New York') }

  describe 'associations' do
    it 'belongs to a course' do
      association = Reservation.reflect_on_association(:course)
      expect(association.macro).to eq(:belongs_to)
    end

    it 'belongs to a user' do
      association = Reservation.reflect_on_association(:user)
      expect(association.macro).to eq(:belongs_to)
    end
  end

  describe 'validations' do
    it 'is valid with valid attributes' do
      expect(reservation).to be_valid
    end

    it 'is not valid without a course' do
      reservation.course = nil
      expect(reservation).to_not be_valid
      expect(reservation.errors[:course]).to include("can't be blank")
    end

    it 'is not valid without a user' do
      reservation.user = nil
      expect(reservation).to_not be_valid
      expect(reservation.errors[:user]).to include("can't be blank")
    end

    it 'is not valid without a date' do
      reservation.date = nil
      expect(reservation).to_not be_valid
      expect(reservation.errors[:date]).to include("can't be blank")
    end

    it 'is not valid without a city' do
      reservation.city = nil
      expect(reservation).to_not be_valid
      expect(reservation.errors[:city]).to include("can't be blank")
    end
  end
end
