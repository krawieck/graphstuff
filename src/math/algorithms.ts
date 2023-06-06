import { Edge } from "../models/edge"
import { Vertex } from "../models/vertex"
import { backtrackingHamiltonianCycle } from "./hamiltonian"

/**
 * Find euler's circuit using Hierholzer's algorithm
 * https://www.geeksforgeeks.org/hierholzers-algorithm-directed-graph/
 */
export function calculateEulerianCycle(
  vertices: Vertex[],
  edges: Edge[]
): boolean {
  const edgeCount = new Map()

  let adjecencyList: number[][]
  return false
}

export function calculateEulerianPath(
  vertices: Vertex[],
  edges: Edge[]
): boolean {
  return false
}

/** https://pm2.phs.ed.ac.uk/~mcolombo/files/msc.pdf */
export const calculateHamiltonianCycle = backtrackingHamiltonianCycle

export function calculateHamiltonianPath(
  vertices: Vertex[],
  edges: Edge[]
): boolean {
  return false
}
