# Go to project > Repository and set the branch filter
# Then click on "View Key" and paste it on github

npm install -g karma-cli
npm install -g codeclimate-test-reporter
npm install
npm install mocha-lcov-reporter

echo "\n> Ensure that the code is warning free"
node_modules/.bin/gulp lint || exit 1

echo "\n> Build"
node_modules/.bin/gulp build-all || exit 1

echo "\n> Run tests for node"
node_modules/.bin/mocha --harmony -u tdd tests/lib/ || exit 1

echo "\n> Prepare tests for browsers"
node_modules/.bin/gulp springbokjs-shim || exit 1

echo "\n> Run browser tests"
sudo start xvfb
karma start karma.conf.js --single-run --browsers=Firefox,Chrome,PhantomJS || exit 1

echo "\n> Generate docs (api and coverage)"
node_modules/.bin/gulp docs || exit 1

echo "\n> Generate coverage for codeclimate"
cd lib-cov
TEST_COV=1 ../node_modules/.bin/mocha --harmony -u tdd --reporter mocha-lcov-reporter ../tests/lib | CODECLIMATE_REPO_TOKEN=5e2f69aa955b8f192cfeb37185b2ccc9d4ff289dc8e2ef03d8b4aaa1d849f63c codeclimate
cd ..

echo "\n> Copy docs up to github gh-pages branch"
mv docs docs-tmp
git checkout -f gh-pages
rm -Rf docs
mv docs-tmp docs
date > date.txt
git add docs
git commit -m"auto commit from drone.io"
git remote set-url origin git@github.com:christophehurpeau/springbokjs-router.git
git push origin gh-pages
