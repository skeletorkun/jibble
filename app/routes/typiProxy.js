import https from 'https';
import request from 'request';

const TYPI_URL = 'https://jsonplaceholder.typicode.com';

export const makeRequest = (options, req) => {
  var options = {
    url: TYPI_URL + options.path,
    method: options.method || 'GET',
    headers:  {
      "Content-type": "application/json; charset=UTF-8"
    },
    form: req && JSON.stringify(req.body) || {}
  };
  return new Promise((resolve, reject) => {
    request(options, (err, res, body) => {
        if (err) {
          console.log(err);
          reject(err);
        }
        console.log('response.statusCode : ' + res.statusCode);
        resolve(JSON.parse(body));
      })
    }   
  );
}

const divideRandomly = (total, count) => {
  let remaining = total;
  let parts = [];

  for (var i in count) {
    if (collection.length >= total)
      continue;

    remaining = total - collection.length;
    let n = Math.round(Math.random() * remaining);
    if (i == count) {
      n = remaining;
    }
    console.log('n ' + n);
    parts.push(n);
  }
  return parts;
}

export const getTypiCodeCollection = () => {
  const counts = divideRandomly(30, 3);
  const posts = makeRequest({path: '/posts'}).then(data => ({ posts: data }));
  const albums = makeRequest({path: '/albums'}).then(data => ({ albums: data }));
  const users = makeRequest({path: '/users'}).then(data => ({ users: data }));

  return Promise.all([posts, albums, users]);
}