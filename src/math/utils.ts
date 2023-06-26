import { CIRCLE_RADIUS } from "../contants"
import { Edge } from "../models/edge"
import { Point, Vec2 } from "../models/point"
import { Vertex } from "../models/vertex"
import "../util"

export function isWithinCrircle(point: Point, circle: Point, radius: number): boolean {
  return Math.pow2(point.x - circle.x) + Math.pow2(point.y - circle.y) < Math.pow2(radius)
}

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

export function pointStickingOutBetweenPoints(
  a: Point,
  b: Point,
  howMuchStickingOut: number
): Point {
  const vecA = Vec2.fromPoint(a)
  const vecB = Vec2.fromPoint(b)

  const vecBminusA = vecB.subtract(vecA)

  const firstPart = vecA.add(vecB).div(2)
  const secondPart = vecBminusA.div(vecBminusA.len()).rotate90().times(howMuchStickingOut)
  return firstPart.add(secondPart)
}

export type ConnectedGraphElement = { in: number[]; out: number[] }
export type ConnectedGraph = Array<ConnectedGraphElement>

export function toConnectedGraph(vertices: Vertex[], edges: Edge[]): ConnectedGraph {
  // initial with empty arrays
  let verts: ConnectedGraph = Array(vertices.length)
    .fill(undefined)
    .map(e => ({ in: [], out: [] }))

  // connections
  for (const e of edges) {
    verts[e.a].out.push(e.b)
    verts[e.b].in.push(e.a)
  }

  return verts
}
