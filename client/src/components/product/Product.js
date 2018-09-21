import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import API from './api-product';
// import './product.css';

// Page and parts import
import { fetchOne } from '../../actions/product-action';
import EditProduct from './EditProduct';
import { DetailBox } from './parts/DetailBox';

class Product extends Component {
  constructor(props){
    super(props)
        this.state = {
        product: [],
        images: ''
      }
      this._handleImageChange = this._handleImageChange.bind(this);
      this._handleSubmit = this._handleSubmit.bind(this);
 }

 componentWillMount() {
   this.props.fetchOne(this.props.match.params.id);
 }

 componentDidMount =()=> {
   this.props.fetchOne(this.props.match.params.id)
 }


loadImage = () => {
  API.loadLastImg()
    .then( res =>
      this.setState({
        images: res.data[0].filename
      })
    ).then(info =>{
      API.updateProduct(this.props.match.params.id, {
        images: this.state.images
      })
        .then(res => window.location.reload())
    })
}

 onChanges = (e) => {
   this.setState({
     [e.target.name]: e.target.value
   })
 }

 _handleImageChange(e) {
   e.preventDefault();
     this.setState({
       file: e.target.files[0]
     });
 }

 _handleSubmit = e => {
   e.preventDefault();
   let formData = new FormData();
   formData.append("file", this.state.file);

   fetch('/api/uploadFile', {
     method: 'POST',
     body: formData
   }).then(res => res.json())
      .then(data => {
        if(data.success){
          alert('Upload Successfully!!')
          this.loadImage();
        } else {
          alert('Upload failed')
        }
      })

 };

  submitEdit = (e) => {
    e.preventDefault()
    API.updateProduct(this.props.match.params.id, {
      Product_Name: this.state.Product_Name,
      SKU: this.state.SKU,
      Materials: this.state.Materials,
      Color: this.state.Color,
      Packing_Carton_Width: this.state.Packing_Carton_Width,
      Packing_Carton_Height: this.state.Packing_Carton_Height,
      Packing_Carton_Depth: this.state.Packing_Carton_Depth,
      Actual_Product_Width: this.state.Actual_Product_Width,
      Actual_Product_Height: this.state.Actual_Product_Height,
      Actual_Product_Length: this.state.Actual_Product_Length,
      Feature_1: this.state.Feature_1,
      Feature_2: this.state.Feature_2,
      Feature_3: this.state.Feature_3,
      Feature_4: this.state.Feature_4,
      Feature_5: this.state.Feature_5,
      Feature_6: this.state.Feature_6,
      Feature_7: this.state.Feature_7,
      Feature_8: this.state.Feature_8,
      Feature_9: this.state.Feature_9
    })
      .then(res => window.location.reload())
  }


  render(){

    return (
      <div className="detailPage">
        <div className="item_container" style={{visibility: 'visible'}}>
          <div className="backNav">
              <Link to="/products/all">
                <button className="backButton">BACK TO PRODUCTS PAGE</button>
              </Link>
          </div>
          <div className="detailPage">
            <DetailBox item={this.props.newproduct}/>
          </div>
          <div className="updateBlock">
            <EditProduct
             submitEdit = {this.submitEdit}
             onChanges = {this.onChanges}
             _handleSubmit = {this._handleSubmit}
             _handleImageChange = {this._handleImageChange}
             />
          </div>
        </div>
      </div>
      );
    }
  }

  const mapStateToProps = state => ({
    newproduct: state.newproducts.product
  });

export default connect(mapStateToProps, { fetchOne } ) (Product);
