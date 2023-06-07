# react-redux-nba-news-feed

A web application built with a React-Redux frontend and a Rails backend that can be used to view and take notes on sports news. Demo hosted on Google Cloud here: https://rails-news-feed-jt3432sekq-uc.a.run.app/.

## Installation

To test out this application locally, fork and clone the repo.
 `$ git clone your-local-fork-here`

## Usage

Run `bundle install` , `cd client && npm install` and `cd .. && rake start` . You should be automatically directed to the appropriate location in your browser to interact with the application.

Or, if you have already installed the required dependencies, you can just run `rake start` from
the root of the project.

Note: You may also need to delete and recreate the `config/credentials.yml.enc` file if you
fork this project. Here are some details copied from the [GCloud Deployment section](#gcloud-deployment)
for reference:

A random password for the database user can be created and written to a
file called `dbpassword` with:

```
cat /dev/urandom | LC_ALL=C tr -dc '[:alpha:]'| fold -w 50 | head -n1 > dbpassword
```

Generate a `config/credentials.yml.enc` with:

```
EDITOR="vi" bin/rails credentials:edit
```

Copy and paste the PostgresSQL instance database password from `dbpassword`

into the file that is opened via the above command:

```
secret_key_base: GENERATED_VALUE
gcp:
  db_password: PASSWORD
news:
  api_key: API_KEY
```

### Client side dependencies

If using an m1 Mac you will need to use the `-x86_64` architecture version of node to install
dependencies in order to prevent errors like:

```
Error: Cannot find module \'node-darwin-x64/package.json\'
```

Note that the above error message might be preceded by a misleading error message like:

```
npm ERR! ERROR: npm v9.6.3 is known not to run on Node.js v11.15.0.  This version of npm supports the following node versions: `^14.17.0 || ^16.13.0 || >=18.0.0`. You can find the latest version at https://nodejs.org/.
```

This misleading error message might be shown even if you are not using Node.js version 11.15.0.

Also see https://github.com/motdotla/dotenv/issues/560 and https://www.npmjs.com/package/node-darwin-x64
for more details.

To uninstall a version of node and reinstall with the `-x86_64` architecture version run:

```
nvm uninstall 16.13.2
arch -x86_64 zsh
nvm install 16.13.2
```

### GCloud Deployment

#### Initial Provisioning and Deployment

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
EDITOR="vi" bin/rails credentials:edit
```

Copy and paste the PostgresSQL instance database password from `dbpassword`

into the file that is opened via the above command:

```
secret_key_base: GENERATED_VALUE
gcp:
  db_password: PASSWORD
news:
  api_key: API_KEY
```

Note: The news api key will need to be generated from https://newsapi.org/.

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

Grant permission for Cloud Build to access Cloud SQL:

```
gcloud projects add-iam-policy-binding news-feed-368501 \
    --member serviceAccount:65433380411@cloudbuild.gserviceaccount.com \
    --role roles/cloudsql.client
```

Use Cloud Build to build the image, run the database migrations, and populate the static assets:

```
gcloud builds submit --config cloudbuild.yaml \
    --substitutions _SERVICE_NAME=rails-news-feed,_INSTANCE_NAME=news-feed-postgres-instance,_REGION=us-central1,_SECRET_NAME=rails-master-key-secret
```

Deploy the Cloud Run service for the first time, setting the service region, base image, and connected Cloud SQL instance by running:

```
gcloud run deploy rails-news-feed \
     --platform managed \
     --region us-central1 \
     --image gcr.io/news-feed-368501/rails-news-feed \
     --add-cloudsql-instances news-feed-368501:us-central1:news-feed-postgres-instance \
     --allow-unauthenticated
```

#### Deploying Updates to Google Cloud

Run the Cloud Build build and migration script:

```
gcloud builds submit --config cloudbuild.yaml \
     --substitutions _SERVICE_NAME=rails-news-feed,_INSTANCE_NAME=news-feed-postgres-instance,_REGION=us-central1,_SECRET_NAME=rails-master-key-secret
```

Deploy the service, specifying only the region and image:

```
gcloud run deploy rails-news-feed \
     --platform managed \
     --region us-central1 \
     --image gcr.io/news-feed-368501/rails-news-feed
```

or without a Postgres instance setup:

```
gcloud builds submit --config cloudbuild.yaml \
     --substitutions _SERVICE_NAME=rails-news-feed,_SECRET_NAME=rails-master-key-secret
```

Deploy the service, specifying only the region and image:

```
gcloud run deploy rails-news-feed \
     --platform managed \
     --region us-central1 \
     --image gcr.io/news-feed-368501/rails-news-feed
```

Note: If you update the `config/master.key` file locally you will need
to add a new version of the `rails-master-key-secret` secret to the
gcloud project before you build a new image. This can be done with:

```
gcloud secrets versions add rails-master-key-secret --data-file config/master.key
```

After adding a new version of the secret you may also need to
re-grant permissions for viewing the secret:

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
    - Run tests with `rspec`. For example to run the tests in test/controllers/users_controller_test.rb use `rspec test/controllers/users_controller_test.rb`.
  + The `lib/tasks` directory contains `rake` task definitions.
* Database related files (schema, seeds, and migrations) live in the `db` directory.
* The client side source code lives in the `client` directory. The client side uses the React framework.
* `app/controllers/application_controller.rb` makes requests to retrieve news stories from https://newsapi.org/, responses are cached for six hours to avoid exceeding newsapi rate limits.
* The `rake start` command starts a rails server on http://localhost:3001/ and a webpack development
server with hot reloading serving the client application on http://localhost:3000/.

Note: To save costs, I do not currently include the postgres instance in the GCloud deployment.
This means that you cannot login and save/take notes on news stories on the deployed version
of the app.

## Source Formatting

To format the Ruby source code, the [RuboCop gem](https://github.com/rubocop/rubocop) is used.

```
bundle exec rubocop -a --require rubocop-rails
```

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/ChristopherJamesN/react-redux-nba-news-feed. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](contributor-covenant.org) code of conduct.

## License

The application is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
