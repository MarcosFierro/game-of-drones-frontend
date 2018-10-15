import React, { Component } from 'react';

import BuildWeapon from '../../components/UI/BuildWeapon/BuildWeapon';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';

import classes from './BattleConf.css';


class BattleConf extends Component {

	state = {
		config: this.props.config,
		addingNew: false,
		nwName: '',
		nwKills: ''
	}

	submited = () => {

		let consistent = true;
		let lenght = 0;

		for (let i of this.state.config) {
			consistent = this.state.config.find(move => (move.kills === i.obj))
			if (!consistent) {
				break;
			}
			lenght++;
		}

		if (consistent && lenght > 2) {
			this.props.submit(this.state.config)
		} else {
			alert("The current rules are not consistent.\nIf it is not modified, the game will have the default configuration ");
		}
	}

	selectChangedHandler = (event, selectID) => {

		const updated = { ...this.state };

		const index = updated.config.findIndex(move => (move.obj === selectID))

		updated.config[index].kills = event.target.value;
		this.setState(updated);
	};

	addNew = (id) => {
		if (this.state.addingNew && id === '+') {

			if ( this.state.nwName !== '' && this.state.nwKills !== '' ) {
				const updatedConfig = [...this.state.config];
				updatedConfig.push( {obj: this.state.nwName, kills: this.state.nwKills} );

				this.setState({ config: updatedConfig, nwName: '', nwKills: '' });
			}
			else {
				alert("Weapon's name or kills value are be empty")
			}
		} else {
			this.setState({ addingNew: !this.state.addingNew })
		}
	}

	deleteWeapon = (obj) => {

		const updatedConfig = [...this.state.config];
		const index = updatedConfig.findIndex(move => (move.obj === obj))
		
		updatedConfig.splice(index,1);

		console.log(updatedConfig);

		this.setState({ config: updatedConfig });
	}

	nwInputChanged = (event) => {
		this.setState({ nwName: event.target.value });
	}

	nwSelectChanged = (event) => {
		this.setState({ nwKills: event.target.value });
	}


	render() {

		const newWeapon = (<div className={classes.NewWeapon} >
								<p style={{ marginRight: '5px' }}> Weapon </p>
								<Input
									elementType='input'
									elementConfig={{ type: 'text', placeholder: `weapon's name` }}
									value={this.state.nwName}
									changed={(event) => this.nwInputChanged(event)} />
								<Input
									elementType='select'
									elementConfig={ [ ...this.state.config, {obj: '', kills: ''}]}
									value={this.state.nwKills}
									changed={(event) => this.nwSelectChanged(event)} />

							</div>
		);

		const eraseButton = (<button className={classes.minusButton}
									 onClick={ () => this.addNew('-') }>-</button> );

		return (

			<div className={classes.Config}>
				<div className={classes.Titles}>
					<h1>Configure the Battle !!</h1>
					<h2>Weapons:</h2>
				</div>

				<div className={classes.Settings}>

					{this.state.config.map(move => (
						<BuildWeapon
							obj={move.obj}
							options={this.state.config.filter(i => (i.obj !== move.obj))}
							selected={move.kills}
							changed={(event, id) => this.selectChangedHandler(event, id)}
							delete={() => this.deleteWeapon(move.obj)} />

					))}

					<button className={classes.plusButton}
						onClick={() => this.addNew('+')}>+</button>

					{this.state.addingNew ? eraseButton : null}

					<Button btnType="Success"
						clicked={this.submited}>SAVE</Button>

					<Button btnType="Danger"
						clicked={this.props.cancel}>CANCEL</Button>

				</div>

				{this.state.addingNew ? newWeapon : null}
			</div>
		)
	}

}

export default BattleConf;
