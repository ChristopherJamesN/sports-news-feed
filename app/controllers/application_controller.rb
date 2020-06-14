require 'net/http'

class ApplicationController < ActionController::Base
  include Knock::Authenticable

   def fallback_index_html
     render :file => '../client/public/index.html'
   end

   def retrieve_nfl_news
    res = Net::HTTP.get(URI.parse("https://newsapi.org/v1/articles?source=nfl-news&sortBy=top&apiKey=#{ENV['APIKEY']}"))
    render json: res, status: 200
   end
end
