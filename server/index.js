const express = require('express');
const bodyParser = require('body-parser');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const config = require('../webpack.config.js');

const compiler = webpack(config);

const app = express();

app.use('/rooms/:id', express.static('../public'));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
}));

app.get('/rooms/:roomid/bookings', (req, res) => {
  res.send('test get successful');
});

app.post('/rooms/:roomid/bookings', (req, res) => {
  res.send('test post successful');
});

app.listen(3003, () => console.log('Listening on port 3003'));
