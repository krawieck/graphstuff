import { Edge } from "../models/edge"
import { Vertex } from "../models/vertex"
import "../util"
import { ConnectedGraph, toConnectedGraph } from "./utils"

export enum Hamiltonian {
  /** not hamiltonian graph */
  not,
  /** semi-hamiltonian graph */
  semi,
  /** hamiltonian graph */
  fully,
}

export function isHamiltonian(verts: Vertex[], edges: Edge[]) {
  return backtrackingHamiltonianCycle(toConnectedGraph(verts, edges))
}

function backtrackingHamiltonianCycle(graph: ConnectedGraph): Hamiltonian {
  if (graph.length === 0) return Hamiltonian.not

  let path: number[] = []
  let visited: boolean[] = Array(graph.length).fill(false)

  function dfs(index: number): Hamiltonian {
    visited[index] = true

    if (path.includes(index)) {
      if (path.length === graph.length) {
        if (path[0] === index) {
          return Hamiltonian.fully
        }
        return Hamiltonian.semi
      }
      return Hamiltonian.not
    }
    path.push(index)

    for (const vert of graph[index].out) {
      const result = dfs(vert)
      if (result !== Hamiltonian.not) return result
    }
    if (path.length === graph.length) {
      return Hamiltonian.semi
    }
    path.pop()

    return Hamiltonian.not
  }

  let startingIndex = 0
  while (startingIndex != -1) {
    const result = dfs(startingIndex)
    if (result != Hamiltonian.not || !visited.includes(false)) return result
    startingIndex = visited.findIndex(e => !e)
  }

  return Hamiltonian.not
}
