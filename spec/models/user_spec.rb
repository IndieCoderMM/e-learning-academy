require 'rails_helper'

RSpec.describe User, type: :model do
  let(:user) { User.new(name: 'John') }

  describe 'validations' do
    it 'is valid with valid attributes' do
      expect(user).to be_valid
    end

    it 'is not valid without a name' do
      user.name = nil
      expect(user).to_not be_valid
      expect(user.errors[:name]).to include("can't be blank")
    end

    it 'is not valid if the name is not unique' do
      existing_user = User.create(name: 'John')
      user.name = existing_user.name
      expect(user).to_not be_valid
      expect(user.errors[:name]).to include('has already been taken')
    end
  end

  describe 'associations' do
    it 'has many reservations' do
      association = User.reflect_on_association(:reservations)
      expect(association.macro).to eq(:has_many)
    end
  end
end
