import React from 'react';

import classes from './Stats.css';


const stats = (props) => {

    const scrs = props.scores ? props.scores.map(score => (
                                    <tr>
                                        <td>{score.round}</td>
                                        <td>{score.winner}</td>
                                    </tr>
                                )) : null;

    const emps = props.emperors ? props.emperors.map(emp => (
                                        <tr>
                                            <td>{emp.player}</td>
                                            <td>{emp.score}</td>
                                        </tr>
                                    )) : null

    return (

        <div className={classes.Stats}>
            
            <h2 style={{ fontFamily: 'Annie Use Your Telescope', fontSize: '35px' }}>{props.tittle}</h2>

            <table>
                <thead>
                    <tr>
                        <th>{props.firstCol}</th>
                        <th>{props.secCol}</th>
                    </tr>
                </thead>
                <tbody>
                    {scrs}
                    {emps}
                </tbody>
            </table>

        </div>
    )

}

export default stats;
