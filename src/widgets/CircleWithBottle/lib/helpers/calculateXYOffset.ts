export const calculateXYOffset = (radius: number, radian: number) => {
  return {
    xOffset: radius * Math.cos(radian),
    yOffset: radius * Math.sin(radian),
  };
};
