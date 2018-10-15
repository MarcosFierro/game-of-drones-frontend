import React from 'react';

import classes from './EndPage.css';


const endPage = (props) => {

    return (

        <div className={classes.Datos}>
            <h1>We have a WINNER !!!</h1>
            <h3>{props.winner} is the new EMPEROR/EMPRESS!</h3>
            
            <button className={classes.playButton}
                    onClick={props.clicked} ><span>Play Again </span></button>

        </div>
    )

}

export default endPage;
