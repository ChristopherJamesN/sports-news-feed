Rails.application.routes.draw do
  post '/user_token' => 'user_token#create'
  get '/retrieve_news' => 'application#retrieve_news'

  scope '/api' do
    resources :notes, only: %i[index create update destroy]
    post '/register' => 'users#create'
    resources :users
    mount Knock::Engine => '/knock'
  end

  get '*path', to: 'application#fallback_index_html', constraints: lambda { |request|
    !request.xhr? && request.format.html?
  }
end
