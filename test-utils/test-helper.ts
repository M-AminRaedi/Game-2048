import { Tile } from "@/models/tile";
import gameReducer, { initialState } from "@/reducer/game-reducer";
import { renderHook } from "@testing-library/react";
import { act, useReducer } from "react";
export const defaultTiles: Tile[] = [
  {
    position: [0, 1],
    value: 2,
  },
  {
    position: [1, 3],
    value: 2,
  },
];
export function createGameWithTiles(tiles: Tile[]) {
  const { result } = renderHook(() => useReducer(gameReducer, initialState));
  const [, dispatch] = result.current;

  act(() => {
    tiles.forEach((tile) => {
      dispatch({
        type: "create_tile",
        tile,
      });
    });
  });
  return {
    result,
    dispatch,
  };
}
