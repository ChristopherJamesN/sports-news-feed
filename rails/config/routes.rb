Rails.application.routes.draw do
  scope '/api' do
    get :note, to: 'notes#index'
  end
end
