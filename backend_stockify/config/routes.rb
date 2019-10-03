Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  post '/login', to: 'auth#login'
  post '/userstocks', to: 'users#user_stocks' 
  post '/buy', to: 'users#buy' 
  get '/transactions', to: 'users#transactions'
  post '/register', to: 'users#create'
end
