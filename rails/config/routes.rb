Rails.application.routes.draw do
  scope '/api' do
    get :note, to: 'notes#index'
    post :note, to: 'notes#create'
  end
end
