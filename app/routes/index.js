import { getRequest, postRequest, makeRequest, getTypiCodeCollection } from './typiProxy';
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

const handleRequest = (options, req, res) => {
  makeRequest(options, req)
    .then(data => replyWithData(res, data))
    .catch(error => handleError(res, error));
}

export const route = (app, db) => {
  
  app.post('/posts', (req, res) => {
    var options = {
      method: 'POST',
      path: '/posts'
    };
    handleRequest(options, req, res);
  });

  app.put('/posts/:postId', (req, res) => {
    var options = {
      method: 'PUT',
      path: '/posts/' + req.params.postId
    };
    handleRequest(options, req, res);
  });

  app.delete('/posts/:postId', (req, res) => {
    var options = {
      method: 'DELETE',
      path: '/posts/' + req.params.postId
    }
    handleRequest(options, req, res);
  });

  app.get('/posts', (req, res) => handleGetRequest('/posts', res));
  app.get('/albums', (req, res) => handleGetRequest('/albums', res));
  app.get('/users', (req, res) => handleGetRequest('/users', res));

  routeCollection(app);
}