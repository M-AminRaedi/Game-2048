import { useMediaQuery } from "react-responsive";
import {
  containerWidthMobile,
  containerWidthDesktop,
  tileCountPerDimension,
} from "@/constants";
import { Tile as TileProps } from "@/models/tile";
import styles from "../../styles/tile.module.css";
import usePreviousProps from "@/hooks/use-previous-props";

export default function Tile({ position, value }: TileProps) {
  const isWideScreen = useMediaQuery({ minWidth: 512 });

  const containerWidth = isWideScreen
    ? containerWidthDesktop
    : containerWidthMobile;

  const previousValue = usePreviousProps<number>(value);
  const hasChanged = previousValue !== value;

  if (!position || position.length < 2) {
    return null;
  }

  const positionToPixels = (position: number) =>
    (position / tileCountPerDimension) * containerWidth;

  const style = {
    left: positionToPixels(position[0]),
    top: positionToPixels(position[1]),
    zIndex: value,
  };

  return (
    <div
      className={`
        ${styles.tile}
        ${styles[`tile${value}`]}
        ${hasChanged ? styles.pop : ""}
      `}
      style={style}
    >
      {value}
    </div>
  );
}
