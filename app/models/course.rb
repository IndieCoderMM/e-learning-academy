class Course < ApplicationRecord
  validates :title, presence: true
  validates :description, presence: true
  validates :price, presence: true, numericality: { greater_than_or_equal_to: 0 }
  validates :duration, presence: true, numericality: { greater_than: 0 }
  validates :img_url, presence: true
  validates :instructor, presence: true

  has_many :reservations, dependent: :destroy
end
