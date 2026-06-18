import styles from "@/styles/board.module.css";
import Tile from "./tile";
import { JSX, useCallback, useContext, useEffect, useRef } from "react";
import { Tile as TileModel } from "@/models/tile";
import { mergeAnimationDuration } from "@/constants";
import { GameContext } from "../context/game-context";

export default function Board() {
  const { appendRandomTile, getTiles, dispatch } = useContext(GameContext);
  const initialized = useRef(false);

  //-------------------// KEYBOARD EVENTS //------------------------

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
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
      setTimeout(() => {
        dispatch({ type: "clean_up" });
        appendRandomTile();
      }, mergeAnimationDuration);
    },
    [appendRandomTile, dispatch],
  );
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
    const tiles = getTiles();
    console.log(tiles); // ← الان اجرا میشه
    return tiles.map((tile: TileModel) => {
      return <Tile key={`${tile.id}`} {...tile} />;
    });
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
  }, [dispatch]);

  //-------------------// KEYBOARD LISTENER //------------------------

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  //-------------------// RENDER BOARD //------------------------

  return (
    <div className={styles.board}>
      <div className={styles.tilesContainer}>{renderTiles()}</div>

      <div className={styles.grid}>{renderGrid()}</div>
    </div>
  );
}
