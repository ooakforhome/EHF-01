import React, { Component } from "react";
import { connect } from 'react-redux';
import { fetchProducts } from '../../actions/product-action';
import { ProductsBox } from './parts/ProductsBox';
import Categories from './Categories';
import './product.css';

//SPD to Products
class AllProducts extends Component {

//mount Redux data info.
  componentWillMount() {
    this.props.fetchProducts();
  }

  handleClick=(e)=>{
      e.preventDefault();
        window.location ='/product/'+ e.target.value;
  }

  // Categories link
  handleClickthenav = (e) => {
  e.preventDefault();
  const theName = e.target.id.split(' ').join('%20');
  console.log(theName)
  window.location = '/products/'+theName;
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

export default connect(mapStateToProps, { fetchProducts })(AllProducts);
