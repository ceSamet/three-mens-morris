import React from 'react';
import './Scoreboard.css';

const Scoreboard = ({ player1Score, player2Score, player1Bins, player2Bins, currentPlayer, gameOver }) => {
    return (
        <div className="scoreboard">
            <div className={`player ${currentPlayer === 1 ? 'active' : ''}`}>
                <h3>Player 1</h3>
                <p>Score: {player1Score}</p>
                <p>Bins: {player1Bins}</p>
            </div>
            <div className={`player ${currentPlayer === 2 ? 'active' : ''}`}>
                <h3>Player 2</h3>
                <p>Score: {player2Score}</p>
                <p>Bins: {player2Bins}</p>
            </div>
        </div>
    );
};

export default Scoreboard; 