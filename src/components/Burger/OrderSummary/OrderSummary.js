import React from 'react';
import ReactAux from '../../../hoc/ReactAux';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
	const ingSummary = Object.keys(props.ingredients)
	.map(igKey => {
		return <li key={igKey}>
		<span style={{textTransform : 'capitalize'}}>{igKey}</span>:{props.ingredients[igKey]}
		</li>
	});
	return (
			<ReactAux>
				<h3>Your Order</h3>
				<p>Delicious burger with the following ingredients:</p>
				<ul>
					{ingSummary}
				</ul>
				<p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
				<p>Continue to checkout?</p>
				<Button btnType="Danger" clicked={props.purchaseCancel}>CANCEL</Button>
				<Button btnType="Success" clicked ={props.purchaseContinue}>CONTINUE</Button>
			</ReactAux>
		);
};

export default orderSummary;