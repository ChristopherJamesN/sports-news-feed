# react-redux-nba-news-feed

A web application built with a React-Redux frontend and a Rails backend that can be used to view and take notes on NBA news. Demo hosted on Heroku here: https://agile-reef-34726.herokuapp.com/.

## Installation

To test out this application locally, fork and clone the repo.
 `$ git clone your-local-fork-here`

## Usage

Run `bundle install` , `cd client && npm install` and `cd .. && rake start` . You should be automatically directed to the appropriate location in your browser to interact with the application.

## Deployment

Application is deployed on on Heroku.
Using the Heroku CLI run `git push heroku master` to deploy the latest commit.

## Technical Details

* The server side source code lives primarily in the `app` directory. The server side uses the Rails framework.
  + The configuration files for the server live in the `config` directory.
  + Server side test code lives in the `test` directory.
  + The `lib/tasks` directory contains `rake` task definitions.
* Database related files (schema, seeds, and migrations) live in the `db` directory.
* The client side source code lives in the `client` directory. The client side uses the React framework.
* `app/controllers/application_controller.rb` makes requests to retrieve news stories from https://newsapi.org/, responses are cached for six hours to avoid exceeding newsapi rate limits.
* The `rake start` command starts a rails server on http://localhost:3001/ and a webpack development
server with hot reloading serving the client application on http://localhost:3000/.

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/ChristopherJamesN/react-redux-nba-news-feed. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](contributor-covenant.org) code of conduct.

## License

The application is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
