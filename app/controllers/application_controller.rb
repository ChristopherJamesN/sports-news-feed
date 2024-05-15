require 'net/http'

class ApplicationController < ActionController::Base
  include Knock::Authenticable

  # TODO: Remove cnet.com from search results.
  # cnet.com is still showing up in the responses from newsapi.org, for example see this email:
  # https://mail.google.com/mail/u/0/#search/send+twee/FMfcgzGxTFdxlxhnxRmgwFzStmPKVjfn. It should not
  # be included in responses since it is included in EXCLUDED_DOMAINS.
  # You can also observe this by running:
  # curl "https://rails-news-feed-jt3432sekq-uc.a.run.app/retrieve_news.json?searchTerm=sports"  | jq '.articles | map(select(.url | contains("cnet.com")))'
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

  def fetch_news_from_cache_or_api(search_term)
    # Don't search for articles that were published more than one day ago.
    # Proof from irb:
    # 3.1.2 :004 > Time.now
    # => 2024-05-14 19:14:24.173067 -0500
    # 3.1.2 :005 > Time.now - 86_400
    # => 2024-05-13 19:14:26.433881 -0500
    t = Time.now - 86_400
    formatted_date = t.strftime('%F')
    Rails.cache.fetch("/retrieve_news?searhTerm=#{search_term}", expires_in: 6.hours) do
      news_api_request_uri = "https://newsapi.org/v2/everything?q=#{search_term}&language=en&from=#{formatted_date}&excludeDomains=#{EXCLUDED_DOMAINS}&apiKey=#{Rails.application.credentials.news[:api_key]}"
      puts "Making a request to #{news_api_request_uri}"
      Net::HTTP.get(URI.parse(news_api_request_uri))
    end
  end
end
