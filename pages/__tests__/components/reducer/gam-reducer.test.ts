import { Tile } from "@/models/tile";
import { isNil } from "lodash";
import gameReducer, { initialState } from "@/reducer/game-reducer";
import { renderHook } from "@testing-library/react";
import { act, useReducer } from "react";

describe("gameReducer", () => {
  describe("create_tile", () => {
    it("should create a new tile", () => {
      const tile: Tile = {
        position: [0, 0],
        value: 2,
      };
      const { result } = renderHook(() =>
        useReducer(gameReducer, initialState),
      );
      const [, dispatch] = result.current;
      act(() => dispatch({ type: "create_tile", tile }));
      const [state] = result.current;
      expect(state.board[0][0]).toBeDefined();
      expect(Object.values(state.tiles)).toContainEqual(tile);
    });
  });

  //-------------------// MOVE UP //------------------------

  describe("move_up", () => {
    it("should move tiles to the top of the board", () => {
      const tile1: Tile = { position: [0, 1], value: 2 };
      const tile2: Tile = { position: [1, 3], value: 2 };
      const { result } = renderHook(() =>
        useReducer(gameReducer, initialState),
      );
      const [, dispatch] = result.current;
      act(() => {
        dispatch({ type: "create_tile", tile: tile1 });
        dispatch({ type: "create_tile", tile: tile2 });
      });
      act(() => dispatch({ type: "move_up" }));
      const [stateAfter] = result.current;
      expect(stateAfter.board[0][0]).toBeDefined();
      expect(stateAfter.board[0][1]).toBeDefined();
      expect(isNil(stateAfter.board[1][0])).toBeTruthy();
      expect(isNil(stateAfter.board[1][1])).toBeTruthy();
      expect(stateAfter.tiles[stateAfter.board[0][0]].position).toEqual([0, 0]);
      expect(stateAfter.tiles[stateAfter.board[0][1]].position).toEqual([1, 0]);
    });
  });

  //-------------------// MOVE DOWN //------------------------

  describe("move_Down", () => {
    it("should move tiles to the bottom of the board", () => {
      const tile1: Tile = { position: [0, 1], value: 2 };
      const tile2: Tile = { position: [1, 3], value: 2 };

      const { result } = renderHook(() =>
        useReducer(gameReducer, initialState),
      );
      const [, dispatch] = result.current;

      act(() => {
        dispatch({ type: "create_tile", tile: tile1 });
        dispatch({ type: "create_tile", tile: tile2 });
      });

      act(() => dispatch({ type: "move_Down" }));

      const [stateAfter] = result.current;
      expect(stateAfter.board[3][0]).toBeDefined();
      expect(stateAfter.board[3][1]).toBeDefined();
      expect(isNil(stateAfter.board[0][0])).toBeTruthy();
      expect(isNil(stateAfter.board[0][1])).toBeTruthy();
      expect(stateAfter.tiles[stateAfter.board[3][0]].position).toEqual([0, 3]);
      expect(stateAfter.tiles[stateAfter.board[3][1]].position).toEqual([1, 3]);
    });
  });
});
