import React from 'react';
import Product from './Product';
import { products } from '../../seed';

class ProductList extends React.Component {
	state = {
		products: [],
	}

	componentDidMount() {
		this.setState({ products: products });
		// console.log(this.state.nums);
		// const nextNums = this.state.nums.concat([4, 5]);
		// console.log(nextNums);
		// console.log(this.state.nums);
	}

	handleProductUpVote = (productId) => {
		const nextProducts = this.state.products.map((product) => {
			if (product.id === productId) {
				return Object.assign({}, product, {
					votes: product.votes + 1,
				});
			} else {
				return product;
			}
		});
		this.setState({
			products: nextProducts,
		});	
	}

	render() {
		const list = this.state.products.sort( (a, b) => (
			b.votes - a.votes
		));
		const productComponents = list.map((product) => (
			<Product
				key={'product-' + product.id}
				id={product.id}
				title={product.title}
				description={product.description}
				url={product.url}
				votes={product.votes}
				submitterAvatarUrl={product.submitterAvatarUrl}
				productImageUrl={product.productImageUrl}
				onVote={this.handleProductUpVote}
			/>
		));
		return (
			<div className='ui unstackable items'>
				{productComponents}
			</div>
		);
	}
}

export default ProductList;