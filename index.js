const express = require("express");
const products = require('./products_data.json');

const app = express();
const PORT = process.env.PORT || 8000;

// Serve images from public folder
app.use('/public', express.static('public'));

// Routes
app.get("/products", (req, res) => {
  return res.json(products);
});

app.get("/products/:id", (req, res) => {
  const id = Number(req.params.id);
  const product = products.agro_products.find((p) => p.id === id);
  return res.json(product);
});

app.listen(PORT, () => console.log(`Server Started at PORT: ${PORT}`));
