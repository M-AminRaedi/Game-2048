import { useEffect, useRef, useState } from "react";

export default function usePreviousProps<T>(value: T) {
  const ref = useRef<T | undefined>(undefined);
  const [previous, setPrevious] = useState<T | undefined>(undefined);

  useEffect(() => {
    setPrevious(ref.current);
    ref.current = value;
  }, [value]);

  return previous;
}
