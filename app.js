const express = require('express');
const ProductManager = require('./ProductManager');

const app = express();
const productManager = new ProductManager('./productos.json');

app.get('/products', async (req, res) => {
  try {
    const limit = req.query.limit;
    let products;
    if (limit) {
      products = await productManager.getProductsLimit(parseInt(limit));
    } else {
      products = await productManager.getAllProducts();
    }
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/products/:pid', async (req, res) => {
  try {
    const productId = parseInt(req.params.pid);
    const product = await productManager.getProductById(productId);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Producto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`El servidor se está ejecutando en el puerto ${PORT}`);
});