import { Point } from "../types/Point";
export const checkLimits = (position: Point) => {
  if (position.x < 25 && position.x > 0 && position.y < 25 && position.y > 0) {
    return true;
  }
  return false;
};
