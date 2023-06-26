import { Edge } from "../models/edge"
import { Vertex } from "../models/vertex"
import "../util"

export enum Hamiltonian {
  /** hamiltonian graph */
  fully,
  /** semi-hamiltonian graph */
  semi,
  /** not hamiltonian graph */
  not,
}

export type AdjacencyMatrix = number[][]

export function convertToAdjacencyMatrix(vertices: Vertex[], edges: Edge[]): AdjacencyMatrix {
  // create 2d array and fill it with zeroes
  const adjacencyMatrix: AdjacencyMatrix = Array(vertices.length)
    .fill(0)
    .map(() => Array(vertices.length).fill(0))

  // fill the array
  for (const edge of edges) {
    const { a, b } = edge
    adjacencyMatrix[a][b] = 1
  }

  return adjacencyMatrix
}

function isSafe(vertIndex: number, graph: AdjacencyMatrix, path: number[], pos: number): boolean {
  if (graph[path[pos - 1]][vertIndex] === 0) {
    return false
  }

  if (path.includes(vertIndex)) {
    return false
  }

  return true
}

function hamCycleUtil(graph: AdjacencyMatrix, path: number[], pos: number): boolean {
  if (pos === graph.length) {
    return graph[path[pos - 1]][path[0]] === 1
  }

  for (let v = 1; v < graph.length; v++) {
    if (isSafe(v, graph, path, pos)) {
      path[pos] = v

      if (hamCycleUtil(graph, path, pos + 1)) {
        return true
      }

      path[pos] = -1
    }
  }
  return false
}

export function backtrackingHamiltonianCycle(graph: AdjacencyMatrix): boolean {
  let path: number[] = []
  for (let i = 0; i < graph.length; i++) {
    path[i] = -1
  }

  path[0] = 0

  return hamCycleUtil(graph, path, 1)
}
