import { getTypiCodeData, getTypiCodeCollection } from './typiProxy';

// const httpPostOptions = (postData) => {
//   return {
//     host: 'https://jsonplaceholder.typicode.com',
//     port: '80',
//     path: '/posts',
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded',
//       'Content-Length': postData.length
//     }
//   }
// };

const createCollection = (res) => {
  
};

const simpleRoute = (app, path) => {
  app.get(path, (req,res) => getTypiCodeData(path, res));
}

export const route = (app, db) => {
    
  app.post('/posts', (req, res) => {
    console.log(req.body);
    res.send('Hello');
  });
  
  simpleRoute(app, '/posts');
  simpleRoute(app, '/albums');
  simpleRoute(app, '/users');
  
  app.get('/collection', (req, res) => createCollection(res));
  
}