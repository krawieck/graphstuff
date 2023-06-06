import { GetState, SetState, StateCreator, StoreApi, create } from "zustand"
import { Edge } from "../models/edge"
import { Vertex, distanceBetweenPoints } from "../models/vertex"

import { LOG } from "../contants"
import {
  calculateEulerianCycle,
  calculateEulerianPath,
  calculateHamiltonianCycle,
  calculateHamiltonianPath,
} from "../math/algorithms"
import { convertToAdjacencyMatrix } from "../math/hamiltonian"
import { Point } from "../models/point"
import "../util"

export interface GraphStore {
  vertices: Vertex[]
  edges: Edge[]
  distanceToClosestVertex(from: Point): number
  addVert(visual_x: number, visual_y: number): void
  addEdge(i1: number, i2: number): void
  removeVert(index: number): void
  removeEdge(index: number): void
  moveVertex(index: number, newX: number, newY: number): void
  selectedVert: number | null
  setSelectedVert(vert: number | null): void
  containsHamiltonianPath?: boolean
  containsHamiltonianCycle?: boolean
  containsEulerianPath?: boolean
  containsEulerianCycle?: boolean
}

type Middleware<S> = (
  config: StateCreator<S>
) => (set: SetState<S>, get: GetState<S>, api: StoreApi<S>) => S

const log: Middleware<GraphStore> = (config) => (set, get, api) =>
  config(
    (args) => {
      console.log("  applying", args)
      set(args)
      console.log("  new state", get())
    },
    get,
    api
  )

function calculateGraphProperties(
  set: (
    partial:
      | GraphStore
      | Partial<GraphStore>
      | ((state: GraphStore) => GraphStore | Partial<GraphStore>),
    replace?: boolean | undefined
  ) => void,
  get: () => GraphStore
) {
  console.time("graph properties calculation time")
  set((state) => ({
    containsEulerianCycle: undefined,
    containsEulerianPath: undefined,
    containsHamiltonianCycle: undefined,
    containsHamiltonianPath: undefined,
  }))

  const { vertices, edges } = get()
  const adjacencyMatrix = convertToAdjacencyMatrix(vertices, edges)

  const containsEulerianCycle = calculateEulerianCycle(vertices, edges)
  set({ containsEulerianCycle })

  // don't calculate path if already contains cycle
  if (containsEulerianCycle) {
    set({ containsEulerianPath: true })
  } else {
    set({ containsEulerianPath: calculateEulerianPath(vertices, edges) })
  }

  const containsHamiltonianCycle = calculateHamiltonianCycle(adjacencyMatrix)
  set({ containsHamiltonianCycle })
  // don't calculate path if already contains cycle
  if (containsHamiltonianCycle) {
    set({ containsHamiltonianPath: true })
  } else {
    set({ containsHamiltonianPath: calculateHamiltonianPath(vertices, edges) })
  }

  console.timeEnd("graph properties calculation time")
}

export const useGraphStore = create<GraphStore>(
  log((set, get) => ({
    vertices: [],
    edges: [],
    // mutating methods
    addVert(visual_x, visual_y) {
      set((state) => {
        state.vertices.push(new Vertex(visual_x, visual_y))
        return { vertices: state.vertices }
      })

      calculateGraphProperties(set, get)
    },
    addEdge(i1, i2) {
      if (!Number.isInteger(i1) || !Number.isInteger(i2)) throw TypeError()
      if (i1 < 0 || i2 < 0) throw RangeError()
      set((state) => {
        state.edges.push(new Edge(i1, i2))
        return { edges: state.edges }
      })

      calculateGraphProperties(set, get)
    },
    removeEdge(index) {
      if (!Number.isInteger(index)) throw TypeError()
      if (index < 0) throw RangeError()

      set((state) => {
        state.edges.popAt(index)
        return { edges: state.edges }
      })
    },
    removeVert(index) {
      set((state) => {
        state.edges = state.edges.filter((e) => e.a != index && e.b != index)
        for (let x of state.edges) {
          // remove item at index
          if (x.a >= index) x.a -= 1
          if (x.b >= index) x.b -= 1
        }
        state.vertices.popAt(index)
        return { vertices: state.vertices, edges: state.edges }
      })
    },
    moveVertex(index, newX, newY) {
      if (!Number.isInteger(index)) throw TypeError()
      if (index < 0) throw RangeError()
      set((state) => {
        state.vertices[index].x = newX
        state.vertices[index].y = newY
        return { vertices: state.vertices }
      })
    },
    // not mutating methods
    distanceToClosestVertex(from) {
      if (get().vertices.length == 0) return Number.POSITIVE_INFINITY

      return get()
        .vertices.map((to, i) => distanceBetweenPoints(from, to))
        .min()
    },
    // SELECTED VERT
    selectedVert: null,
    setSelectedVert(vert) {
      set((state) => ({ selectedVert: vert }))
    },
    // CYCLES AND PATHS
    containsHamiltonianPath: false,
    containsHamiltonianCycle: false,
    containsEulerianPath: false,
    containsEulerianCycle: false,
  }))
)
