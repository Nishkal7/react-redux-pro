import React,{Component} from 'react';
import { connect } from 'react-redux';

import ReactAux from '../../hoc/ReactAux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as burgerBuilderActions from '../../store/actions/index';

class BurgerBuilder extends Component{
	state = {
		purchasing : false,
		loading: false
	}

	updatePurchase (ingredients) {
		const sum = Object.keys(ingredients)
		.map(igKey => {
			return ingredients[igKey];
		})
		.reduce((sum,el) => {
			return sum+el;
		},0);
		return sum>0;
	}

	purchaseHandler = () => {
		this.setState({purchasing: true});
	}

	purchaseCancel = () => {
		this.setState({purchasing : false});
	}
	purchaseContinue = () => {
		this.props.history.push('/checkout');
	 }
		//alert('You Continue');
		// const queryParams = [];
		// for(let i in this.state.ingredients){
		// 	queryParams.push(encodeURIComponent(i)+'='+ encodeURIComponent(this.state.ingredients[i]));	
		// }
		// queryParams.push('price='+ this.state.totalPrice);
		// const queryString = queryParams.join('&');
		

	render(){
		const disabledInfo = {
			...this.props.ings
		};
		for(let key in disabledInfo){
			disabledInfo[key] = disabledInfo[key] <= 0;
		}
		//{salad : true, bacon : false ....}
		let orderSummary = 
		<OrderSummary ingredients = {this.props.ings}
					purchaseCancel={this.purchaseCancel}	
					purchaseContinue={this.purchaseContinue}
					price={this.props.price}/>;
		if(this.state.loading){
				orderSummary = <Spinner />;
		}
		return (
				<ReactAux>
					<Modal show ={this.state.purchasing} modalClosed={this.purchaseCancel}>
						{orderSummary}
					</Modal>
					<Burger ingredients = {this.props.ings}/>
					<BuildControls 
					ingAdded = {this.props.onIngredientAdded}
					ingRemoved = {this.props.onIngredientRemoved}
					disabled = {disabledInfo}
					purchasable = {this.updatePurchase(this.props.ings)}
					ordered = {this.purchaseHandler}
					Price = {this.props.price}
					/>
				</ReactAux>
			);
	}
}

const mapStateToProps = state => {
	return {
		ings: state.ingredients,
		price: state.totalPrice
	};
};

const mapDispatchToProps = dispatch => {
	return{
		onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
		onIngredientRemoved: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios)); 