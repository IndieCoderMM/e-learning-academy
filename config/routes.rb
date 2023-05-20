Rails.application.routes.draw do
  root 'root#index'
  
  
  post '/users/login', to: 'users#login'
  post '/users/register', to: 'users#create'

  get '/users/:user_id/reservations', to: 'reservations#index'
  
  # Catch-all route for unmatched routes
  get '*path', to: redirect('/')
end
