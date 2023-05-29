#!/usr/bin/env bash
# exit on error
set -o errexit

bundle install
# clean 
rm -rf public
# build
npm install && npm run build
bundle exec rake assets:precompile
bundle exec rake assets:clean
bundle exec rake db:migrate
# post build
cp -a app/assets/builds/. public/