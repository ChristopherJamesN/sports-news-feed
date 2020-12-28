Rails.application.routes.draw do
  post '/user_token' => 'user_token#create'
  get '/retrieve_sports_news' => 'application#retrieve_sports_news'
  get '/retrieve_bachelor_news' => 'application#retrieve_bachelor_news'
  get '/retrieve_bachelorette_news' => 'application#retrieve_bachelorette_news'
  get '/retrieve_news' => 'application#retrieve_news'

  scope '/api' do
    resources :notes, only: [:index, :create, :update, :destroy]
    post '/register' => 'users#create'
    resources :users
    mount Knock::Engine => '/knock'
  end

  get '*path', to: "application#fallback_index_html", constraints: ->(request) do
    !request.xhr? && request.format.html?
  end
end
