import React, { useState } from "react";
import { useInterval } from "./useInterval";

type Dots = "." | ". ." | ". . .";

export function useWaitingDots(ms: number) {
  const [dots, setDots] = useState<Dots>(".");
  const [isWaiting, setIsWaiting] = useState(true);

  const getNewDots = (): Dots => {
    if (dots === ".") {
      return ". .";
    } else if (dots === ". .") {
      return ". . .";
    } else {
      return ".";
    }
  };

  useInterval(
    () => {
      setDots(getNewDots());
    },
    isWaiting ? ms : null
  );

  return { dots, isWaiting, setIsWaiting };
}
