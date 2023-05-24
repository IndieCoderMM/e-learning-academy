class ReservationsController < ApplicationController
  def index
    user = User.includes(:reservations).find(params[:user_id])
    reservations = user.reservations.includes(:course)
    data = reservations.map do |reservation|
      {
        id: reservation.id,
        course: reservation.course,
        date: reservation.date,
        city: reservation.city,
        user_id: user.id
      }
    end

    render json: data, status: :ok
  end
end
