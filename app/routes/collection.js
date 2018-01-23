import { getTypiCodeCollection } from './typiProxy';
import { replyWithData, handleError } from './index';

const createCollection = (res) => {

    getTypiCodeCollection()
        .then(data => replyWithData(res, data))
        .catch(error => handleError(res, error));
}

export const routeCollection = (app) => {
    app.get('/collection', (req, res) => createCollection(res));
}