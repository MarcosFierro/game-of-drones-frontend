import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Modal from '../../components/UI/Modal/Modal';
import BattleConf from '../BattleConf/BattleConf';
import Aux from '../../hoc/Auxiliar';

import classes from './Start.css'


class Start extends Component {

    state = {
        isValid: false,
        player1: '',
        player2: '',
        config: this.props.config,
        configuring: false
    }

    inputChangedHandler = (event, inputId) => {

        const updatedForm = {...this.state };

        updatedForm[`player${inputId}`] = event.target.value;
        updatedForm.isValid = ((updatedForm.player1 !== '') && (updatedForm.player2 !== ''));

        this.setState(updatedForm);
    };

    submitHandler = (event) => {
        event.preventDefault();
        if ( this.state.player1 !== this.state.player2 )
            this.props.start(this.state.player1, this.state.player2, this.state.config);
        else
            alert("Names must be different");
    };

    configWeapons = () => {
        this.setState( { configuring: !this.state.configuring } );
    }

    configSubmitted = (conf) => {
        
        const updated = {...this.state};

        updated.config = conf;
        updated.configuring = !updated.configuring;
        this.setState(updated);
    }
    
    render() {

        const enterNames = (
            <div className={classes.Datos}>

                <h1 style={{ fontFamily: 'Aladin', fontSize: '40px' }}>Enter Player's Name</h1>
                <form className={classes.Form} onSubmit={this.submitHandler}>
                    
                    <div className={classes.Player}>
                        <div className={classes.Label}>Player 1</div>
                        <Input
                            key='1'
                            elementType='input'
                            elementConfig={{ type: 'text', placeholder: `enter name` }}
                            value={this.state.player1}
                            invalid={this.state.player1 === ''}
                            changed={(event) => this.inputChangedHandler(event, '1')} />
                    </div>
                    <div className={classes.Player}>
                        <div className={classes.Label}>Player 2</div>
                        <Input
                            key='2'
                            elementType='input'
                            elementConfig={{ type: 'text', placeholder: `enter name` }}
                            value={this.state.player2}
                            invalid={this.state.player2 === ''}
                            changed={(event) => this.inputChangedHandler(event, '2')} />
                    </div>

                    <button
                        className={[classes.StartButton, classes.greenButton].join(' ')}
                        disabled={!this.state.isValid}>START</button>
                </form>

                <button className={[classes.StartButton, classes.blueButton].join(' ')}
                        onClick={this.configWeapons}>WEAPONS</button>
            </div>
        );

        // const modal = 

        return (

            <Aux>
                <Modal show={this.state.configuring} modalClosed={this.configWeapons}>
                    <BattleConf config={this.state.config} cancel={this.configWeapons} submit={ (conf) => this.configSubmitted(conf) }/>
                </Modal>
                {enterNames}
            </Aux>
        )
    }

}


export default withRouter(Start);
