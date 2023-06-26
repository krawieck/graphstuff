import { Edge } from "../models/edge"
import { Vertex } from "../models/vertex"
import { ConnectedGraph, toConnectedGraph } from "./utils"

export enum Eulerian {
  /** eulerian graph */
  fully,
  /** semi-eulerian graph */
  semi,
  /** not eulerian */
  not,
}

/**
 * Checks if given graph is eulerian
 *
 * https://mathspace.co/textbooks/syllabuses/Syllabus-1030/topics/Topic-20297/subtopics/Subtopic-266708/
 *
 * eulerian:
 *  "A graph is Eulerian if all vertices have even degree."
 *
 * semi-eulerian:
 *  "A graph is semi-Eulerian if exactly two vertices have odd degree."
 *
 *
 * https://en.wikipedia.org/wiki/Eulerian_path#Properties
 *
 * Section: Properties
 * A directed graph has an Eulerian cycle if and only if every vertex has equal
 * in degree and out degree, and all of its vertices with nonzero degree belong
 * to a single strongly connected component. Equivalently, a directed graph has
 * an Eulerian cycle if and only if it can be decomposed into edge-disjoint
 * directed cycles and all of its vertices with nonzero degree belong to a
 * single strongly connected component.
 *
 * A directed graph has an Eulerian trail if and only if at most one vertex has
 * (out-degree) − (in-degree) = 1, at most one vertex has
 * (in-degree) − (out-degree) = 1, every other vertex has equal in-degree and
 * out-degree, and all of its vertices with nonzero degree belong to a single
 * connected component of the underlying undirected graph.
 */
export function isEulerian(vertices: Vertex[], edges: Edge[]): Eulerian {
  let graph = toConnectedGraph(vertices, edges)

  const odds: number[] = []
  for (let i = 0; i < graph.length; i++) {
    if (graph[i].in.length !== graph[i].out.length) {
      odds.push(i)
    }
  }

  switch (odds.length) {
    case 0: // ALL EVEN
      if (isStronglyConnected(graph)) {
        return Eulerian.fully
      } else {
        return Eulerian.not
      }

    case 1: // 1 ODD
      const odd = graph[odds[0]]

      if (
        Math.abs(odd.in.length - odd.out.length) === 1 &&
        isConnected(graph, odds[0] === 0 ? 1 : 0)
      ) {
        return Eulerian.semi
      } else {
        return Eulerian.not
      }

    case 2: // 2 ODDS
      const first = graph[odds[0]]
      const second = graph[odds[1]]

      if (
        Math.abs(first.in.length - first.out.length + (second.out.length - second.in.length)) === 2
      ) {
        return Eulerian.semi
      } else {
        return Eulerian.not
      }

    default: // >2 ODDS
      return Eulerian.not
  }
}

function isStronglyConnected(graph: ConnectedGraph, index: number = 0): boolean {
  let visited: boolean[] = Array(graph.length).fill(false)

  // traverse the graph with DFS
  function dfs(index: number, reverse: boolean = false) {
    if (visited[index]) return
    visited[index] = true

    if (reverse) {
      graph[index].in.map(e => dfs(e, true))
    } else {
      graph[index].out.map(e => dfs(e))
    }
  }

  dfs(index)

  if (visited.includes(false)) return false

  // check the inverse of the graph
  visited = visited.fill(false)
  dfs(index, true)

  if (visited.includes(false)) return false

  return true
}

function isConnected(graph: ConnectedGraph, index: number): boolean {
  let visited: boolean[] = Array(graph.length).fill(false)

  // traverse the graph with DFS
  function dfs(index: number) {
    if (visited[index]) return
    visited[index] = true

    graph[index].out.map(dfs)
  }

  dfs(index)

  return !visited.includes(false)
}
