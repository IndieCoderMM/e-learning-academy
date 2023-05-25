Rails.application.routes.draw do
  root 'root#index'
 
  post '/users/login', to: 'users#login'
  post '/users/register', to: 'users#create'
 
  namespace :api do
    resources :courses, only: [:index, :create, :destroy]
    resources :users, only: [] do 
      resources :reservations, only: [:index, :create, :destroy]
    end
  end

  # Catch-all route for unmatched routes
  get '*path', to: redirect('/')

end

