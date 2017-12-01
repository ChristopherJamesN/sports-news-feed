class ApplicationController < ActionController::Base
  protect_from_forgery with: :null_session
  skip_before_action :verify_authenticity_token

  before_action :configure_permitted_parameters, if: :devise_controller?

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:email, :password, :password_confirmation, :provider, :uid])
    devise_parameter_sanitizer.permit(:sign_in, keys: [:email, :password])
  end

   def fallback_index_html
     render :file => '../client/public/index.html'
   end
end
