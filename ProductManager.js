const fs = require('fs');

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  getAllProducts() {
    try {
      const products = fs.readFileSync(this.path, 'utf-8');
      return JSON.parse(products);
    } catch (error) {
      throw new Error('Error al leer el archivo de productos');
    }
  }

  getProductsLimit(limit) {
    try {
      const products = this.getAllProducts();
      return products.slice(0, limit);
    } catch (error) {
      throw new Error('Error al leer el archivo de productos');
    }
  }

  getProductById(productId) {
    try {
      const products = this.getAllProducts();
      return products.find(product => product.id === productId);
    } catch (error) {
      throw new Error('Error al leer el archivo de productos');
    }
  }
}

module.exports = ProductManager;