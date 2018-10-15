import React from 'react';

import classes from './Game.css';

const game = ( props ) => {

    let roundOutput = props.showRounds ?
                props.rounds.map(rnd => {
                    return <span 
                                style={{
                                    textTransform: 'capitalize',
                                    display: 'inline-block',
                                    margin: '0 8px',
                                    border: '1px solid #ccc',
                                    padding: '5px',
                                    width: '80%'
                                    }}
                key={rnd.nroRonda} > rnd: {rnd.nroRonda}&nbsp;&nbsp;&nbsp;
                                     p1/p2 : &nbsp;({rnd.objP1}&nbsp;vs&nbsp;{rnd.objP2})
                                     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                     won:&nbsp; ({rnd.result}) </span>;
                })
                : null;

    if (roundOutput) {
        roundOutput.sort((a, b) => a.key > b.key);
    }

    return (
        <div className={classes.Game}>
            <p>Date: {props.date}</p>
            <p>Player 1: {props.p1}</p>
            <p>Player 2: {props.p2}</p>
            <p>Emperor/Empress: <strong style={{marginLeft: '12px'}}> ¡¡ {props.winner} !!</strong></p>
            
            <div>
                {roundOutput}
            </div>

            <button className={classes.Rounds}
                onClick={props.clicked}>Rounds</button>
        </div>
    );
};

export default game;
