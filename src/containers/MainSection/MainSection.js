import React, { Component } from 'react';

import axios from '../../axios-orders';

import Start from '../Start/Start';
import PlayField from '../PlayField/PlayField';
import EndPage from '../../components/EndPage/EndPage';
import classes from './MainSection.css';

class MainSection extends Component {

    state = {
        p1Name: '',
        p2Name: '',
        winner: '',
        moves: [
            { obj: "paper", kills: "rock" },
            { obj: "rock", kills: "scissors" },
            { obj: "scissors", kills: "paper" }
        ],
        step: 1,
        loading: false
    }

    newGame = () => {
        const changedState = { ...this.state };

        changedState.winner = '';
        changedState.step = 1;

        this.setState(changedState);
    }

    hasWinner = (winner, rounds) => {
        const changedState = { ...this.state };

        changedState.winner = (winner === '1') ? changedState.p1Name : changedState.p2Name;
        changedState.step = 3;

        this.postGameHandler(changedState, rounds);
        this.setState(changedState);
    }

    namesEntered = (p1, p2, conf) => {
        const changedState = { ...this.state };

        changedState.p1Name = p1;
        changedState.p2Name = p2;
        changedState.moves = conf;
        changedState.step = 2;

        this.setState(changedState);
    }

    postGameHandler = (postingState, rounds) => {

        let d = new Date();
        const min = (d.getMinutes()<10?'0':'') + d.getMinutes();
        
        const game = {
            fecha: `${d.getHours()}:${min}/${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`,
            p1: postingState.p1Name,
            p2: postingState.p2Name,
            winner: postingState.winner
        }

        axios.post('/juegos', game)
            .then(response => {
                
                this.postRoundsHandler(response.data.juego._id, rounds)
                // this.setState( { loading: false } );
            })
            .catch(error => {
                this.setState({ loading: false });
            });

    }

    postRoundsHandler = (idJuego, rounds) => {

        console.log(rounds);
        console.log(idJuego);
        for (let round of rounds) {

            const rnd = {
                juego: idJuego,
                nroRonda: round.round,
                objP1: round.objP1,
                objP2: round.objP2,
                result: round.winner
            }

            axios.post('/rondas', rnd)
                .then(response => {

                    console.log(response);
                    // this.setState( { loading: false } );
                })
                .catch(error => {
                    this.setState({ loading: false });
                });

        }
    }

    cancelGame = () => {
        const changedState = { ...this.state };
        changedState.step = 1;
        this.setState(changedState);
    }

    render() {

        let endPage = (this.state.step === 3) ? <EndPage winner={this.state.winner}
            clicked={this.newGame} /> : null;

        let starting = (this.state.step === 1) ? <Start config={this.state.moves}
            start={(p1, p2, conf) => this.namesEntered(p1, p2, conf)} /> : null;
            
        let playField = (this.state.step === 2) ? <PlayField
            player1={this.state.p1Name}
            player2={this.state.p2Name}
            moves={this.state.moves}
            hasWinner={(winner, game) => this.hasWinner(winner, game)}
            cancel={this.cancelGame} /> : null;

        return (

            <div className={classes.Main}>
                {starting}
                {playField}
                {endPage}
            </div>
        )
    }

}


export default MainSection;
