class Reservation < ApplicationRecord
  belongs_to :course
  belongs_to :user

  validates :course, presence: true
  validates :user, presence: true
  validates :date, presence: true
  validates :city, presence: true
end
