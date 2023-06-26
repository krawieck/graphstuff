import { Edge } from "../models/edge"
import { Vertex } from "../models/vertex"
import { backtrackingHamiltonianCycle } from "./hamiltonian"

/** https://pm2.phs.ed.ac.uk/~mcolombo/files/msc.pdf */
export const calculateHamiltonianCycle = backtrackingHamiltonianCycle

export function calculateHamiltonianPath(vertices: Vertex[], edges: Edge[]): boolean {
  return false
}
