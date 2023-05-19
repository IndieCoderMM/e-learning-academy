class UsersController < ApplicationController
  def login
    user = User.find_by(name: params[:user][:name])
    if user
      render json: { message: 'User logged in successfully!', name: user.name, id: user.id }, status: :ok
    else
      render json: { message: 'User not found!' }, status: :not_found
    end
  end

  def create
    user = User.new(user_params)
    if user.save
      render json: { message: 'User created successfully!', name: user.name, id: user.id }, status: :created
    else
      render json: { message: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.require(:user).permit(:name)
  end
end
