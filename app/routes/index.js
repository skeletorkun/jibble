import { getRequest, postRequest, getTypiCodeCollection } from './typiProxy';
import { routeCollection } from './collection';

export const handleError = (res, error) => {
  res.status(500);
  res.send({ message: 'An error occurred ' + error.message });
}

export const replyWithData = (res, data) => {
  res.status(200);
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.send(data);
}

const handleGetRequest = (path, res) => {
  getRequest(path)
    .then(data => replyWithData(res, data))
    .catch(error => handleError(res, error));
}

export const route = (app, db) => {
  app.post('/posts', (req, res) => {
    console.log(req.body);
    const post = {
      userId: 1,      
      title: "Orkun's awesome post",
      body: "here goes more gibberish"
    };

    postRequest('/posts', JSON.stringify(post))
      .then(data => replyWithData(res, data))
      .catch(error => handleError(res, error));
  });

  app.get('/posts', (req, res) => handleGetRequest('/posts', res));
  app.get('/albums', (req, res) => handleGetRequest('/albums', res));
  app.get('/users', (req, res) => handleGetRequest('/users', res));


  routeCollection(app);
}