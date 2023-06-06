import "../util"
import { Point } from "./point"

export class Vertex implements Point {
  constructor(
    /** visual X */
    public x: number,
    /** visual Y */
    public y: number
  ) {}

  toString() {
    return `${this.x}_${this.y}`
  }
}

export function distanceBetweenPoints(a: Point, b: Point) {
  return Math.sqrt(Math.pow2(a.x - b.x) + Math.pow2(a.y - b.y))
}
