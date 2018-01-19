import express from 'express';
import {route} from './app/routes/index';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

route(app, {});
app.listen(3000, () => {
  console.log('From Izmit with love.');
})