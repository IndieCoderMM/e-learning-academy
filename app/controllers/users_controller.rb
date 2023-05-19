class UsersController < ApplicationController
    def login 
        user = User.find_by(name: params[:username])
        if user 
            render json: { message: 'User logged in successfully!', name: user.name, id: user.id}, status: :ok
        else
            render json: { message: 'User not found!'}, status: :not_found
        end
    end

    def create
        user = User.new(name: params[:username])
        if user.save
            render json: {message: 'User created successfully!', name: user.name, id: user.id}, status: :created
        else
            render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
        end
    end
end
