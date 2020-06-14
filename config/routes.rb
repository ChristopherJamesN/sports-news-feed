Rails.application.routes.draw do
  post '/user_token' => 'user_token#create'
  get '/retrieve_nfl_news' => 'application#retrieve_nfl_news'
  get '/retrieve_espn_news' => 'application#retrieve_espn_news'
  get '/retrieve_fox_sports_news' => 'application#retrieve_fox_sports_news'

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
