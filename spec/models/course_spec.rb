require 'rails_helper'

RSpec.describe Course, type: :model do
  let(:course) do
    Course.new(title: 'Ruby Programming', description: 'Learn Ruby programming language', price: 99, duration: 30,
               img_url: 'example.com/ruby.jpg', instructor: 'John Doe')
  end

  describe 'validations' do
    it 'is valid with valid attributes' do
      expect(course).to be_valid
    end

    it 'is not valid without a title' do
      course.title = nil
      expect(course).to_not be_valid
      expect(course.errors[:title]).to include("can't be blank")
    end

    it 'is not valid without a description' do
      course.description = nil
      expect(course).to_not be_valid
      expect(course.errors[:description]).to include("can't be blank")
    end

    it 'is not valid without a price' do
      course.price = nil
      expect(course).to_not be_valid
      expect(course.errors[:price]).to include("can't be blank")
    end

    it 'is not valid with a negative price' do
      course.price = -10
      expect(course).to_not be_valid
      expect(course.errors[:price]).to include('must be greater than or equal to 0')
    end

    it 'is not valid without a duration' do
      course.duration = nil
      expect(course).to_not be_valid
      expect(course.errors[:duration]).to include("can't be blank")
    end

    it 'is not valid with a non-positive duration' do
      course.duration = 0
      expect(course).to_not be_valid
      expect(course.errors[:duration]).to include('must be greater than 0')
    end

    it 'is not valid without an image URL' do
      course.img_url = nil
      expect(course).to_not be_valid
      expect(course.errors[:img_url]).to include("can't be blank")
    end

    it 'is not valid without an instructor' do
      course.instructor = nil
      expect(course).to_not be_valid
      expect(course.errors[:instructor]).to include("can't be blank")
    end
  end

  describe 'associations' do
    it 'has many reservations' do
      association = Course.reflect_on_association(:reservations)
      expect(association.macro).to eq(:has_many)
      expect(association.options[:dependent]).to eq(:destroy)
    end
  end
end
