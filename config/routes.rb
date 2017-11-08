Rails.application.routes.draw do
  scope '/api' do
    resources :notes, only: [:index, :create, :update]
  end
end
