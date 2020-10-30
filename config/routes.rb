Rails.application.routes.draw do
  root 'homes#index'

  get '/giraffes', to: 'homes#index'
  get '/giraffes/new', to: 'homes#authenticated'
  get '/giraffes/:id', to: "homes#index"
  get '/about', to: "homes#index"

  get '/api/v1/user/role', to: "api/v1/user#role"

  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  ## these may change based on authorization
  namespace :api do 
    namespace :v1 do
      resources :giraffes, only: [:index, :show, :create, :destroy] do
        resources :reviews, only: [:create, :update, :destroy]
      end
      resources :votes, only:[:create, :index]
      resources :user, only:[:role]
    end
  end
end
