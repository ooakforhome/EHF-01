import React, { Component}  from 'react';
import { Link } from 'react-router-dom';
import './core.css';


class Home extends Component {
	constructor(props) {
    super(props);
		this.state = {
			email: "LOGIN E-MAIL",
			password: "PASSWORD"
		};
		// this.handleInputChange = this.handleInputChange.bind(this);
		// this.handleSubmit = this.handleSubmit.bind(this);
	}

	// handleInputChange = e => {
	// 		e.preventDefault();
	// 		this.setState({
	// 			[e.target.name]: e.target.value
	// 		})
	// }
  //
	// handleSubmit = event => {
  //   event.preventDefault();
	// 	API.saveUser({
	// 		email: this.state.email,
	// 		password: this.state.password
	// 	})
	// 		.then(res => window.location('/products'))
	// 		.catch(err => console.log(err));
  // }

	render(){
  	return(
			<div className='fp_container'>
				<div className='login_block'>
					<div className="front_button">
						<Link to="/products/all">
							<img alt="front product" src="https://cdn0.iconfinder.com/data/icons/delivery-2-1/100/delivery-20-512.png" />
							<button>PRODUCTS</button>
						</Link>
					</div>
					<div className="front_button">
						<Link to="/newproduct">
							<img alt="front add" src="https://cdn3.iconfinder.com/data/icons/buttons/512/Icon_31-512.png" />
							<button>ADD PRODUCT</button>
						</Link>
					</div>
				</div>
			</div>
		)
	}
}

export default Home;
