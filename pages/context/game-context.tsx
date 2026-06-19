import {
  PropsWithChildren,
  createContext,
  useEffect,
  useReducer,
  useMemo,
} from "react";
import { isNil, throttle } from "lodash";
import { Tile } from "../../models/tile";
import {
  mergeAnimationDuration,
  tileCountPerDimension,
  gameWinTileValue,
} from "@/constants";
import gameReducer, { initialState } from "@/reducer/game-reducer";

type MoveDirection = "move_up" | "move_down" | "move_left" | "move_right";

type GameContextType = {
  score: number;
  status: string;
  moveTiles: (type: MoveDirection) => void;
  getTiles: () => Tile[];
  startGame: () => void;
};

export const GameContext = createContext<GameContextType>({
  score: 0,
  status: "ongoing",
  moveTiles: () => {},
  getTiles: () => [],
  startGame: () => {},
});

export default function GameProvider({ children }: PropsWithChildren) {
  const [gameState, dispatch] = useReducer(gameReducer, initialState);

  // ---------------- EMPTY CELLS ----------------
  const getEmptyCells = () => {
    const results: [number, number][] = [];

    for (let x = 0; x < tileCountPerDimension; x++) {
      for (let y = 0; y < tileCountPerDimension; y++) {
        if (isNil(gameState.board[y][x])) {
          results.push([x, y]);
        }
      }
    }

    return results;
  };

  // ---------------- RANDOM TILE ----------------
  const appendRandomTile = () => {
    const emptyCells = getEmptyCells();

    if (!emptyCells.length) return;

    const cellIndex = Math.floor(Math.random() * emptyCells.length);

    dispatch({
      type: "create_tile",
      tile: {
        position: emptyCells[cellIndex],
        value: 2,
      },
    });
  };

  // ---------------- GET TILES ----------------
  const getTiles = () => {
    return gameState.tilesByIds.map((tileId) => gameState.tiles[tileId]);
  };

  // ---------------- MOVE (THROTTLED) ----------------
  const moveTiles = useMemo(
    () =>
      throttle(
        (type: MoveDirection) => {
          dispatch({ type });
        },
        mergeAnimationDuration * 1.05,
        { trailing: false },
      ),
    [dispatch],
  );

  // cleanup throttle
  useEffect(() => {
    return () => {
      moveTiles.cancel?.();
    };
  }, [moveTiles]);

  // ---------------- START GAME ----------------
  const startGame = () => {
    dispatch({ type: "reset_game" });

    dispatch({
      type: "create_tile",
      tile: { position: [0, 1], value: 2 },
    });

    dispatch({
      type: "create_tile",
      tile: { position: [0, 2], value: 2 },
    });
  };

  // ---------------- GAME STATE CHECK ----------------
  const checkGameState = () => {
    const isWon = Object.values(gameState.tiles).some(
      (t) => t.value === gameWinTileValue,
    );

    if (isWon) {
      dispatch({ type: "update_status", status: "won" });
      return;
    }

    const { tiles, board } = gameState;
    const maxIndex = tileCountPerDimension - 1;

    for (let x = 0; x < maxIndex; x++) {
      for (let y = 0; y < maxIndex; y++) {
        if (
          isNil(board[x][y]) ||
          isNil(board[x + 1][y]) ||
          isNil(board[x][y + 1])
        ) {
          return;
        }

        if (tiles[board[x][y]]?.value === tiles[board[x + 1][y]]?.value) {
          return;
        }

        if (tiles[board[x][y]]?.value === tiles[board[x][y + 1]]?.value) {
          return;
        }
      }
    }

    dispatch({ type: "update_status", status: "lost" });
  };

  // ---------------- EFFECTS ----------------
  useEffect(() => {
    if (!gameState.hasChanged) return;

    const id = setTimeout(() => {
      dispatch({ type: "clean_up" });
      appendRandomTile();
    }, mergeAnimationDuration);

    return () => clearTimeout(id);
  }, [gameState.hasChanged]);

  useEffect(() => {
    if (!gameState.hasChanged) {
      checkGameState();
    }
  }, [gameState.hasChanged]);

  // ---------------- PROVIDER ----------------
  return (
    <GameContext.Provider
      value={{
        score: gameState.score,
        status: gameState.status,
        getTiles,
        moveTiles,
        startGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}
