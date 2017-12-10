class ApplicationController < ActionController::Base
  include Knock::Authenticable

   def fallback_index_html
     render :file => '../client/public/index.html'
   end
end
