import { Tile } from "@/models/tile";
import { isNil } from "lodash";
import gameReducer, { initialState } from "@/reducer/game-reducer";
import { renderHook } from "@testing-library/react";
import { act, useReducer } from "react";
import {
  createGameWithTiles,
  defaultTiles,
} from "../../../../test-utils/test-helper";

describe("gameReducer", () => {
  //-------------------// CREATE TILE //------------------------

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

      act(() => {
        dispatch({
          type: "create_tile",
          tile,
        });
      });

      const [state] = result.current;

      expect(state.board[0][0]).toBeDefined();
      expect(Object.values(state.tiles)).toContainEqual(tile);
    });
  });

  //-------------------// MOVE UP //------------------------

  describe("move_up", () => {
    it("should move tiles to the top of the board", () => {
      const { result, dispatch } = createGameWithTiles(defaultTiles);

      const [stateBefore] = result.current;

      expect(isNil(stateBefore.board[0][0])).toBeTruthy();
      expect(isNil(stateBefore.board[0][1])).toBeTruthy();
      expect(typeof stateBefore.board[1][0]).toBe("string");
      expect(typeof stateBefore.board[3][1]).toBe("string");

      act(() => dispatch({ type: "move_up" }));

      const [stateAfter] = result.current;

      expect(typeof stateAfter.board[0][0]).toBe("string");
      expect(typeof stateAfter.board[0][1]).toBe("string");

      expect(isNil(stateAfter.board[1][0])).toBeTruthy();
      expect(isNil(stateAfter.board[3][1])).toBeTruthy();
    });
  });

  //-------------------// MOVE DOWN //------------------------

  describe("move_down", () => {
    it("should move tiles to the bottom of the board", () => {
      const { result, dispatch } = createGameWithTiles(defaultTiles);

      const [stateBefore] = result.current;

      expect(isNil(stateBefore.board[0][0])).toBeTruthy();
      expect(typeof stateBefore.board[1][0]).toBe("string");
      expect(typeof stateBefore.board[3][1]).toBe("string");

      act(() => dispatch({ type: "move_down" }));

      const [stateAfter] = result.current;

      expect(typeof stateAfter.board[3][0]).toBe("string");
      expect(typeof stateAfter.board[3][1]).toBe("string");

      expect(isNil(stateAfter.board[1][0])).toBeTruthy();
    });
  });

  //-------------------// MOVE LEFT //------------------------

  describe("move_left", () => {
    it("should move tiles to the left side of the board", () => {
      const { result, dispatch } = createGameWithTiles(defaultTiles);

      const [stateBefore] = result.current;

      expect(typeof stateBefore.board[1][0]).toBe("string");
      expect(typeof stateBefore.board[3][1]).toBe("string");

      act(() => dispatch({ type: "move_left" }));

      const [stateAfter] = result.current;

      expect(typeof stateAfter.board[1][0]).toBe("string");
      expect(typeof stateAfter.board[3][0]).toBe("string");

      expect(isNil(stateAfter.board[3][1])).toBeTruthy();
    });
  });

  //-------------------// MOVE RIGHT //------------------------

  describe("move_right", () => {
    it("should move tiles to the right side of the board", () => {
      const { result, dispatch } = createGameWithTiles(defaultTiles);

      const [stateBefore] = result.current;

      expect(isNil(stateBefore.board[1][3])).toBeTruthy();
      expect(isNil(stateBefore.board[3][3])).toBeTruthy();

      expect(typeof stateBefore.board[1][0]).toBe("string");
      expect(typeof stateBefore.board[3][1]).toBe("string");

      act(() => dispatch({ type: "move_right" }));

      const [stateAfter] = result.current;

      expect(typeof stateAfter.board[1][3]).toBe("string");
      expect(typeof stateAfter.board[3][3]).toBe("string");

      expect(isNil(stateAfter.board[1][0])).toBeTruthy();
      expect(isNil(stateAfter.board[3][1])).toBeTruthy();
    });
  });
});
