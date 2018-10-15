import React, { Component } from 'react';

import Game from '../../components/Game/Game';
import Stats from '../../components/Stats/Stats';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import classes from './History.css'

class History extends Component {
    state = {
        games: [
            // { _id, fecha, player1, player2, winner, rounds [], showRounds}
        ],
        loading: true,
        limite: 10,
        emperors: [
            // { player: 'Marcos', score: 5 }
        ]
    }

    componentDidMount() {

        const query = `/juegos?desde=0&limite=${this.state.limite}`;
        console.log(query);

        axios.get(query)
            .then(res => {

                const fetchedGames = [];
                for (let key in res.data.juegos) {
                    fetchedGames.push({
                        ...res.data.juegos[key],
                        rounds: []
                    });
                }

                console.log(fetchedGames);
                const players = [];
                for (let i of fetchedGames) {

                    const index = players.findIndex(entry => (entry.player === i.winner));
                    if (index >= 0) {
                        players[index].score++;
                    }
                    else {
                        players.push({ player: i.winner, score: 1 });
                    }
                }

                this.setState({ loading: false, games: fetchedGames, emperors: players });
            })
            .catch(err => {
                this.setState({ loading: false });
            });
    }

    getGameRounds(gameID) {

        const objIndex = this.state.games.findIndex(game => game._id === gameID);

        const updatedGames = [...this.state.games];
        console.log(updatedGames);
        const gameLoaded = { ...updatedGames[objIndex] };

        if ( gameLoaded.rounds.length === 0 ) { // No rounds loaded
            
            const query = `/rondas/buscar/${gameID}`;
            axios.get(query)
                .then(res => {
    
                    const fetchedRounds = [];
                    for (let key in res.data.rondas) {
                        fetchedRounds.push({
                            ...res.data.rondas[key]
                        });
                    }
    
                    gameLoaded.rounds = fetchedRounds;
                    gameLoaded.showRounds = true;
    
                    updatedGames.splice(objIndex, 1, gameLoaded);
                    console.log("A VER A VER: " + updatedGames);
    
                    this.setState({ games: updatedGames });
                })
                .catch(err => {
                    this.setState({ loading: false });
                });
        }
        else {    // Already loaded, toggle show prop

            gameLoaded.showRounds = !gameLoaded.showRounds;
            updatedGames.splice(objIndex, 1, gameLoaded);

            console.log("A VER A VER: " + updatedGames);
            this.setState({ games: updatedGames });
        }

    }

    render() {

        return (
            <div className={classes.History}>
                <div className={classes.Games}>
                    {this.state.games.map(game => (
                        <Game
                            date={game.fecha}
                            p1={game.player1}
                            p2={game.player2}
                            rounds={game.rounds}
                            showRounds={game.showRounds}
                            winner={game.winner}
                            clicked={() => this.getGameRounds(game._id)} />
                    ))}

                    <button className={classes.plusButton}
                        onClick={() => { this.setState({ limite: this.state.limite + 5 }) }}>More</button>
                </div>

                <Stats tittle='Statistics'
                    firstCol='Emperor/Empress'
                    secCol='Score'
                    emperors={this.state.emperors} />
            </div>
        );
    }
}

export default withErrorHandler(History, axios);
