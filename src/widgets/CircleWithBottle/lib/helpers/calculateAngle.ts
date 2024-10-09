export const calculateAngle = (index: number, n: number) => {
  return index * (2 * Math.PI / n) - 0.5 * Math.PI;
};
