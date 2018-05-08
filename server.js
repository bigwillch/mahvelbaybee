const express = require('express');
const cors = require('cors');
const responseTime = require('response-time')
const axios = require('axios');
const redis = require('redis');

const auth = require('./auth');

const app = express();
const port = process.env.PORT || 5000;

// use response-time as a middleware
app.use(responseTime());
app.use(cors())

const client = redis.createClient(12520, auth.redislabs.url, {no_ready_check: true});
client.auth(auth.redislabs.password, function (err) {
    if (err) throw err;
});

client.on('connect', function() {
    console.log('Connected to Redis');
});


// Print redis errors to the console
client.on('error', (err) => {
  console.log("Error " + err);
});



//
// app.get('/api/hello', (req, res) => {
//   res.send({ express: 'Hello From Express' });
// });
//
// app.listen(port, () => console.log(`Listening on port ${port}`));

app.all('/', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });

 process.on('unhandledRejection', (reason, p) => {
   console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
   // application specific logging, throwing an error, or other logic here
 });

// create an api/search route
app.get('/api/marvel', (req, res, next) => {

// console.log(client);



  // Extract the query from url and trim trailing spaces
  const query = (req._parsedUrl.query);

  // res.send({ express: 'Hello From Express' });

  // Build the Wikipedia API url
  const searchUrl = `http://gateway.marvel.com/v1/public/characters?${query}`;

  // Try fetching the result from Redis first in case we have it cached
  return client.get(`marvel:${query}`, (err, result) => {
    // If that key exist in Redis store
    if (result) {
      const resultJSON = JSON.parse(result);
      return res.status(200).json(resultJSON);
    } else if (err) {
        console.log('redis error', err);
    } else { // Key does not exist in Redis store
      // Fetch directly from Wikipedia API
      return axios.get(searchUrl)
        .then(response => {
          const responseJSON = response.data;
          // Save the Wikipedia API response in Redis store
          client.setex(`marvel:${query}`, 3600, JSON.stringify({ source: 'Redis Cache', ...responseJSON, }));
          // Send JSON response to client
          return res.status(200).json({ source: 'Marvel API', ...responseJSON, });
        })
        .catch(err => {
          console.log('axios error', err);
        });
    }
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
