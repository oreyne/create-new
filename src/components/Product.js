import React from 'react';
// import logo from './../images/avatars/daniel.jpg';
// import prod from './../images/products/image-aqua.png';

class Product extends React.Component {
	render() {
		return (
			<div className='item'>
				<div className='image'>
					<img src={this.props.productImageUrl} alt='product_photo' />
				</div>
				<div className='middle aligned content'>
					<div className='header'>
						<a href='www.google.com'>
							<i className='large caret up icon' />
						</a>
						{this.props.votes}
					</div>
					<div className='description'>
						<a href={this.props.url}>
							{this.props.title}
						</a>
						<p>
							{this.props.description}
						</p>
					</div>
					<div className='extra'>
						<span>Submitted by:</span>
						<img className='ui avatar image' src={this.props.submitterAvatarUrl} alt='profile_photo' />
					</div>
				</div>
			</div>
		);
	}
}

export default Product;