import React, { useState } from 'react';
import Board from './Board';
import Scoreboard from './Scoreboard';
import './Game.css';

const Game = () => {
    const SIZE = 7;
    const BINS = 6;

    const validPositions = [
        [1, 0, 0, 1, 0, 0, 1],
        [0, 1, 0, 1, 0, 1, 0],
        [0, 0, 1, 1, 1, 0, 0],
        [1, 1, 1, 0, 1, 1, 1],
        [0, 0, 1, 1, 1, 0, 0],
        [0, 1, 0, 1, 0, 1, 0],
        [1, 0, 0, 1, 0, 0, 1]
    ];

    const [board, setBoard] = useState(Array(SIZE).fill().map(() => 
        Array(SIZE).fill(null)));
    const [currentPlayer, setCurrentPlayer] = useState(1);
    const [player1Score, setPlayer1Score] = useState(0);
    const [player2Score, setPlayer2Score] = useState(0);
    const [player1Bins, setPlayer1Bins] = useState(BINS);
    const [player2Bins, setPlayer2Bins] = useState(BINS);
    const [gameOver, setGameOver] = useState(false);
    const [threes, setThrees] = useState([]);

    const handleClick = (row, col) => {
        if (gameOver || !validPositions[row][col] || board[row][col]) return;

        const newBoard = board.map(row => [...row]);
        newBoard[row][col] = currentPlayer;
        setBoard(newBoard);

        if (currentPlayer === 1) {
            setPlayer1Bins(prev => prev - 1);
            const score = checkThrees(newBoard, currentPlayer);
            if (score > 0) {
                setPlayer1Score(prev => prev + score);
                setPlayer2Bins(prev => prev - score);
            }
        } else {
            setPlayer2Bins(prev => prev - 1);
            const score = checkThrees(newBoard, currentPlayer);
            if (score > 0) {
                setPlayer2Score(prev => prev + score);
                setPlayer1Bins(prev => prev - score);
            }
        }

        setCurrentPlayer(currentPlayer === 1 ? 2 : 1);

        if (player1Bins <= 0 || player2Bins <= 0) {
            setGameOver(true);
        }
    };

    const checkThrees = (board, player) => {
        let score = 0;
        const lines = [];

        // Yatay kontrol
        for (let i = 0; i < SIZE; i++) {
            for (let j = 0; j < SIZE - 2; j++) {
                if (validPositions[i][j] && validPositions[i][j+1] && validPositions[i][j+2]) {
                    if (board[i][j] === player && 
                        board[i][j+1] === player && 
                        board[i][j+2] === player) {
                        const line = [[i,j], [i,j+1], [i,j+2]];
                        if (!threes.some(existing => 
                            JSON.stringify(existing) === JSON.stringify(line))) {
                            lines.push(line);
                            score++;
                        }
                    }
                }
            }
        }

        // Dikey kontrol
        for (let i = 0; i < SIZE - 2; i++) {
            for (let j = 0; j < SIZE; j++) {
                if (validPositions[i][j] && validPositions[i+1][j] && validPositions[i+2][j]) {
                    if (board[i][j] === player && 
                        board[i+1][j] === player && 
                        board[i+2][j] === player) {
                        const line = [[i,j], [i+1,j], [i+2,j]];
                        if (!threes.some(existing => 
                            JSON.stringify(existing) === JSON.stringify(line))) {
                            lines.push(line);
                            score++;
                        }
                    }
                }
            }
        }

        // Çapraz kontrol (sol üstten sağ alta)
        for (let i = 0; i < SIZE - 2; i++) {
            for (let j = 0; j < SIZE - 2; j++) {
                if (validPositions[i][j] && validPositions[i+1][j+1] && validPositions[i+2][j+2]) {
                    if (board[i][j] === player && 
                        board[i+1][j+1] === player && 
                        board[i+2][j+2] === player) {
                        const line = [[i,j], [i+1,j+1], [i+2,j+2]];
                        if (!threes.some(existing => 
                            JSON.stringify(existing) === JSON.stringify(line))) {
                            lines.push(line);
                            score++;
                        }
                    }
                }
            }
        }

        // Çapraz kontrol (sağ üstten sol alta)
        for (let i = 0; i < SIZE - 2; i++) {
            for (let j = 2; j < SIZE; j++) {
                if (validPositions[i][j] && validPositions[i+1][j-1] && validPositions[i+2][j-2]) {
                    if (board[i][j] === player && 
                        board[i+1][j-1] === player && 
                        board[i+2][j-2] === player) {
                        const line = [[i,j], [i+1,j-1], [i+2,j-2]];
                        if (!threes.some(existing => 
                            JSON.stringify(existing) === JSON.stringify(line))) {
                            lines.push(line);
                            score++;
                        }
                    }
                }
            }
        }

        if (lines.length > 0) {
            setThrees(prev => [...prev, ...lines]);
        }

        return score;
    };

    const resetGame = () => {
        setBoard(Array(SIZE).fill().map(() => Array(SIZE).fill(null)));
        setCurrentPlayer(1);
        setPlayer1Score(0);
        setPlayer2Score(0);
        setPlayer1Bins(BINS);
        setPlayer2Bins(BINS);
        setGameOver(false);
        setThrees([]);
    };

    return (
        <div className="game">
            <Scoreboard 
                player1Score={player1Score}
                player2Score={player2Score}
                player1Bins={player1Bins}
                player2Bins={player2Bins}
                currentPlayer={currentPlayer}
                gameOver={gameOver}
            />
            <Board 
                board={board}
                validPositions={validPositions}
                onClick={handleClick}
            />
            {gameOver && (
                <div className="game-over">
                    <h2>Game Over!</h2>
                    <p>{player1Score > player2Score ? 'Player 1 Wins!' : 
                        player2Score > player1Score ? 'Player 2 Wins!' : 'It\'s a tie!'}</p>
                    <button onClick={resetGame}>Play Again</button>
                </div>
            )}
        </div>
    );
};

export default Game; 