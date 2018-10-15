import React, { Component } from 'react';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';

import classes from './RoundPanel.css';


class RoundPanel extends Component {

    state = {
    	objeto: this.props.moves[0].obj
    }

    selectChangedHandler = (event) => {
    	this.setState({objeto: event.target.value});
    };
    

    render () {
	    return (

	        <div>
				<div className={classes.Titles}>
					<h1 style={{ fontFamily: 'Aldrich', fontSize: '30px' }}>Round {this.props.round}</h1>
					<h2 style={{ fontFamily: 'Aldrich', fontSize: '22px' }}>{this.props.pname}'s turn</h2>
				</div>

	            <div>
	                <Input
	                    elementType='select'
	                    elementConfig={this.props.moves}
	                    value={this.state.objeto}
						changed={(event) => this.selectChangedHandler(event)}
						label='Select Move' />

					<Button btnType="Success"
							clicked={() => this.props.submited(this.state.objeto)}>OK</Button>
	            </div>
	        </div>
	    )
	}

}

export default RoundPanel;
