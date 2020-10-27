Rails.application.routes.draw do
  root 'homes#index'

  get '/giraffes', to: 'homes#index'
  get '/giraffes/new', to: 'homes#index'
  get '/giraffes/:id', to: "homes#index"

  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  namespace :api do 
    namespace :v1 do
      resources :giraffes, only: [:index, :show, :create] do
        resources :reviews, only: [:create]
      end
    end
  end
end
