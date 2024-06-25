import { Edge } from "../models/edge"
import { Queue } from "../models/queue"
import { Vertex } from "../models/vertex"
import { toConnectedGraph } from "./utils"

export function findPath(
  vertices: Vertex[],
  edges: Edge[],
  root: number,
  target: number
): number[] | null {
  if (root === target) return []
  if (root < 0 || target < 0) return null
  if (root >= vertices.length || target >= vertices.length) return null

  const graph = toConnectedGraph(vertices, edges)

  let visitedNodes: number[] = []
  let visited: boolean[] = new Array(graph.length).fill(false)

  let q = new Queue<number>([root])
  visited[root] = true

  let found = false
  outsideLoop: while (!q.empty()) {
    const check = q.dequeue()!

    visitedNodes.push(check)

    for (const node of graph[check].out) {
      if (visited[node]) continue

      if (node === target) {
        found = true
        break outsideLoop
      }
      q.enqueue(node)
      visited[node] = true
    }
  }
  if (!found) return null

  let path: number[] = [target]
  let current = target
  while (current !== root) {
    current = visitedNodes.find(e => graph[current].in.includes(e))!
    path.push(current)
  }

  return path.reverse()
}
