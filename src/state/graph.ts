import { GetState, SetState, StateCreator, StoreApi, create } from "zustand"
import { Edge } from "../models/edge"
import { Vertex, distanceBetweenPoints } from "../models/vertex"

import { Eulerian, isEulerian } from "../math/eulerian"
import { Hamiltonian, isHamiltonian } from "../math/hamiltonian"
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
  hamiltonian?: Hamiltonian
  eulerian?: Eulerian
}

type Middleware<S> = (
  config: StateCreator<S>
) => (set: SetState<S>, get: GetState<S>, api: StoreApi<S>) => S

const log: Middleware<GraphStore> = config => (set, get, api) =>
  config(
    args => {
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
  set(state => ({
    eulerian: undefined,
    hamiltonian: undefined,
  }))

  const { vertices, edges } = get()

  const eulerian = isEulerian(vertices, edges)
  set({ eulerian })

  const hamiltonian = isHamiltonian(vertices, edges)
  set({ hamiltonian })

  console.timeEnd("graph properties calculation time")
}

export const useGraphStore = create<GraphStore>(
  log((set, get) => ({
    vertices: [],
    edges: [],
    // mutating methods
    addVert(visual_x, visual_y) {
      set(state => {
        state.vertices.push(new Vertex(visual_x, visual_y))
        return { vertices: state.vertices }
      })

      calculateGraphProperties(set, get)
    },
    addEdge(i1, i2) {
      if (!Number.isInteger(i1) || !Number.isInteger(i2)) throw TypeError()
      if (i1 < 0 || i2 < 0) throw RangeError()
      set(state => {
        state.edges.push(new Edge(i1, i2))
        return { edges: state.edges }
      })

      calculateGraphProperties(set, get)
    },
    removeEdge(index) {
      if (!Number.isInteger(index)) throw TypeError()
      if (index < 0) throw RangeError()

      set(state => {
        state.edges.popAt(index)
        return { edges: state.edges }
      })
      calculateGraphProperties(set, get)
    },
    removeVert(index) {
      set(state => {
        state.edges = state.edges.filter(e => e.a != index && e.b != index)
        for (let x of state.edges) {
          // remove item at index
          if (x.a >= index) x.a -= 1
          if (x.b >= index) x.b -= 1
        }
        state.vertices.popAt(index)
        return { vertices: state.vertices, edges: state.edges }
      })
      calculateGraphProperties(set, get)
    },
    moveVertex(index, newX, newY) {
      if (!Number.isInteger(index)) throw TypeError()
      if (index < 0) throw RangeError()
      set(state => {
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
      set(state => ({ selectedVert: vert }))
    },
    // CYCLES AND PATHS
    eulerian: Eulerian.not,
    hamiltonian: Hamiltonian.not,
  }))
)
