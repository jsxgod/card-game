import React, { useState, useEffect } from "react";

const useWindowDimensions = () => {
  const [dimensions, setDimensions] = useState<{
    width: number;
    height: number;
  }>();

  const handleResize = () => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize, false);
    setDimensions({ width: window.innerWidth, height: window.innerHeight });
    return () => {
      window.removeEventListener("resize", handleResize, false);
    };
  }, []);

  return dimensions;
};

export default useWindowDimensions;
