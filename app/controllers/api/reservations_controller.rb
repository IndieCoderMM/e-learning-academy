class Api::ReservationsController < ApplicationController
  def index
    user = User.includes(:reservations).find(params[:user_id])
    reservations = user.reservations.includes(:course)
    data = reservations.map do |reservation|
      {
        id: reservation.id,
        course: reservation.course,
        date: reservation.date,
        city: reservation.city
      }
    end

    render json: data, status: :ok
  end

  def create
    reservation = Reservation.new(reservation_params)

    if reservation.save
      render json: { message: 'Reservation created successfully' }, status: :created
    else
      render json: { message: reservation.errors.full_messages.join(', ') }, status: :unprocessable_entity
    end
  end

  def destroy
    reservation = Reservation.find(params[:id])
    reservation.destroy

    render json: { message: 'Reservation deleted successfully' }, status: :ok
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'Reservation not found' }, status: :not_found
  end

  private

  def reservation_params
    params.require(:reservation).permit(:course_id, :user_id, :date, :city)
  end
end
