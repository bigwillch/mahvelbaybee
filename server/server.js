const express = require('express')
const cors = require('cors')
const compression = require('compression')
const axios = require('axios')
const qs = require('qs')
const redis = require('redis')
const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(compression())

// setup redis connection
const client = redis.createClient(12520, process.env.REDISLABS_URL, {no_ready_check: true});
client.auth(process.env.REDISLABS_PASSWORD, function (err) {
    if (err) throw err;
});
client.on('connect', function() {
    console.log('Connected to Redis');
});
// Print redis errors to the console
client.on('error', (err) => {
  console.log("Error " + err);
});

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
  // application specific logging, throwing an error, or other logic here
});


//
// app.get('/api/hello', (req, res) => {
//   res.send({ express: 'Hello From Express' });
// });
//
// app.listen(port, () => console.log(`Listening on port ${port}`));

// res.send({ express: 'Hello From Express' });

const CancelToken = axios.CancelToken;
let cancel = null;

const authParams = {
  apikey: null,
  ts: null,
  hash: null
};

// create an api/search route
app.get('/api/marvel', (req, res, next) => {

  req.on('close', function (err){
    typeof cancel === 'function' && cancel();
  });

  // separate auth and search params
  for (var property in authParams) {
    authParams[property] = req.query[property]
    delete req.query[property]
  }
  const query = qs.stringify(req.query);
  const authQuery = qs.stringify(authParams);
  const searchUrl = `http://gateway.marvel.com/v1/public/characters?${query}&${authQuery}`;

  // Try fetching the result from Redis first in case we have it cached
  return client.get(`marvel:${query}`, (err, result) => {
    // If that key exist in Redis store
    if (result) {
      const resultJSON = JSON.parse(result);
      return res.status(200).json(resultJSON);
    } else if (err) {
        console.log('redis error', err);
    } else { // Key does not exist in Redis store
      // Fetch directly from API
      return axios.get(searchUrl, {
        cancelToken: new CancelToken(
          function executor(c) {
            cancel = c;
          }
        )
      })
      .then(response => {
        const responseJSON = response.data;
        // Save the API response in Redis store
        client.setex(`marvel:${query}`, 86400, JSON.stringify({ source: 'Redis Cache', ...responseJSON, }));
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
