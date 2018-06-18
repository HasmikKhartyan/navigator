import config from './config';
import express from 'express';
import sassMiddleware from 'node-sass-middleware';
import path from 'path';
import bodyParser from 'body-parser';
import apiRouter from './api';
const server = express();

server.set('view engine', 'ejs');

server.use(sassMiddleware(
    {
        src:path.join(__dirname,'sass'),
        dest:path.join(__dirname,'public')
    }
));


server.get('/',function (req, res) {
    res.render('index');
});
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use('/api', apiRouter);
server.use(express.static('public'));
server.listen(config.port);
