class ApplicationController < ActionController::Base
  include Knock::Authenticable
  protect_from_forgery with: :null_session
  skip_before_action :verify_authenticity_token

   def fallback_index_html
     render :file => '../client/public/index.html'
   end
end
