import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserPlus, Play, Eye, EyeOff, User, ArrowRight, RefreshCcw, XCircle } from 'lucide-react';
import { WORD_LIST } from './data/words';

const App = () => {
    const [players, setPlayers] = useState([]);
    const [newPlayer, setNewPlayer] = useState('');
    const [gameState, setGameState] = useState('setup'); // setup, assignment, start
    const [gameData, setGameData] = useState(null);
    const [currentPlayerIdx, setCurrentPlayerIdx] = useState(0);
    const [isRevealed, setIsRevealed] = useState(false);

    const addPlayer = () => {
        if (newPlayer.trim() && !players.includes(newPlayer.trim())) {
            setPlayers([...players, newPlayer.trim()]);
            setNewPlayer('');
        }
    };

    const removePlayer = (name) => {
        setPlayers(players.filter(p => p !== name));
    };

    const startGame = () => {
        if (players.length < 3) return;

        const randomIndex = Math.floor(Math.random() * WORD_LIST.length);
        const selectedWord = WORD_LIST[randomIndex];
        const impostorIdx = Math.floor(Math.random() * players.length);
        const startingPlayerIdx = Math.floor(Math.random() * players.length);

        const clues = selectedWord.clues || [selectedWord.clue];
        const randomClue = clues[Math.floor(Math.random() * clues.length)];

        setGameData({
            word: selectedWord.word,
            clue: randomClue,
            impostorIdx: impostorIdx,
            startingPlayer: players[startingPlayerIdx]
        });
        setGameState('assignment');
        setCurrentPlayerIdx(0);
        setIsRevealed(false);
    };

    const nextPlayer = () => {
        if (currentPlayerIdx < players.length - 1) {
            setCurrentPlayerIdx(currentPlayerIdx + 1);
            setIsRevealed(false);
        } else {
            setGameState('start');
        }
    };

    const resetGame = () => {
        setGameState('setup');
        setGameData(null);
        setCurrentPlayerIdx(0);
        setIsRevealed(false);
    };

    const screenVariants = {
        initial: { opacity: 0, scale: 0.95, y: 20 },
        animate: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: [0.4, 0, 0.2, 1]
            }
        },
        exit: {
            opacity: 0,
            scale: 0.95,
            y: -20,
            transition: {
                duration: 0.3,
                ease: [0.4, 0, 1, 1]
            }
        }
    };

    return (
        <div className="app-container">
            <AnimatePresence mode="wait">
                {gameState === 'setup' && (
                    <motion.div
                        key="setup"
                        variants={screenVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                    >
                        <h1>EL IMPOSTOR</h1>
                        <div className="card">
                            <div className="input-group">
                                <input
                                    type="text"
                                    placeholder="Nombre del jugador..."
                                    value={newPlayer}
                                    onChange={(e) => setNewPlayer(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && addPlayer()}
                                />
                                <button onClick={addPlayer} className="secondary">
                                    <UserPlus size={20} style={{ marginRight: '8px' }} />
                                    Añadir Jugador
                                </button>
                            </div>

                            <div style={{ marginTop: '2rem', textAlign: 'left' }}>
                                {players.map((p) => (
                                    <div key={p} className="player-tag">
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <User size={16} style={{ marginRight: '8px', color: '#818cf8' }} />
                                            {p}
                                        </div>
                                        <XCircle
                                            size={18}
                                            onClick={() => removePlayer(p)}
                                            style={{ cursor: 'pointer', opacity: 0.6 }}
                                        />
                                    </div>
                                ))}
                            </div>

                            {players.length >= 3 && (
                                <button onClick={startGame} style={{ width: '100%', marginTop: '2rem' }}>
                                    <Play size={20} style={{ marginRight: '8px' }} />
                                    Empezar Juego
                                </button>
                            )}
                            {players.length < 3 && (
                                <p style={{ fontSize: '0.9rem', opacity: 0.5, marginTop: '1rem' }}>
                                    Mínimo 3 jugadores para empezar
                                </p>
                            )}
                        </div>
                    </motion.div>
                )}

                {gameState === 'assignment' && (
                    <motion.div
                        key="assignment"
                        variants={screenVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                    >
                        <h2 className="current-player-name">{players[currentPlayerIdx]}</h2>
                        <p style={{ opacity: 0.7, marginBottom: '2rem' }}>Es tu turno de ver la palabra</p>

                        <div className="card reveal-box" onClick={() => setIsRevealed(!isRevealed)}>
                            <AnimatePresence mode="wait">
                                {!isRevealed ? (
                                    <motion.div
                                        key="hidden"
                                        initial={{ scale: 0.9, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        exit={{ scale: 0.9, opacity: 0 }}
                                        className="tap-to-reveal"
                                    >
                                        <EyeOff size={48} />
                                        <span>Toca para revelar</span>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="revealed"
                                        initial={{ scale: 0.9, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        exit={{ scale: 0.9, opacity: 0 }}
                                    >
                                        <p style={{ fontSize: '0.9rem', opacity: 0.6, marginBottom: '0.5rem' }}>
                                            {currentPlayerIdx === gameData.impostorIdx ? "PISTA (ERES EL IMPOSTOR):" : "PALABRA SECRETA:"}
                                        </p>
                                        <div className={`secret-word ${currentPlayerIdx === gameData.impostorIdx ? 'impostor' : ''}`}>
                                            {currentPlayerIdx === gameData.impostorIdx ? gameData.clue : gameData.word}
                                        </div>
                                        {currentPlayerIdx === gameData.impostorIdx && (
                                            <div className="scan-line"></div>
                                        )}
                                        <p style={{ fontSize: '0.8rem', opacity: 0.5, marginTop: '1rem' }}>
                                            Toca para ocultar de nuevo
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {isRevealed && (
                            <motion.button
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                onClick={nextPlayer}
                                style={{ width: '100%' }}
                            >
                                Siguiente Jugador
                                <ArrowRight size={20} style={{ marginLeft: '8px' }} />
                            </motion.button>
                        )}
                    </motion.div>
                )}

                {gameState === 'start' && (
                    <motion.div
                        key="start"
                        variants={screenVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="start-turn-box"
                    >
                        <h1>¡A JUGAR!</h1>
                        <div className="card">
                            <p style={{ opacity: 0.8, fontSize: '1.2rem', marginBottom: '1rem' }}>El primer jugador en hablar es:</p>
                            <div className="starting-player">
                                {gameData.startingPlayer}
                            </div>
                            <p style={{ marginTop: '2rem', opacity: 0.6, fontSize: '0.9rem' }}>
                                Cada jugador dirá una palabra relacionada con lo que ha visto.
                                ¡Al final, encontrad al impostor!
                            </p>
                        </div>

                        <button onClick={resetGame} className="secondary" style={{ width: '100%' }}>
                            <RefreshCcw size={20} style={{ marginRight: '8px' }} />
                            Nueva Partida
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default App;
