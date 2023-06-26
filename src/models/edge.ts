import { Vertex } from "./vertex"

export class Edge {
  constructor(
    /** source */
    public a: number,
    /** target */
    public b: number
  ) {
    if (!Number.isInteger(b) || !Number.isInteger(b)) throw TypeError()
  }

  toString() {
    return `${this.a}_${this.b}`
  }
}

/**
 * input MUST be formatted correctly. NO SAFEGUARDS HERE
 *
 * example of input: "01 12 20"
 * output is graph with:
 * 0->1, 1->2, 2->0
 */
export function graphFromString(input: string): [Vertex[], Edge[]] {
  const parsed = input.split(" ").map(e => e.split("").map(e => parseInt(e))) as [number, number][]
  const edges = parsed.map(e => new Edge(...e))

  const numberOfVertices = parsed.map(e => e.max()).max() + 1
  const vertices = Array(numberOfVertices)
    .fill(0)
    .map(e => new Vertex(0, 0))

  return [vertices, edges]
}
