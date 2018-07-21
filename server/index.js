const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(express.static('../public'));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.get('/room/:roomid/bookings', (req, res) => {
  res.send('test get successful');
});

app.post('/room/:roomid/bookings', (req, res) => {
  res.send('test post successful');
});

app.listen(3003, () => console.log('Listening on port 3003'));
