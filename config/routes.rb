Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  resources :boards
  resources :cards
  resources :lists
  
  namespace :api do
    resources :boards
    resources :cards do
      collection do
        post 'card_order'
      end
    end

    resources :lists do
      collection do
        post 'list_order'
      end
    end
  end

  root to: 'boards#index'
end
