require 'net/http'

class ApplicationController < ActionController::Base
  include Knock::Authenticable

   def fallback_index_html
     render :file => '../client/public/index.html'
   end

   def retrieve_nfl_news
    res = fetch_nfl_news_from_cache_or_api()
    render json: res, status: 200
   end

   def fetch_nfl_news_from_cache_or_api
    Rails.cache.fetch("/retrieve_nfl_news", expires_in: 6.hours) do
      res = Net::HTTP.get(URI.parse("https://newsapi.org/v1/articles?source=nfl-news&sortBy=top&apiKey=#{ENV['APIKEY']}")) 
    end
   end

   def retrieve_espn_news
    res = fetch_espn_news_from_cache_or_api()
    render json: res, status: 200
   end

   def retrieve_sports_news
    res = fetch_sports_news_from_cache_or_api()
    render json: res, status: 200
   end

   def fetch_espn_news_from_cache_or_api
    Rails.cache.fetch("/retrieve_espn_news", expires_in: 6.hours) do
      res = Net::HTTP.get(URI.parse("https://newsapi.org/v1/articles?source=espn&sortBy=top&apiKey=#{ENV['APIKEY']}"))  
    end
   end

   def retrieve_fox_sports_news
    res = fetch_fox_sports_news_from_cache_or_api()
    render json: res, status: 200
   end

   def fetch_fox_sports_news_from_cache_or_api
    Rails.cache.fetch("/retrieve_fox_sports_news", expires_in: 6.hours) do
      res = Net::HTTP.get(URI.parse("https://newsapi.org/v1/articles?source=fox-sports&sortBy=top&apiKey=#{ENV['APIKEY']}"))   
    end
   end

   def fetch_sports_news_from_cache_or_api
    Rails.cache.fetch("/retrieve_sports_news", expires_in: 6.hours) do
      res = Net::HTTP.get(URI.parse("https://newsapi.org/v2/top-headlines?sources=fox-sports,espn,nfl-news?&apiKey=#{ENV['APIKEY']}"))
    end
   end
end
