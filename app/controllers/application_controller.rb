require 'net/http'

class ApplicationController < ActionController::Base
  include Knock::Authenticable

  EXCLUDED_DOMAINS = 'thegatewaypundit.com,extratv.com,biztoc.com,dailycaller.com,rlsbb.ru,thefutoncritic.com,'\
  'screenrant.com,drunkenstepfather.com,egotasticsports.com,zacjohnson.com,smartbitchestrashybooks.com,rlsbb.cc,'\
  'bestadsontv.com,slickdeals.net,cscoblogs-prod-17bj.appspot.com,sarkarinaukriblog.com,cnet.com'.freeze

  def fallback_index_html
    render file: '../client/public/index.html'
  end

  def retrieve_news
    res = fetch_news_from_cache_or_api(params[:searchTerm])
    render json: res, status: :ok
  end

  # TODO: Add the option to specify domains that are included rather than or in addition
  # to domains that are excluded. For the sports news feed frontend in particular showing
  # news from all of the domains that the news api may retrieve news from is a bit of a bad
  # user experience, since some of the news is not really relevant to sports if it matches
  # the search terms. See https://newsapi.org/docs/endpoints/everything for API documentation.
  # See https://rails-news-feed-jt3432sekq-uc.a.run.app/ for sports news feed frontend.
  def fetch_news_from_cache_or_api(search_term)
    t = Time.now - 500_000
    formatted_date = t.strftime('%F')
    Rails.cache.fetch("/retrieve_news?searhTerm=#{search_term}", expires_in: 6.hours) do
      news_api_request_uri = "https://newsapi.org/v2/everything?q=#{search_term}&language=en&from=#{formatted_date}&excludeDomains=#{EXCLUDED_DOMAINS}/&apiKey=#{Rails.application.credentials.news[:api_key]}"
      puts "Making a request to #{news_api_request_uri}"
      Net::HTTP.get(URI.parse(news_api_request_uri))
    end
  end
end
