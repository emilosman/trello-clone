Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  resources :boards
  resources :lists
  resources :cards

  root to: 'boards#index'
end
