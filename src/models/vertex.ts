import "../util"

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

  distanceTo(other: Vertex): number {
    return Math.sqrt(Math.pow2(this.x - other.x) + Math.pow2(this.y - other.y))
  }

  distanceToPoint(x: number, y: number): number {
    return Math.sqrt(Math.pow2(this.x - x) + Math.pow2(this.y - y))
  }
}
