import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import ReactAux from '../../../hoc/ReactAux';
const lostyle ={
	'margin-bottom' : '32px'
};

const sideDrawer = (props) => {
	let attachedClasses = [classes.SideDrawer, classes.close];
	if(props.open) {
	 attachedClasses = [classes.SideDrawer,classes.open];	
	}
	return(
		<ReactAux>
		<Backdrop show={props.open} clicked={props.closed}/>
		<div className ={attachedClasses.join(' ')}>
			<Logo height = "11%"
			 style ={lostyle} />
			<nav>
				<NavigationItems />
			</nav>		
		</div>
		</ReactAux>
		);
	};
export default sideDrawer;