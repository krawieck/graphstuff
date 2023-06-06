import { CIRCLE_RADIUS } from "../contants"
import { Point } from "../models/point"
import "../util"

export function calcAngle(a: Point, b: Point) {
  return Math.atan((b.y - a.y) / (b.x - a.x))
}

export function arrowStickingPoint(a: Point, b: Point): [Point, Point] {
  const angle = (() => {
    if (a.x > b.x) {
      return Math.PI + calcAngle(a, b)
    } else {
      return calcAngle(b, a)
    }
  })()

  const x = CIRCLE_RADIUS * Math.cos(angle)
  const y = CIRCLE_RADIUS * Math.sin(angle)

  return [
    { x: a.x + x, y: a.y + y },
    { x: b.x - x, y: b.y - y },
  ]
}

export function arrowStickingPoint(a: Point, b: Point): Point {
  const x = CIRCLE_RADIUS * Math.cos(angle(b, a))
  const y = CIRCLE_RADIUS * Math.sin(angle(b, a))
  return { x: b.x - x, y: b.y - y }
}
