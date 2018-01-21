import https from 'https'

const callTypiCode = (path) => {
  
  const httpGetOptions = {
    host: 'jsonplaceholder.typicode.com',
    path: path,
    method: 'GET'
  };
  
  return new Promise((resolve, reject) => {
    https.get(httpGetOptions, (res) => {
      
      const statusCode = res.statusCode;
      const contentType = res.headers['content-type'];

      let error;
      if (statusCode !== 200) {
        error = new Error('Request Failed.\n' +
                          `Status Code: ${statusCode}`);
      } else if (!/^application\/json/.test(contentType)) {
        error = new Error('Invalid content-type.\n' +
                          `Expected application/json but received ${contentType}`);
      }
      if (error) {
        console.log(error.message);
        // consume response data to free up memory
        res.resume();
        reject(error);
      }

      res.setEncoding('utf8');
      let rawData = '';
      res.on('data', (chunk) => rawData += chunk);
      res.on('end', () => {
        try {
          const parsedData = JSON.parse(rawData);
          console.log('Got data from Typicode successfully.')
          resolve(parsedData);
        } catch (e) {
          console.log(e.message);
          reject(e);
        }
      });
    }).on('error', (e) => {
      console.log(`Got error: ${e.message}`);
      reject(e);
    });
  });
}

const handleError = (res, error) => {
  
  res.status(500);
  res.send({message: 'An error occurred ' + error.message});
}


const replyWithData = (res, data) => {

  res.status(200);
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.send(data);
}

const cherryPick = (data) => {

  let remaining = 30;
  const collection = [];
  
  for(var i in data){
    const arr = data[i];  
    if(collection.length >= size) 
      continue;
    
    remaining = size - collection.length;
    let n = Math.round(Math.random() * remaining);
    if(i == data.length - 1){
      n = remaining;
    }
    console.log('n ' + n);
    collection.push.apply(collection, arr.slice(0, n)); 
  }
  return collection;
}

export const getTypiCodeData = (path, res) => { 
  callTypiCode(path)
    .then(data => replyWithData(res, data))
    .catch(error => handleError(res, error));
}

export const getTypiCodeCollection = (paths, res) => {
  const promises = paths.map((path) => callTypiCode(path));
  Promise.all(promises)
    .then((data) => replyWithData(res, cherryPick(data)))
    .catch(error => handleError(res, error))
}