import React,{Component} from 'react';

import ReactAux from '../../hoc/ReactAux';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import classes from './Layout.module.css'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component{

	state = {
		showSideDraw : true
	}

	sideDrawClosedHandler = () => {
		this.setState({showSideDraw : false});
	}
    sideDrawToggleHandler = () => {
      this.setState((prevState) => {
       return {showSideDraw: !prevState.showSideDraw };
      });
    }

	render() {
		return(
	<ReactAux>
		<Toolbar
		 drawerToggleClicked ={this.sideDrawToggleHandler}/>
		<SideDrawer open={this.state.showSideDraw} 
		closed={this.sideDrawClosedHandler} />
		<main className = {classes.Content}>
			{this.props.children}
		</main>
	</ReactAux>
	 );
    }
}

export default Layout;