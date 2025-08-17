# Sports News Feed

A web application built with a React-Redux frontend and a Rails backend that can be used to view sports news. Demo hosted on Google Cloud here: https://rails-news-feed-jt3432sekq-uc.a.run.app/.

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

```shell
cat /dev/urandom | LC_ALL=C tr -dc '[:alpha:]'| fold -w 50 | head -n1 > dbpassword
```

Generate a `config/credentials.yml.enc` with:

```shell
EDITOR="vi" bin/rails credentials:edit
```

Copy and paste the PostgresSQL instance database password from `dbpassword`

into the file that is opened via the above command:

```shell
secret_key_base: GENERATED_VALUE
gcp:
  db_password: PASSWORD
news:
  api_key: API_KEY
```

### JSON endpoints

When developing locally you can test out the json endpoints defined in app/controllers/application_controller.rb via http://localhost:3001/.

For example:

http://localhost:3001/retrieve_news.json?searchTerm=sports to retrieve news articles matching the search term "sports".

Or, from the command line:

```shell
curl "http://localhost:3001/retrieve_news.json?searchTerm=sports" | jq .
```

The same endpoints can be queried on the deployed application. For example:

https://rails-news-feed-jt3432sekq-uc.a.run.app/retrieve_news.json?searchTerm=sports to retrieve news articles matching the search term "sports".

or, from the command line:

```shell
curl "https://rails-news-feed-jt3432sekq-uc.a.run.app/retrieve_news.json?searchTerm=sports" | jq .
```

The `retrieve_news` endpoint in particular is used by https://github.com/ChristopherJamesN/twitter-bot/ to find news to tweet out.

See https://github.com/ChristopherJamesN/twitter-bot/blob/main/src/utils/make_tweets.py#L165-L173 for where these calls are made.

### Client side dependencies

If using an m1 Mac you will need to use the `-x86_64` architecture version of node to install
dependencies in order to prevent errors like:

```shell
Error: Cannot find module \'node-darwin-x64/package.json\'
```

Note that the above error message might be preceded by a misleading error message like:

```shell
npm ERR! ERROR: npm v9.6.3 is known not to run on Node.js v11.15.0.  This version of npm supports the following node versions: `^14.17.0 || ^16.13.0 || >=18.0.0`. You can find the latest version at https://nodejs.org/.
```

This misleading error message might be shown even if you are not using Node.js version 11.15.0.

Also see https://github.com/motdotla/dotenv/issues/560 and https://www.npmjs.com/package/node-darwin-x64
for more details.

To uninstall a version of node and reinstall with the `-x86_64` architecture version run:

```shell
nvm uninstall 16.13.2
arch -x86_64 zsh
nvm install 16.13.2
```

## GCloud Deployment

### Container Registry to Artifact Registry Migration

I used the following steps on Sunday, March 17, 2024 to copy all Container Registry images and redirect all gcr.io traffic to Artifact registry.

https://cloud.google.com/artifact-registry/docs/transition/setup-gcr-repo#copy contains details on the first step, copying images from Container Registry to Artifact registry.

```shell
gcloud services enable \
    cloudresourcemanager.googleapis.com \
    artifactregistry.googleapis.com
```

and then:

```shell
gcloud projects add-iam-policy-binding news-feed-368501 \
    --member='serviceAccount:service-65433380411@gcp-sa-artifactregistry.iam.gserviceaccount.com' \
    --role='roles/storage.objectViewer'
```

and then:

```shell
gcrane cp -r gcr.io/news-feed-368501 us-docker.pkg.dev/news-feed-368501/gcr.io
```

For details on the second step, redirecting gcr.io traffic to Artifact Registry, see https://cloud.google.com/artifact-registry/docs/transition/setup-gcr-repo#redirect-enable.

```shell
gcloud projects add-iam-policy-binding news-feed-368501 \
    --member='user:nady.christopher@gmail.com' \
    --role='roles/artifactregistry.admin'

gcloud projects add-iam-policy-binding news-feed-368501 \
    --member='user:nady.christopher@gmail.com' \
    --role='roles/storage.admin'
```

and then:

```shell
gcloud artifacts settings enable-upgrade-redirection \
    --project=news-feed-368501 --dry-run
```

and then:

```shell
gcloud artifacts settings enable-upgrade-redirection \
    --project=news-feed-368501
```

After performing the above operations, I also disabled the Container Registry API following the instructions here: https://cloud.google.com/container-registry/docs/enable-service#disable-api and deleted the Cloud Storage bucket, `artifacts.news-feed-368501.appspot.com,` for the Container Registry following the instructions here: https://cloud.google.com/artifact-registry/docs/transition/setup-gcr-repo#cleanup.

### Initial Provisioning and Deployment

PostgresSQL instance can be created with:

```shell
gcloud sql instances create news-feed-postgres-instance \
    --database-version POSTGRES_12 \
    --tier db-f1-micro \
    --region us-central1
```

The database can then be created with:

```shell
gcloud sql databases create news-feed-postgres-database \
    --instance news-feed-postgres-instance
```

A random password for the database user can be created and written to a
file called `dbpassword` with:

```shell
cat /dev/urandom | LC_ALL=C tr -dc '[:alpha:]'| fold -w 50 | head -n1 > dbpassword
```

Create a user within the recently created instance and set its password with:

```shell
gcloud sql users create news-feed-postgres-user \
   --instance=news-feed-postgres-instance --password=$(cat dbpassword)
```

A Cloud Storage bucket can be created with:

```shell
gsutil mb -l us-central1 gs://news-feed-368501-news-feed-media-bucket
```

To make objects in the bucket public, run:

```shell
gsutil iam ch allUsers:objectViewer gs://news-feed-368501-news-feed-media-bucket
```

Generate a `config/credentials.yml.enc` with:

```shell
EDITOR="vi" bin/rails credentials:edit
```

Copy and paste the PostgresSQL instance database password from `dbpassword`

into the file that is opened via the above command:

```shell
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

```shell
gcloud secrets create rails-master-key-secret --data-file config/master.key
```

Confirm creation of the secret with:

```shell
gcloud secrets describe rails-master-key-secret
gcloud secrets versions access latest --secret rails-master-key-secret
```

Get the value of the project number with:

```shell
gcloud projects describe news-feed-368501 --format='value(projectNumber)'
```

Grant access to the secret to the Cloud Run service account with:

```shell
gcloud secrets add-iam-policy-binding rails-master-key-secret \
    --member serviceAccount:65433380411-compute@developer.gserviceaccount.com \
    --role roles/secretmanager.secretAccessor
```

Grant access to the secret to the Cloud Build service account with:

```shell
gcloud secrets add-iam-policy-binding rails-master-key-secret \
    --member serviceAccount:65433380411@cloudbuild.gserviceaccount.com \
    --role roles/secretmanager.secretAccessor
```

Grant permission for Cloud Build to access Cloud SQL:

```shell
gcloud projects add-iam-policy-binding news-feed-368501 \
    --member serviceAccount:65433380411@cloudbuild.gserviceaccount.com \
    --role roles/cloudsql.client
```

Use Cloud Build to build the image, run the database migrations, and populate the static assets:

```shell
gcloud builds submit --config cloudbuild.yaml \
    --substitutions _SERVICE_NAME=rails-news-feed,_INSTANCE_NAME=news-feed-postgres-instance,_REGION=us-central1,_SECRET_NAME=rails-master-key-secret
```

Deploy the Cloud Run service for the first time, setting the service region, base image, and connected Cloud SQL instance by running:

```shell
gcloud run deploy rails-news-feed \
     --platform managed \
     --region us-central1 \
     --image gcr.io/news-feed-368501/rails-news-feed \
     --add-cloudsql-instances news-feed-368501:us-central1:news-feed-postgres-instance \
     --allow-unauthenticated
```

### Deploying Updates to Google Cloud

Run the Cloud Build build and migration script:

```shell
gcloud builds submit --config cloudbuild.yaml \
     --substitutions _SERVICE_NAME=rails-news-feed,_INSTANCE_NAME=news-feed-postgres-instance,_REGION=us-central1,_SECRET_NAME=rails-master-key-secret
```

Deploy the service, specifying only the region and image:

```shell
gcloud run deploy rails-news-feed \
     --platform managed \
     --region us-central1 \
     --image gcr.io/news-feed-368501/rails-news-feed
```

Note: If you update the `config/master.key` file locally you will need
to add a new version of the `rails-master-key-secret` secret to the
gcloud project before you build a new image. This can be done with:

```shell
gcloud secrets versions add rails-master-key-secret --data-file config/master.key
```

After adding a new version of the secret you may also need to
re-grant permissions for viewing the secret:

Grant access to the secret to the Cloud Run service account with:

```shell
gcloud secrets add-iam-policy-binding rails-master-key-secret \
    --member serviceAccount:65433380411-compute@developer.gserviceaccount.com \
    --role roles/secretmanager.secretAccessor
```

Grant access to the secret to the Cloud Build service account with:

```shell
gcloud secrets add-iam-policy-binding rails-master-key-secret \
    --member serviceAccount:65433380411@cloudbuild.gserviceaccount.com \
    --role roles/secretmanager.secretAccessor
```

### Deploying Updates to Google Cloud Without a Postgres Instance

Run the Cloud Build build script to create a new image with:

```shell
gcloud builds submit --config cloudbuild.yaml \
     --substitutions _SERVICE_NAME=rails-news-feed,_SECRET_NAME=rails-master-key-secret &&
osascript -e 'display notification "Build and push of new sports-news-feed app image has completed."'
```

Deploy the service, specifying only the region and image with:

```shell
gcloud run deploy rails-news-feed \
     --platform managed \
     --region us-central1 \
     --image gcr.io/news-feed-368501/rails-news-feed &&
echo "After deploying a new sports news feed image, it can be useful to delete the old images from https://console.cloud.google.com/artifacts/docker/news-feed-368501/us/gcr.io/rails-news-feed?project=news-feed-368501. This will reduce Google Cloud costs" && osascript -e 'display notification "Deployment of new sports news feed image complete. After deploying a new sports news feed image, it can be useful to delete the old images from https://console.cloud.google.com/artifacts/docker/news-feed-368501/us/gcr.io/rails-news-feed?project=news-feed-368501. This will reduce Google Cloud costs"'
```

After deploying a new image, it can be useful to delete the old images from https://console.cloud.google.com/artifacts/docker/news-feed-368501/us/gcr.io/rails-news-feed?project=news-feed-368501. This will reduce Google Cloud costs.

#### Testing deployments with `curl`

To test that the service is working as intended after pushing changes, you can query it using `curl` as described above. For example:

```shell
curl "https://rails-news-feed-jt3432sekq-uc.a.run.app/retrieve_news.json?searchTerm=sports" | jq .
```

To get the first "article" object from the list of articles returned from the API, you can process the input with `jq` like this:

```shell
curl "https://rails-news-feed-jt3432sekq-uc.a.run.app/retrieve_news.json?searchTerm=sports" | jq '.articles[0]'
```

To get the URL of the first article you can use:

```shell
curl "https://rails-news-feed-jt3432sekq-uc.a.run.app/retrieve_news.json?searchTerm=sports" | jq '.articles[0].url'
```

Sort by URL and then get the first three articles with a command like:

```shell
curl "https://rails-news-feed-jt3432sekq-uc.a.run.app/retrieve_news.json?searchTerm=sports" | jq '.articles | sort_by(.url)[:3]'
```

To check for articles with a certain url you could use:

```shell
curl "https://rails-news-feed-jt3432sekq-uc.a.run.app/retrieve_news.json?searchTerm=sports" | jq '.articles[].url' | grep www.skysports.com
```

Or, alternatively, to return all objects that have a url that contains `www.skysports.com` , you can use the following:

```shell
curl "https://rails-news-feed-jt3432sekq-uc.a.run.app/retrieve_news.json?searchTerm=sports"  | jq '.articles | map(select(.url | contains("www.skysports.com")))'
```

To return all objects that have a url that contains `cnet.com` , you can use the following:

```shell
curl "https://rails-news-feed-jt3432sekq-uc.a.run.app/retrieve_news.json?searchTerm=sports"  | jq '.articles | map(select(.url | contains("cnet.com")))'
```

Or, with a shell variable set to the url you want to retrieve with:

```shell
URL_TO_FIND="espn.com"
```

then run:

```shell
curl "https://rails-news-feed-jt3432sekq-uc.a.run.app/retrieve_news.json?searchTerm=sports"  | jq -r --arg URL_TO_FIND "$URL_TO_FIND" '.articles | map(select(.url | contains($URL_TO_FIND)))'
```

To retrieve the titles for all articles that have a url that contains `www.cbssports.com`, you can use:

```shell
curl "https://rails-news-feed-jt3432sekq-uc.a.run.app/retrieve_news.json?searchTerm=sports"  | jq '.articles | map(select(.url | contains("www.cbssports.com")))[].title'
```

#### Testing newsapi.org with `curl`

To test out requests directly to newsapi.org with `curl` , you can use a command like the following:

```shell
curl "https://newsapi.org/v2/everything?q=sports&language=en&from=2024-05-13/&apiKey=your-api-key" | jq .
```

```shell
curl "https://newsapi.org/v2/everything?q=sports&language=en&from=2024-05-13&excludeDomains=bestadsontv.com,slickdeals.net,cscoblogs-prod-17bj.appspot.com,sarkarinaukriblog.com,cnet.com/&apiKey=your-api-key" | jq .
```

### Observability

Application logs can be viewed on Google Cloud console [here](https://console.cloud.google.com/logs?project=news-feed-368501).

Application traces can be found [here](https://console.cloud.google.com/traces/list?project=news-feed-368501).

## Technical Details

- The server side source code lives primarily in the `app` directory. The server side uses the Rails framework.
  - The configuration files for the server live in the `config` directory.
  - Server side test code lives in the `test` directory.
    - Run tests with `rspec`. For example to run the tests in test/controllers/users_controller_test.rb use `rspec test/controllers/users_controller_test.rb`.
  - The `lib/tasks` directory contains `rake` task definitions.
- Database related files (schema, seeds, and migrations) live in the `db` directory.
- The client side source code lives in the `client` directory. The client side uses the React framework.
- `app/controllers/application_controller.rb` makes requests to retrieve news stories from https://newsapi.org/, responses are cached for six hours to avoid exceeding newsapi rate limits.
- The current period newsapi.org API usage can be checked at https://newsapi.org/account if you are logged into your newsapi.org account.
  - Based on my reading of the docs, there is no programmatic way to check your API usage (or at least none that is documented as of Monday, October 2, 2023).
- The `rake start` command starts a rails server on http://localhost:3001/ and a webpack development
  server with hot reloading serving the client application on http://localhost:3000/.

Note: To save costs, I do not currently include the postgres instance in the GCloud deployment.
This means that you cannot login and save/take notes on news stories on the deployed version
of the app.

### Upgrading to react-scripts version 5.0.x

After updating `react-scripts` from version 4.0.0 to 5.0.1 the following errors were occurring when running
`npm run build` or `npm run start` locally in the client directory:

```shell
npm run start

> client@0.1.0 start
> react-scripts start

/Users/christophernady/Development/code/sports-news-feed/client/node_modules/eslint-webpack-plugin/node_modules/jest-worker/build/index.js:110
  _ending;
         ^

SyntaxError: Unexpected token ;
    at Module._compile (internal/modules/cjs/loader.js:760:23)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:827:10)
    at Module.load (internal/modules/cjs/loader.js:685:32)
    at Function.Module._load (internal/modules/cjs/loader.js:620:12)
    at Module.require (internal/modules/cjs/loader.js:723:19)
    at require (internal/modules/cjs/helpers.js:14:16)
    at Object.<anonymous> (/Users/christophernady/Development/code/sports-news-feed/client/node_modules/eslint-webpack-plugin/dist/getESLint.js:9:5)
    at Module._compile (internal/modules/cjs/loader.js:816:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:827:10)
    at Module.load (internal/modules/cjs/loader.js:685:32)
```

I found someone else reporting a similar issue [here](https://community.atlassian.com/t5/Bitbucket-questions/TypeError-intermediate-value-slice-reverse-flatmap-is-not-a/qaq-p/2111363) without a resolution.

Post-commit there is a Github workflow (defined in [.github/workflows/client_test.yml](.github/workflows/client_test.yml)) that runs `npm run build` and `npm run test` . [Here](https://github.com/ChristopherJamesN/sports-news-feed/actions/runs/5707996673/job/15465227497) is an example run.
The build kicked off by the workflow was completing successfully, but if I tried with the same node version (16.20.1) locally it would fail with the above error.

Here are a few of the commits showing things I tried to resolve the error:

- https://github.com/ChristopherJamesN/sports-news-feed/commit/c9b384cdc56125d67f72281f07ed46661b8d1e80
- https://github.com/ChristopherJamesN/sports-news-feed/commit/327e5604d85fdb6df555ad0258fd1ed641a78c16
- https://github.com/ChristopherJamesN/sports-news-feed/commit/b85ff07390adc35bcb8a2f0c08e3d1e040771376
- https://github.com/ChristopherJamesN/sports-news-feed/commit/f768b373225765d5b10f1b925e42890a83d9b18e
- https://github.com/ChristopherJamesN/sports-news-feed/commit/9bae58533337e7e39c98a9109501d4c2758f8143
- https://github.com/ChristopherJamesN/sports-news-feed/commit/a89b4f956541584717be5c441251d8feb1f36bf1
- https://github.com/ChristopherJamesN/sports-news-feed/commit/8f0f0eb24b71a8b37588da73c41c93566466549c
- https://github.com/ChristopherJamesN/sports-news-feed/commit/1fefe52086724a237347446416d67f18da0877ec

and the original commit where I bumped the `react-scripts` version from 4.0.0 to 5.0.1 can be found
here: https://github.com/ChristopherJamesN/sports-news-feed/commit/7fcb992630bc63b41798211952c96542ecedc777.

#### An issue with the Node version used?

In [this reported issue](https://answers.netlify.com/t/react-app-doesnt-deploy-via-git-repo-but-does-with-netlify-cli/73700/12) on Netlify forums the solution was to bump the node version, similar to [this issue](https://answers.netlify.com/t/react-scripts-syntax-error-on-build/75092/6).

A couple of similar reported issues on Stack Overflow:

- https://stackoverflow.com/questions/73464400/error-when-try-to-run-npm-build-on-react-project (no accepted answer).
- https://stackoverflow.com/questions/74848909/react-js-npm-run-start-return-error-syntaxerror-unexpected-token (accepted answer is to update node version).

This got me thinking, so I changed `"build": "react-scripts build",` to `"build": "node -v && react-scripts build",` in `client/package.json` . Now when I run `npm run build` I see the node version is 11.15.0:

```shell
client@0.1.0 build
> node -v && react-scripts build

v11.15.0
/Users/christophernady/Development/code/sports-news-feed/client/node_modules/eslint-webpack-plugin/node_modules/jest-worker/build/index.js:110
  _ending;
```

`nvm ls` showed:

```shell
nvm ls
        v6.11.2
       v12.20.0
       v14.18.2
       v16.13.2
       v16.17.1
       v16.18.0
->     v16.20.1
        v18.6.0
       v18.12.1
        v20.3.1
         system
default -> 18.12 (-> v18.12.1)
iojs -> N/A (default)
unstable -> N/A (default)
node -> stable (-> v20.3.1) (default)
stable -> 20.3 (-> v20.3.1) (default)
lts/* -> lts/hydrogen (-> N/A)
lts/argon -> v4.9.1 (-> N/A)
lts/boron -> v6.17.1 (-> N/A)
lts/carbon -> v8.17.0 (-> N/A)
lts/dubnium -> v10.24.1 (-> N/A)
lts/erbium -> v12.22.12 (-> N/A)
lts/fermium -> v14.21.3 (-> N/A)
lts/gallium -> v16.20.1
lts/hydrogen -> v18.17.0 (-> N/A)
```

and `node -v` showed

```shell
node -v
v16.20.1
```

So I was not sure why the `build` script was using Node version 11.15.0.

`nvm uninstall 11.15.0` showed that version 11.15.0 is not installed:

```shell
nvm uninstall 11.15.0
N/A version is not installed...
```

If I tried `node -v && nvm use 16.20.1 && react-scripts build` as the `build` script, I got an error like:

```shell
v11.15.0
sh: nvm: command not found
```

To find which node binary was being I used I set `which node && nvm use 16.20.1 && react-scripts build` as the `build` script and ran `npm run build` :

```shell
npm run build

> client@0.1.0 build
> which node && nvm use 16.20.1 && react-scripts build

/Users/christophernady/Development/code/node_modules/.bin/node
sh: nvm: command not found
```

So apparently I had this old node version installed locally (and it was probably being used by the NPM scripts due to something with how my `PATH` is setup, I haven't dug into this):

```shell
/Users/christophernady/Development/code/node_modules/.bin/node -v
v11.15.0
```

After I removed the old version with:

```shell
rm -rf /Users/christophernady/Development/code/node_modules/.bin/node
```

then `npm run build` was successful (and the node version I specified with nvm was used):

```shell
npm run build

> client@0.1.0 build
> which node && react-scripts build

/Users/christophernady/.nvm/versions/node/v16.20.1/bin/node
Creating an optimized production build...
Compiled successfully.

File sizes after gzip:

  113.46 kB  build/static/js/main.d49ca668.js
  23.46 kB   build/static/css/main.1ffee203.css

The project was built assuming it is hosted at /.
You can control this with the homepage field in your package.json.

The build folder is ready to be deployed.
You may serve it with a static server:

  npm install -g serve
  serve -s build

Find out more about deployment here:

  https://cra.link/deployment
```

For future reference, the `-a` option for the `which` command lists all instances of executables found (instead of just the first one of each).

```shell
 which -a node
/opt/homebrew/bin/node
/Users/christophernady/.nvm/versions/node/v18.12.1/bin/node
/opt/homebrew/bin/node
/opt/homebrew/bin/node
/Users/christophernady/.nvm/versions/node/v16.20.1/bin/node
/Users/christophernady/.nvm/versions/node/v16.18.0/bin/node
/Users/christophernady/.nvm/versions/node/v20.3.1/bin/node
/Users/christophernady/.nvm/versions/node/v18.12.1/bin/node
```

### RVM Issues

If you run `rake start` and you get:

```shell
rake start
Your Ruby version is 2.6.10, but your Gemfile specified 3.1.2
```

and then you try to switch your Ruby version with `rvm` you might get:

```shell
rvm use 3.1.2
Required ruby-2.7.0 is not installed.
To install do: 'rvm install "ruby-2.7.0"'

RVM is not a function, selecting rubies with 'rvm use ...' will not work.

You need to change your terminal emulator preferences to allow login shell.
Sometimes it is required to use `/bin/bash --login` as the command.
Please visit https://rvm.io/integration/gnome-terminal/ for an example.
```

If you use `zsh` as your default shell you then need to run:

```shell
/bin/zsh --login
```

and now switching ruby versions with `rvm` should work:

```shell
rvm use 3.1.2
Using /Users/christophernady/.rvm/gems/ruby-3.1.2
```

### Ruby installation issues

https://bugs.ruby-lang.org/issues/20706 solved a tricky bug I was running into when installing ruby with `rbenv` and/or `rvm`. `brew uninstall binutils` and then re-installing the ruby version resolved the issue for me.

## Source Formatting

To format the Ruby source code, the [RuboCop gem](https://github.com/rubocop/rubocop) is used.

```shell
bundle exec rubocop -a --require rubocop-rails
```

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/ChristopherJamesN/react-redux-nba-news-feed. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](contributor-covenant.org) code of conduct.

## License

The application is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
