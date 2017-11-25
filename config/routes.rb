Rails.application.routes.draw do
  devise_for :users

  scope '/api' do
    resources :notes, only: [:index, :create, :update]
  end

  scope :auth do
    get 'is_signed_in', to: 'auth#is_signed_in?'
  end

  get '*path', to: "application#fallback_index_html", constraints: ->(request) do
    !request.xhr? && request.format.html?
  end
end
