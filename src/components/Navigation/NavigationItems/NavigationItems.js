import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = () => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" active exact>Game</NavigationItem>
        <NavigationItem link="/history">History</NavigationItem>
        {/* <NavigationItem link="/configs">Config</NavigationItem> */}
    </ul>
);

export default navigationItems;
