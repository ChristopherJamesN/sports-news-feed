require 'net/http'

class ApplicationController < ActionController::Base
  include Knock::Authenticable

   def fallback_index_html
     render :file => '../client/public/index.html'
   end

   def retrieve_sports_news
    res = fetch_sports_news_from_cache_or_api()
    render json: res, status: 200
   end

   def fetch_sports_news_from_cache_or_api
    Rails.cache.fetch("/retrieve_sports_news", expires_in: 6.hours) do
      res = Net::HTTP.get(URI.parse("https://newsapi.org/v2/top-headlines?sources=fox-sports,espn,nfl-news?&apiKey=#{ENV['APIKEY']}"))
    end
   end
end
