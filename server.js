//this is the server file//
const express = require('express');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 5000;

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.listen(PORT, () => console.log(`Server up and running on port ${PORT}`));

