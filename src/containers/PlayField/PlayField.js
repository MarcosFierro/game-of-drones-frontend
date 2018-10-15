import React, { Component } from 'react';

import RoundPanel from '../RoundPanel/RoundPanel';
import Stats from '../../components/Stats/Stats';
import classes from './PlayField.css';


class PlayField extends Component {

    state = {
        ptsP1: 0,
        ptsP2: 0,
        round: 1,
        isNextP1: true,
        objP1: null,
        objP2: null,
        game: [
            // { round, objP1, objP2, winner }
        ]
    }

    objectEnteredHandler = (objeto) => {
        
        const updatedState = { ...this.state };

        if (this.state.isNextP1) {      // P1 turn
            updatedState.objP1 = objeto;
        }
        else {                         // P2 turn - End of round
            
            // fight
            let tie = true;
            for (let move of this.props.moves) {
                
                if (move.obj === updatedState.objP1 && move.kills === objeto) {  // P1 wins
                    updatedState.ptsP1++;
                    tie = false;
                    updatedState.game.push({ round: updatedState.round, objP1: updatedState.objP1, objP2: objeto ,winner: this.props.player1 });
                    break;
                }
                else if (move.obj === objeto && move.kills === updatedState.objP1) { // P2 wins
                    updatedState.ptsP2++;
                    tie = false;
                    updatedState.game.push({ round: updatedState.round, objP1: updatedState.objP1, objP2: objeto ,winner: this.props.player2 });
                    break;
                }
            }

            if (tie) {
                updatedState.game.push({ round: updatedState.round, objP1: updatedState.objP1, objP2: objeto ,winner: "Tie" });
            }

            if (updatedState.ptsP1 === 3) {
                this.props.hasWinner('1', updatedState.game);
            }
            if (updatedState.ptsP2 === 3) {
                this.props.hasWinner('2', updatedState.game);
            }

            updatedState.objP2 = objeto;
            updatedState.round++;

        }

        updatedState.isNextP1 = !updatedState.isNextP1;
        this.setState(updatedState);

    };
    
    render() {

        const pname = this.state.isNextP1 ? this.props.player1 : this.props.player2;

        return (
            <div className={classes.PlayField}>
                <RoundPanel round={this.state.round}
                            pname={pname}
                            moves={this.props.moves}
                            submited={(objeto) => this.objectEnteredHandler(objeto)}/>
                <Stats tittle='Score'
                        firstCol='Round'
                        secCol='Winner'
                        scores={this.state.game}/>
                <button className={classes.button}
                        onClick={this.props.cancel} >Back</button>
            </div>  
        )
    }

}


export default PlayField;
