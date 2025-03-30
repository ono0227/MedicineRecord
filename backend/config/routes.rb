Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      mount_devise_token_auth_for 'User', at: 'auth', controllers: {
        registrations: 'api/v1/auth/registrations',
        passwords: "api/v1/auth/passwords",
        sessions: 'api/v1/auth/sessions'
      }
      resources :categories, only: [:index]
      resources :posts
      resources :medicines
      get "users/currentuser"
      get "up" => "rails/health#show", as: :rails_health_check
    end
  end

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  # Defines the root path route ("/")
  # root "posts#index"
end
