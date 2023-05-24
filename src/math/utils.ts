import { CIRCLE_RADIUS } from "../contants"
import "../util"

export function linearFuncBasedOn2Points(a: Point, b: Point) {
  return (x: number) =>
    ((b.y - a.y) / (b.x - a.x)) * x + (b.x * a.y - a.x * b.y) / (b.x - a.x)
}

export function angle(a: Point, b: Point) {
  return Math.atan((b.y - a.y) / (b.x - a.x))
}

export function distance(a: Point, b: Point) {
  return Math.sqrt(Math.pow2(b.x - a.x) + Math.pow2(b.y - a.y))
}

export function arrowStickingPoint(a: Point, b: Point): Point {
  const x = CIRCLE_RADIUS * Math.cos(angle(b, a))
  const y = CIRCLE_RADIUS * Math.sin(angle(b, a))
  return { x: b.x - x, y: b.y - y }
}
