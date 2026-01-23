require 'net/http'

class ApplicationController < ActionController::Base
  include Knock::Authenticable

  EXCLUDED_DOMAINS = 'thegatewaypundit.com,extratv.com,biztoc.com,dailycaller.com,rlsbb.ru,thefutoncritic.com,'\
  'screenrant.com,drunkenstepfather.com,egotasticsports.com,zacjohnson.com,smartbitchestrashybooks.com,rlsbb.cc,'\
  'bestadsontv.com,slickdeals.net,cscoblogs-prod-17bj.appspot.com,sarkarinaukriblog.com,cnet.com,'\
  'sorozatjunkie.hu,bloguismo.com,dealcatcher.com,breitbart.com,americanthinker.com,kicksonfire.com,'\
  'indiatimes.com,fark.com,twistedsifter.com,cheezburger.com,ericcressey.com,moonbattery.com,'\
  'yahoo.com,mindbodygreen.com,dailysignal.com,naturalnews.com,canonrumors.com,sneakernews.com,'\
  '101greatgoals.com,ozbargain.com,nofilmschool.com,newsweek.com,hypebeast.com,challies.com,dealnews.com,'\
  'yankodesign.com,freerepublic.com,ozbargain.com.au,nep123.com,bmwblog.com,cbssports.com,nypost.com,'\
  'dcrainmaker.com,fstoppers.com,sportingnews.com,mediagazer.com'.freeze

  def fallback_index_html
    render file: '../client/public/index.html'
  end

  def retrieve_news
    res = fetch_news_from_cache_or_api(params[:searchTerm])
    render json: res, status: :ok
  end

  def fetch_news_from_cache_or_api(search_term)
    # Don't search for articles that were published more than two days ago.
    # Proof from irb:
    # 3.1.2 :004 > Time.now
    # => 2024-05-14 19:14:24.173067 -0500
    # 3.1.2 :005 > Time.now - 86_400
    # => 2024-05-13 19:14:26.433881 -0500
    t = Time.now - (86_400 * 2)
    formatted_date = t.strftime('%F')
    Rails.cache.fetch("/retrieve_news?searhTerm=#{search_term}", expires_in: 6.hours) do
      news_api_request_uri = "https://newsapi.org/v2/everything?q=#{search_term}&language=en&from=#{formatted_date}&excludeDomains=#{EXCLUDED_DOMAINS}&apiKey=#{Rails.application.credentials.news[:api_key]}"
      puts "Making a request to #{news_api_request_uri}"
      Net::HTTP.get(URI.parse(news_api_request_uri))
    end
  end
end
