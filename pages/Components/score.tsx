import styles from "../../styles/score.module.css";
import { useContext } from "react";
import { GameContext } from "../context/game-context";

export default function Score() {
  const { score } = useContext(GameContext);

  return (
    <div className={styles.score}>
      <span>Score : </span>
      <span>{score}</span>
    </div>
  );
}
