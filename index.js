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

// 🚨 UPDATED ROUTE TO SEARCH BY SLUG 🚨
app.get("/products/:slug", (req, res) => {
  const incomingSlug = req.params.slug; // This is the string, e.g., "high-quality-organic-fertilizer"

  // Function to convert a product name to the same slug format
  const getProductSlug = (name) => {
    return name.toLowerCase().replace(/\s+/g, "-");
  }
  
  // Find the product by matching the generated slug to the incoming URL slug
  const product = products.find((p) => getProductSlug(p.name) === incomingSlug);
  
  // Handle case where product is not found
  if (!product) {
      return res.status(404).json({ message: "Product not found by slug." });
  }

  return res.json(product);
});

app.listen(PORT, () => console.log(`Server Started at PORT: ${PORT}`));