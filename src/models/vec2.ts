import { Point } from "./point"

/**
 * 2-dimensional vector
 */
export class Vec2 implements Point {
  constructor(public x: number, public y: number) {}

  static fromPoint(p: Point) {
    return new Vec2(p.x, p.y)
  }

  add(v: Vec2): Vec2 {
    return new Vec2(this.x + v.x, this.y + v.y)
  }

  subtract(v: Vec2): Vec2 {
    return new Vec2(this.x - v.x, this.y - v.y)
  }

  div(n: number): Vec2 {
    return new Vec2(this.x / n, this.y / n)
  }

  times(n: number): Vec2 {
    return new Vec2(this.x * n, this.y * n)
  }

  len(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y)
  }

  rotate90(): Vec2 {
    return new Vec2(-this.y, this.x)
  }
}
