class Api::CoursesController < ApplicationController
  def index
    @courses = Course.all
    render json: @courses, status: :ok
  end

  def show
    # Retrieve the item details based on the provided item ID
    item = Course.find(params[:id])

    render json: item, status: :ok
  end
end
