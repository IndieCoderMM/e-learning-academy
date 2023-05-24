class Api::CoursesController < ApplicationController
  def index
    @courses = Course.all
    render json: @courses, status: :ok
  end

  def create
    @course = Course.new(course_params)
    if @course.save
      render json: @course, status: :created
    else
      render json: { errors: @course.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def show
    # Retrieve the item details based on the provided item ID
    item = Course.find(params[:id])

    render json: item, status: :ok
  end

  def course_params
    params.require(:course).permit(:title, :img_url, :description, :price, :duration, :instructor)
  end
end
