const express = require("express");
const products = require('./products_data.json');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use('/public', express.static('public'));

app.get("/", (req, res) => {
  return res.status(200).json({ status: "ok", message: "Agrostar API is up and running!" });
});


app.get("/products", (req, res) => {
  return res.json(products);
});

app.get("/products/:id", (req, res) => {
  const id = Number(req.params.id);
  const product = products.find((p) => p.id === id);
  return res.json(product);
});

app.listen(PORT, () => console.log(`Server Started at PORT: ${PORT}`));
