import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserPlus, Play, Eye, EyeOff, User, ArrowRight, RefreshCcw, XCircle, Users, Minus, Plus, Gamepad2, Trophy, Tv, Shuffle } from 'lucide-react';
import { WORD_LIST } from './data/words';
import { TEMATICAS, LISTA_TEMATICAS } from './data/wordlist_tematicas';

const App = () => {
    const [players, setPlayers] = useState([]);
    const [newPlayer, setNewPlayer] = useState('');
    const [gameState, setGameState] = useState('setup'); // setup, modeSelect, assignment, start
    const [gameData, setGameData] = useState(null);
    const [currentPlayerIdx, setCurrentPlayerIdx] = useState(0);
    const [isRevealed, setIsRevealed] = useState(false);
    const [numImpostors, setNumImpostors] = useState(1);
    
    // Nuevo: Modo de juego y temática
    const [gameMode, setGameMode] = useState('clasico'); // clasico, tematico
    const [selectedTematica, setSelectedTematica] = useState(null);
    
    // Sistema anti-repetición: guarda palabras usadas durante la sesión
    const usedWordsRef = useRef(new Set());

    // Calcula el máximo de impostores permitidos (máximo la mitad de jugadores - 1)
    const maxImpostors = Math.max(1, Math.floor(players.length / 2) - 1) || 1;

    const addPlayer = () => {
        if (newPlayer.trim() && !players.includes(newPlayer.trim())) {
            setPlayers([...players, newPlayer.trim()]);
            setNewPlayer('');
        }
    };

    const removePlayer = (name) => {
        setPlayers(players.filter(p => p !== name));
    };

    // Ir a la pantalla de selección de modo
    const goToModeSelect = () => {
        if (players.length < 3) return;
        setGameState('modeSelect');
    };

    // Seleccionar modo clásico
    const selectClassicMode = () => {
        setGameMode('clasico');
        setSelectedTematica(null);
        startGame('clasico', null);
    };

    // Seleccionar modo temático
    const selectTematicMode = (tematicaId) => {
        setGameMode('tematico');
        setSelectedTematica(tematicaId);
        startGame('tematico', tematicaId);
    };

    const startGame = (mode, tematicaId) => {
        if (players.length < 3) return;

        // Obtener la lista de palabras según el modo
        let wordList;
        if (mode === 'tematico' && tematicaId) {
            wordList = TEMATICAS[tematicaId].palabras;
        } else {
            wordList = WORD_LIST;
        }

        // Filtrar palabras ya usadas en esta sesión
        const availableWords = wordList.filter(w => !usedWordsRef.current.has(w.word));
        
        // Si no quedan palabras disponibles, reiniciar el registro
        if (availableWords.length === 0) {
            usedWordsRef.current.clear();
            availableWords.push(...wordList);
        }

        // Seleccionar palabra aleatoria de las disponibles
        const randomIndex = Math.floor(Math.random() * availableWords.length);
        const selectedWord = availableWords[randomIndex];
        
        // Marcar palabra como usada
        usedWordsRef.current.add(selectedWord.word);
        
        // Seleccionar múltiples impostores sin repetir
        const impostorIndices = [];
        const availableIndices = [...Array(players.length).keys()];
        const actualImpostors = Math.min(numImpostors, maxImpostors);
        
        for (let i = 0; i < actualImpostors; i++) {
            const randomIdx = Math.floor(Math.random() * availableIndices.length);
            impostorIndices.push(availableIndices[randomIdx]);
            availableIndices.splice(randomIdx, 1);
        }
        
        const startingPlayerIdx = Math.floor(Math.random() * players.length);

        const clues = selectedWord.clues || [selectedWord.clue];
        const randomClue = clues[Math.floor(Math.random() * clues.length)];

        setGameData({
            word: selectedWord.word,
            clue: randomClue,
            impostorIndices: impostorIndices,
            startingPlayer: players[startingPlayerIdx],
            isTematico: mode === 'tematico',
            tematicaNombre: mode === 'tematico' ? TEMATICAS[tematicaId].nombre : null
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
        setGameMode('clasico');
        setSelectedTematica(null);
    };

    // Volver a selección de modo para jugar otra partida rápida
    const playAgain = () => {
        setGameState('modeSelect');
        setGameData(null);
        setCurrentPlayerIdx(0);
        setIsRevealed(false);
    };

    // Funciones para ajustar número de impostores
    const incrementImpostors = () => {
        if (numImpostors < maxImpostors) {
            setNumImpostors(numImpostors + 1);
        }
    };

    const decrementImpostors = () => {
        if (numImpostors > 1) {
            setNumImpostors(numImpostors - 1);
        }
    };

    // Verifica si el jugador actual es impostor
    const isCurrentPlayerImpostor = () => {
        return gameData?.impostorIndices?.includes(currentPlayerIdx) || false;
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
                                <>
                                    <div className="impostor-selector" style={{ marginTop: '2rem', padding: '1rem', background: 'rgba(168, 85, 247, 0.1)', borderRadius: '12px', border: '1px solid rgba(168, 85, 247, 0.3)' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                            <Users size={20} style={{ color: '#a855f7' }} />
                                            <span style={{ color: '#a855f7', fontWeight: '600' }}>Número de Impostores</span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
                                            <button 
                                                onClick={decrementImpostors} 
                                                className="secondary" 
                                                style={{ padding: '0.5rem', minWidth: '40px' }}
                                                disabled={numImpostors <= 1}
                                            >
                                                <Minus size={20} />
                                            </button>
                                            <span style={{ fontSize: '1.5rem', fontWeight: 'bold', minWidth: '40px', textAlign: 'center' }}>
                                                {numImpostors}
                                            </span>
                                            <button 
                                                onClick={incrementImpostors} 
                                                className="secondary" 
                                                style={{ padding: '0.5rem', minWidth: '40px' }}
                                                disabled={numImpostors >= maxImpostors}
                                            >
                                                <Plus size={20} />
                                            </button>
                                        </div>
                                        <p style={{ fontSize: '0.75rem', opacity: 0.6, marginTop: '0.5rem' }}>
                                            Máximo {maxImpostors} impostor{maxImpostors > 1 ? 'es' : ''} para {players.length} jugadores
                                        </p>
                                    </div>
                                    <button onClick={goToModeSelect} style={{ width: '100%', marginTop: '1rem' }}>
                                        <Play size={20} style={{ marginRight: '8px' }} />
                                        Empezar Juego
                                    </button>
                                </>
                            )}
                            {players.length < 3 && (
                                <p style={{ fontSize: '0.9rem', opacity: 0.5, marginTop: '1rem' }}>
                                    Mínimo 3 jugadores para empezar
                                </p>
                            )}
                        </div>
                    </motion.div>
                )}

                {gameState === 'modeSelect' && (
                    <motion.div
                        key="modeSelect"
                        variants={screenVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                    >
                        <h1>ELIGE MODO</h1>
                        <div className="card">
                            <button 
                                onClick={selectClassicMode} 
                                style={{ width: '100%', marginBottom: '1rem', padding: '1.5rem' }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
                                    <Shuffle size={24} />
                                    <span style={{ fontSize: '1.1rem' }}>Modo Clásico</span>
                                </div>
                                <p style={{ fontSize: '0.8rem', opacity: 0.7, marginTop: '0.5rem', fontWeight: 'normal' }}>
                                    Palabra aleatoria · Impostor ve una pista
                                </p>
                            </button>

                            <div style={{ 
                                marginTop: '1.5rem', 
                                padding: '1rem', 
                                background: 'rgba(168, 85, 247, 0.1)', 
                                borderRadius: '12px',
                                border: '1px solid rgba(168, 85, 247, 0.3)'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                                    <Trophy size={20} style={{ color: '#a855f7' }} />
                                    <span style={{ color: '#a855f7', fontWeight: '600' }}>Modo Temático</span>
                                </div>
                                <p style={{ fontSize: '0.75rem', opacity: 0.6, marginBottom: '1rem', textAlign: 'center' }}>
                                    El impostor NO recibe pista, solo sabe la temática
                                </p>
                                
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                    {LISTA_TEMATICAS.map((tematica) => (
                                        <button
                                            key={tematica.id}
                                            onClick={() => selectTematicMode(tematica.id)}
                                            className="secondary"
                                            style={{ 
                                                width: '100%', 
                                                padding: '1rem',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between'
                                            }}
                                        >
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                                <span style={{ fontSize: '1.5rem' }}>{tematica.icono}</span>
                                                <span>{tematica.nombre}</span>
                                            </div>
                                            <span style={{ fontSize: '0.75rem', opacity: 0.5 }}>
                                                {tematica.cantidadPalabras} palabras
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <button 
                                onClick={resetGame} 
                                className="secondary" 
                                style={{ width: '100%', marginTop: '1.5rem' }}
                            >
                                <ArrowRight size={18} style={{ marginRight: '8px', transform: 'rotate(180deg)' }} />
                                Volver
                            </button>
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
                                            {isCurrentPlayerImpostor() 
                                                ? (gameData.isTematico ? `¡ERES IMPOSTOR! (${gameData.tematicaNombre})` : "PISTA (ERES IMPOSTOR):")
                                                : "PALABRA SECRETA:"
                                            }
                                        </p>
                                        <div className={`secret-word ${isCurrentPlayerImpostor() ? 'impostor' : ''}`}>
                                            {isCurrentPlayerImpostor() 
                                                ? (gameData.isTematico ? "???" : gameData.clue)
                                                : gameData.word
                                            }
                                        </div>
                                        {isCurrentPlayerImpostor() && gameData.isTematico && (
                                            <p style={{ fontSize: '0.75rem', opacity: 0.5, marginTop: '0.5rem' }}>
                                                La palabra es sobre: {gameData.tematicaNombre}
                                            </p>
                                        )}
                                        {isCurrentPlayerImpostor() && (
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

                        <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
                            <button onClick={playAgain} style={{ width: '100%' }}>
                                <Play size={20} style={{ marginRight: '8px' }} />
                                Jugar Otra Vez
                            </button>
                            <button onClick={resetGame} className="secondary" style={{ width: '100%' }}>
                                <RefreshCcw size={20} style={{ marginRight: '8px' }} />
                                Cambiar Jugadores
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default App;
