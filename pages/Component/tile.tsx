import styles from "@/styles/tile.module.css";
import { Tile as TileProps } from "@/models/tile";
import {
  containerWidth,
  mergeAnimationDuration,
  tileCountPerDimension,
} from "@/constants";
import { useEffect, useState } from "react";
import usePreviousProps from "@/hooks/use-previous-props";

export default function Tile({ position, value }: TileProps) {
  const [scale, setScale] = useState(1);
  const previousValue = usePreviousProps(value);
  const hasChange = previousValue != value;

  useEffect(() => {
    if (hasChange) {
      setScale(1.1);
      setTimeout(() => setScale(1), mergeAnimationDuration);
    }
  }, [hasChange]);
  const positionToPixels = (position: number) => {
    return (position / tileCountPerDimension) * containerWidth;
  };
  const style = {
    left: positionToPixels(position[0]),
    top: positionToPixels(position[1]),
    transform: `scale(${scale})`,
    zIndex: value,
  };
  return (
    <div data-testid="tile" className={styles.tile} style={style}>
      {value}
    </div>
  );
}
