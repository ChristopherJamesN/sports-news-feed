# react-redux-nba-news-feed

A web application built with a React-Redux frontend and a Rails backend that can be used to view and take notes on sports news. Demo hosted on Heroku here: https://agile-reef-34726.herokuapp.com/.

## Installation

To test out this application locally, fork and clone the repo.
 `$ git clone your-local-fork-here`

## Usage

Run `bundle install` , `cd client && npm install` and `cd .. && rake start` . You should be automatically directed to the appropriate location in your browser to interact with the application.

## Deployment

Application is deployed on on Heroku.
Using the Heroku CLI run `git push heroku master` to deploy the latest commit.

### GCloud Deployment

PostgresSQL instance can be created with:

```
gcloud sql instances create news-feed-postgres-instance \
    --database-version POSTGRES_12 \
    --tier db-f1-micro \
    --region us-central1
```

The database can then be created with:

```
gcloud sql databases create news-feed-postgres-database \
    --instance news-feed-postgres-instance
```

A random password for the database user can be created and written to a
file called `dbpassword` with:

```
cat /dev/urandom | LC_ALL=C tr -dc '[:alpha:]'| fold -w 50 | head -n1 > dbpassword
```

Create a user within the recently created instance and set its password with:

```
gcloud sql users create news-feed-postgres-user \
   --instance=news-feed-postgres-instance --password=$(cat dbpassword)
```

A Cloud Storage bucket can be created with:

```
gsutil mb -l us-central1 gs://news-feed-368501-news-feed-media-bucket
```

To make objects in the bucket public, run:

```
gsutil iam ch allUsers:objectViewer gs://news-feed-368501-news-feed-media-bucket
```

Generate a `config/credentials.yml.enc` with:

```
bin/rails credentials:edit
```

Copy and paste the PostgresSQL instance database password from `dbpassword`

into the file that is opened via the above command:

```
secret_key_base: GENERATED_VALUE
gcp:
  db_password: PASSWORD
```

The `config/master.key` needs to be stored in Google Cloud secrets manager
in order to decrypt the `config/credentials/yml.enc` file.

Create a new secret with:

```
gcloud secrets create rails-master-key-secret --data-file config/master.key
```

Confirm creation of the secret with:

```
gcloud secrets describe rails-master-key-secret

gcloud secrets versions access latest --secret rails-master-key-secret
```

Get the value of the project number with:

```
gcloud projects describe news-feed-368501 --format='value(projectNumber)'
```

Grant access to the secret to the Cloud Run service account with:

```
gcloud secrets add-iam-policy-binding rails-master-key-secret \
    --member serviceAccount:65433380411-compute@developer.gserviceaccount.com \
    --role roles/secretmanager.secretAccessor
```

Grant access to the secret to the Cloud Build service account with:

```
gcloud secrets add-iam-policy-binding rails-master-key-secret \
    --member serviceAccount:65433380411@cloudbuild.gserviceaccount.com \
    --role roles/secretmanager.secretAccessor
```

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
