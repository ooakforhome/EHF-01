import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

// Home page Link
import Home from './components/core/Home.js';

// component show products pages
import ProductsAll from './components/product/ProductsAll';
import ProductsByCategory from './components/product/ProductsByCategory';
import Product from './components/product/Product';
import NewProduct from './components/product/NewProduct';

const App = () =>
  <Router>
    <div>
        <Route exact path="/" component = { Home } />
        <Route path="/products/all" component = { ProductsAll } />
        <Route path="/products/all?limit=" component = { ProductsAll } />
        <Route path="/products/by/:Category_type" component = { ProductsByCategory } />
        <Route exact path="/product/:id" component = { Product } />
        <Route exact path="/newproduct" component = { NewProduct } />
    </div>
  </Router>;

export default App;
