class ReservationsController < ApplicationController
    def index 
        user = User.includes(:reservations).find(params[:user_id])
        reservations = user.reservations.includes(:course)
        data = reservations.map do |reservation|
            {
                course: reservation.course, 
                date: reservation.date,
                city: reservation.city
            }
        end

        render json: data, status: :ok
    end
end
