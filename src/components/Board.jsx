import React from 'react';
import './Board.css';

const Board = ({ board, validPositions, onClick }) => {
    return (
        <div className="board">
            {board.map((row, i) => (
                <div key={i} className="board-row">
                    {row.map((cell, j) => (
                        <div 
                            key={`${i}-${j}`} 
                            className={`cell ${validPositions[i][j] ? 'valid' : 'invalid'}`}
                            onClick={() => validPositions[i][j] && onClick(i, j)}
                        >
                            {cell && (
                                <div className={`piece player${cell}`} />
                            )}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Board; 