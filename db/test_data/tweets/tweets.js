//seed data
const tweetsdB = require('../../seed/tweets/tweets');

//convert array of objects to object of objects
//simplifies user search for testing
const tweets = {}
for (const tweet of tweetsdB) {
  tweets[tweet.id] = tweets
}

module.exports = tweets
