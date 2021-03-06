import React from 'react';

import classes from './Input.css';

const input = ( props ) => {
    
    let inputElement = null;
    const inputClasses = [classes.InputElement];

    if (props.invalid) {
        inputClasses.push(classes.Invalid);
    }

    switch ( props.elementType ) {
        case ( 'input' ):
            inputElement = <input
                                className={inputClasses.join(' ')}
                                {...props.elementConfig}
                                value={props.value}
                                onChange={props.changed} />;
            break;
            
        case ( 'select' ):
            inputElement = <select
                                className={inputClasses.join(' ')}
                                value={props.value}
                                onChange={props.changed}>
                                {props.elementConfig.map(move => (
                                    <option key={move.obj} value={move.obj}>
                                        {move.obj}
                                    </option>
                                ))}
                            </select>;
            break;

        default:
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    );

};

export default input;
