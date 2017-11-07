Rails.application.routes.draw do
  scope '/api' do
    get :notes, to: 'notes#index'
    post :notes, to: 'notes#create'
  end
end
