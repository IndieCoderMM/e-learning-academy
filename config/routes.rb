Rails.application.routes.draw do
  root 'root#index'

  post '/users/login', to: 'users#login'
  post '/users/register', to: 'users#create'

  namespace :api do
    resources :courses
  end
end
