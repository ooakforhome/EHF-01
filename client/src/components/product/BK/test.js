import React, { Component } from "react";
import { connect } from 'react-redux';
import { fetchProducts } from '../../actions/product-action';
import { ProductsBox } from './parts/ProductsBox';
import Categories from './Categories';
import API from './api-product';
import { Link } from 'react-router-dom';
import './product.css';

//SPD to Products
class ProductsAll extends Component {
  constructor(props) {
    super(props);
    this.state = {limit: 100};

    this.handleChange = this.handleChange.bind(this);
  }

//mount Redux data info.
  componentWillMount() {
    this.props.fetchProducts(this.state.limit);
  }

  componentDidUpdate() {
    this.props.fetchProducts(this.state.limit);
  }

  handleClick=(e)=>{
      e.preventDefault();
        window.location ='/product/'+ e.target.value;
  }

  handleDelete=(e)=>{
    console.log("-----------------------");
    console.log(e.target.value);
    console.log("-----------------------");
    e.preventDefault();
    API.deleteProduct(e.target.value)
      window.location.reload();
  }

  // Categories link
  handleClickthenav = (e) => {
  e.preventDefault();
  const theName = e.target.id.split(' ').join(' ');
  console.log(theName)
  window.location = '/products/by/'+theName;
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({"limit": parseInt(event.target.value)});
  }

  render() {
    if(!this.props.newproducts){
      return "waiting for data";
    }

    const ProductList = ({products}) => (
      <div>
        {products.map((product, i) =>
          <ProductsBox key={i}
                  {...product}
                  handleClick={this.handleClick.bind(this)}
                  handleDelete={this.handleDelete.bind(this)}
                  />
        )}
      </div>
    )

    return(
      <div>
        <div className="category_nav">
          < Categories clickthenav = { this.handleClickthenav.bind(this) } />
        </div>
        <div className="products_box">
          <h1>Products ALL</h1>
          <Link to="/newproduct">
            <button>ADD PRODUCT</button>
          </Link>
            <button onClick={this.handleChange} name="limit" value="">ALL</button>
            <button onClick={this.handleChange} name="limit" value="10">10</button>
            <button onClick={this.handleChange} name="limit" value="20">20</button>
            <button onClick={this.handleChange} name="limit" value="30">30</button>
          <div>
            <ProductList products = {this.props.newproducts}/>
          </div>
        </div>
      </div>
    );
  }
}


const mapStateToProps = state => ({
  newproducts: state.newproducts.products
});

export default connect(mapStateToProps, { fetchProducts })(ProductsAll);
