Rails.application.routes.draw do
  # Scope the Devise routes under /api
  scope 'api' do

    devise_for :users, controllers: { sessions: 'sessions' }

    post 'users/sign_in', to: 'sessions#login'
    delete 'users/sign_out', to: 'sessions#logout'
    get 'auth_status', to: 'sessions#auth_status'


    devise_scope :user do
      get '/current_user', to: 'sessions#current_user'  # This route checks the current authenticated user
    end



    # Other API routes for your application
    resources :messages
    resources :jobs
    resources :applicants
    resources :candidates

    # Endpoint to get current_user (show user info)
  end
end
