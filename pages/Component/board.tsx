import styles from "@/styles/board.module.css";
import Tile from "./tile";
import { JSX, useEffect, useReducer, useRef } from "react";
import gameReducer, { initialState } from "@/reducer/game-reducer";
import { Tile as TileModel } from "@/models/tile";

export default function Board() {
  const [gameState, dispatch] = useReducer(gameReducer, initialState);
  const initialized = useRef(false);

  //-------------------// KEYBOARD EVENTS //------------------------

  const handleKeyDown = (e: KeyboardEvent) => {
    e.preventDefault();

    switch (e.code) {
      case "ArrowUp":
        dispatch({ type: "move_up" });
        break;

      case "ArrowDown":
        dispatch({ type: "move_down" });
        break;

      case "ArrowLeft":
        dispatch({ type: "move_left" });
        break;

      case "ArrowRight":
        dispatch({ type: "move_right" });
        break;
    }
  };

  //-------------------// RENDER GRID //------------------------

  const renderGrid = () => {
    const cells: JSX.Element[] = [];
    const totalCellsCount = 16;

    for (let index = 0; index < totalCellsCount; index += 1) {
      cells.push(<div className={styles.cell} key={index} />);
    }

    return cells;
  };

  //-------------------// RENDER TILES //------------------------

  const renderTiles = () => {
    return Object.values(gameState.tiles).map(
      (tile: TileModel, index: number) => {
        return <Tile key={`${index}`} {...tile} />;
      },
    );
  };

  //-------------------// INITIAL TILES //------------------------

  useEffect(() => {
    if (initialized.current === false) {
      dispatch({
        type: "create_tile",
        tile: { position: [0, 1], value: 2 },
      });

      dispatch({
        type: "create_tile",
        tile: { position: [0, 2], value: 2 },
      });

      initialized.current = true;
    }
  }, []);

  //-------------------// KEYBOARD LISTENER //------------------------

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  //-------------------// RENDER BOARD //------------------------

  return (
    <div className={styles.board}>
      <div className={styles.tilesContainer}>{renderTiles()}</div>

      <div className={styles.grid}>{renderGrid()}</div>
    </div>
  );
}
