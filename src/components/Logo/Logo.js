import React from 'react';

import GoD from '../../assets/images/logo.png';
import classes from './Logo.css';

const logo = (props) => (
    <div className={classes.godLogo} style={{height: props.height}}>
        <img src={GoD} alt="R,P,S" />
    </div>
);

export default logo;
