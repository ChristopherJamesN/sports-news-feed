Rails.application.routes.draw do
  post '/user_token' => 'user_token#create'

  scope '/api' do
    resources :notes, only: [:index, :create, :update]
    post '/register' => 'users#create'
    resources :users
    mount Knock::Engine => '/knock'
  end

  get '*path', to: "application#fallback_index_html", constraints: ->(request) do
    !request.xhr? && request.format.html?
  end
end
