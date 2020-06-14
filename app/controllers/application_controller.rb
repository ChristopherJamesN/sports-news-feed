require 'net/http'

class ApplicationController < ActionController::Base
  include Knock::Authenticable

   def fallback_index_html
     render :file => '../client/public/index.html'
   end

   # To-do: Would like to cache these responses and maybe only pull new stories every 12
   # hours or so. With the free API plan, only 500 requests per month are allowed.

   def retrieve_nfl_news
    Rails.cache.fetch("/retrieve_nfl_news", expires_in: 12.hours) do
      res = Net::HTTP.get(URI.parse("https://newsapi.org/v1/articles?source=nfl-news&sortBy=top&apiKey=#{ENV['APIKEY']}"))
      render json: res, status: 200
    end
   end

   def retrieve_espn_news
    Rails.cache.fetch("/retrieve_espn_news", expires_in: 12.hours) do
      res = Net::HTTP.get(URI.parse("https://newsapi.org/v1/articles?source=espn&sortBy=top&apiKey=#{ENV['APIKEY']}"))
      render json: res, status: 200
    end
   end

   def retrieve_fox_sports_news
    Rails.cache.fetch("/retrieve_fox_sports_news", expires_in: 12.hours) do
      res = Net::HTTP.get(URI.parse("https://newsapi.org/v1/articles?source=fox-sports&sortBy=top&apiKey=#{ENV['APIKEY']}"))
      render json: res, status: 200
    end
   end
end
