require 'net/http'

class ApplicationController < ActionController::Base
  include Knock::Authenticable

  def fallback_index_html
    render file: '../client/public/index.html'
  end

  def retrieve_sports_news
    res = fetch_sports_news_from_cache_or_api
    render json: res, status: :ok
  end

  def fetch_sports_news_from_cache_or_api
    t = Time.now - 500_000
    formattedDate = t.strftime('%F')
    Rails.cache.fetch('/retrieve_sports_news', expires_in: 6.hours) do
      res = Net::HTTP.get(URI.parse("https://newsapi.org/v2/top-headlines?country=us&category=sports&from=#{formattedDate}&apiKey=#{Rails.application.credentials.news[:api_key]}"))
    end
  end

  def retrieve_bachelor_news
    res = fetch_bachelor_news_from_cache_or_api
    render json: res, status: :ok
  end

  def fetch_bachelor_news_from_cache_or_api
    t = Time.now - 500_000
    formattedDate = t.strftime('%F')
    Rails.cache.fetch('/retrieve_bachelor_news', expires_in: 6.hours) do
      res = Net::HTTP.get(URI.parse("https://newsapi.org/v2/everything?q=bachelor&from=#{formattedDate}&apiKey=#{Rails.application.credentials.news[:api_key]}"))
    end
  end

  def retrieve_bachelorette_news
    res = fetch_bachelorette_news_from_cache_or_api
    render json: res, status: :ok
  end

  def fetch_bachelorette_news_from_cache_or_api
    t = Time.now - 500_000
    formattedDate = t.strftime('%F')
    Rails.cache.fetch('/retrieve_bachelorette_news', expires_in: 6.hours) do
      res = Net::HTTP.get(URI.parse("https://newsapi.org/v2/everything?q=bachelorette&from=#{formattedDate}&apiKey=#{Rails.application.credentials.news[:api_key]}"))
    end
  end

  def retrieve_news
    res = fetch_news_from_cache_or_api(params[:searchTerm])
    render json: res, status: :ok
  end

  def fetch_news_from_cache_or_api(searchTerm)
    t = Time.now - 500_000
    formattedDate = t.strftime('%F')
    Rails.cache.fetch("/retrieve_news?searhTerm=#{searchTerm}", expires_in: 6.hours) do
      res = Net::HTTP.get(URI.parse("https://newsapi.org/v2/everything?q=#{searchTerm}&language=en&from=#{formattedDate}&apiKey=#{Rails.application.credentials.news[:api_key]}"))
    end
  end
end
