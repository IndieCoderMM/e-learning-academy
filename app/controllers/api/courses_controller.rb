class Api::CoursesController < ApplicationController
  def index
    @courses = Course.all
    render json: @courses, status: :ok
  end
end
