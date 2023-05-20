class ReservationsController < ApplicationController
    def index 
        user = User.find(params[:user_id])
        reservations = user.reservations 

        render json: reservations, status: :ok
    end
end
