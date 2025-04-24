'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './Snake.module.css';

// Game constants
const GRID_SIZE = 20;
const CELL_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_DIRECTION = { x: 1, y: 0 };
const GAME_SPEED = 150;

export default function SnakeGame() {
    const [snake, setSnake] = useState(INITIAL_SNAKE);
    const [food, setFood] = useState({ x: 15, y: 15 });
    const [direction, setDirection] = useState(INITIAL_DIRECTION);
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const gameLoopRef = useRef(null);

    // Generate random food position
    const generateFood = () => {
        const newFood = {
            x: Math.floor(Math.random() * GRID_SIZE),
            y: Math.floor(Math.random() * GRID_SIZE)
        };

        // Make sure food doesn't appear on snake
        if (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y)) {
            return generateFood();
        }

        return newFood;
    };

    // Handle keyboard inputs
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (gameOver) return;

            switch (e.key) {
                case 'ArrowUp':
                    if (direction.y !== 1) setDirection({ x: 0, y: -1 });
                    break;
                case 'ArrowDown':
                    if (direction.y !== -1) setDirection({ x: 0, y: 1 });
                    break;
                case 'ArrowLeft':
                    if (direction.x !== 1) setDirection({ x: -1, y: 0 });
                    break;
                case 'ArrowRight':
                    if (direction.x !== -1) setDirection({ x: 1, y: 0 });
                    break;
                case ' ':
                    // Toggle pause
                    setIsPaused(prev => !prev);
                    break;
                case 'r':
                    // Restart game
                    if (gameOver) resetGame();
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [direction, gameOver]);

    // Game loop
    useEffect(() => {
        if (gameOver || isPaused) return;

        const moveSnake = () => {
            setSnake(prevSnake => {
                const newHead = {
                    x: (prevSnake[0].x + direction.x + GRID_SIZE) % GRID_SIZE,
                    y: (prevSnake[0].y + direction.y + GRID_SIZE) % GRID_SIZE
                };

                // Check for collision with self
                if (prevSnake.slice(1).some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
                    setGameOver(true);
                    return prevSnake;
                }

                // Check for collision with food
                if (newHead.x === food.x && newHead.y === food.y) {
                    setFood(generateFood());
                    setScore(prev => prev + 10);
                    return [newHead, ...prevSnake]; // Snake grows when eating food
                }

                return [newHead, ...prevSnake.slice(0, -1)]; // Normal movement
            });
        };

        gameLoopRef.current = setInterval(moveSnake, GAME_SPEED);
        return () => clearInterval(gameLoopRef.current);
    }, [direction, food, gameOver, isPaused]);

    // Reset game to initial state
    const resetGame = () => {
        setSnake(INITIAL_SNAKE);
        setDirection(INITIAL_DIRECTION);
        setFood(generateFood());
        setGameOver(false);
        setScore(0);
        setIsPaused(false);
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Snake Game</h1>
            <div className={styles.scoreBoard}>Score: {score}</div>

            <div
                className={styles.gameBoard}
                style={{
                    gridTemplateColumns: `repeat(${GRID_SIZE}, ${CELL_SIZE}px)`,
                    gridTemplateRows: `repeat(${GRID_SIZE}, ${CELL_SIZE}px)`
                }}
            >
                {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, index) => {
                    const x = index % GRID_SIZE;
                    const y = Math.floor(index / GRID_SIZE);

                    const isSnake = snake.some(segment => segment.x === x && segment.y === y);
                    const isFood = food.x === x && food.y === y;
                    const isHead = snake[0].x === x && snake[0].y === y;

                    return (
                        <div
                            key={index}
                            className={`${styles.cell} ${isSnake ? styles.snake : ''} ${isHead ? styles.head : ''} ${isFood ? styles.food : ''}`}
                        />
                    );
                })}
            </div>

            {gameOver && (
                <div className={styles.gameOver}>
                    <h2>Game Over!</h2>
                    <p>Your score: {score}</p>
                    <button onClick={resetGame}>Play Again</button>
                </div>
            )}

            <div className={styles.controls}>
                <p>Use arrow keys to move, space to pause, R to restart</p>
                <button onClick={() => setIsPaused(!isPaused)}>
                    {isPaused ? 'Resume' : 'Pause'}
                </button>
                <button onClick={resetGame}>Restart</button>
            </div>
        </div>
    );
} 