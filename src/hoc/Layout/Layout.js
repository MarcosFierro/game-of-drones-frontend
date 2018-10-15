import React from 'react';

import Aux from '../Auxiliar';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import classes from './Layout.css';


const layout = (props) => (

    <Aux>
        <Toolbar drawerToggleClicked={()=>{}} />
        <main className={classes.Content}>
            {props.children}
        </main>
    </Aux>
);

export default layout;
