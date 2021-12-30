import { Point } from "../types/Point";
export const checkLimits = (position: Point) => {
	if (
		position.x < 1024 &&
		position.x > 0 &&
		position.y < 1024 &&
		position.y > 0
	) {
		return true;
	}
	return false;
};
