const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

app.listen(port, () => {
  console.log('We live on ' + port);
});

app.all('/', (req, res) => {
  res.status(200).send('We are alive');
});

app.get('/products', (req, res) => {
  console.log('Request to /products');
  const products = [
    {
        id: 1,
        title: "Succulent",
        price: 15.3,
        description: "A simple cactus",
        rating: 4,
        img: "https://images-na.ssl-images-amazon.com/images/I/51IwmuOPQyL._SL1052_.jpg"
    },
    {
        id: 2,
        title: "Palm",
        price: 24.99,
        description: "A simple palm",
        rating: 5,
        img: "https://images.homedepot-static.com/productImages/67107669-aedd-415d-9929-c6b08df42cc7/svn/costa-farms-house-plants-10maj-64_1000.jpg"
    }];
  const result = JSON.stringify(products);
  res.status(200).send(result);
});

app.post('/products', (req, res) => {
  const body = req.body;
  if (body) {
    const order = JSON.parse(body.json);
    console.log('Received order:');
    for (item of order) {
      console.log('  Item ID ' + item[0] + ' quantity ' + item[1]);
    }
    res.send('ok');
  } else {
    res.status(400).send();
  }
});
