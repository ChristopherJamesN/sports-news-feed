Rails.application.routes.draw do
  scope '/api' do
    resources :notes, only: [:index, :create, :update]
    post 'user_token' => 'user_token#create'
  end

  scope :auth do
    get 'is_signed_in', to: 'auth#is_signed_in?'
  end

  get '*path', to: "application#fallback_index_html", constraints: ->(request) do
    !request.xhr? && request.format.html?
  end
end
