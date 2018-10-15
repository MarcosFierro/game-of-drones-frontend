import React from 'react';

import Input from '../Input/Input';
import classes from './BuildWeapon.css';

const buildWeapon = (props) => {

    return (
        <div className={classes.Weapon}>
            <p style={{ width: '40%'}} >{props.obj}</p>
            <p>Kills: </p>
            <Input
                key={props.obj}
                elementType='select'
                elementConfig={props.options}
                value={props.selected}
                changed={(event) => props.changed(event, props.obj)} />

            <button className={classes.deleteButton}
					onClick={props.delete}>x</button>
        </div>
    );

};

export default buildWeapon;
