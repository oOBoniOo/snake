import { Point } from "../types/Point";
export const checkLimits = (position: Point) => {
  if (position.x < 26 && position.x > 0 && position.y < 26 && position.y > 0) {
    return true;
  }
  return false;
};
