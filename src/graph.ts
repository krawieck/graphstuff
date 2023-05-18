import { create } from "zustand"

export class Vertex {
  constructor(public visualX: number, public visualY: number) {}

  toString() {
    return `${this.visualX}_${this.visualY}`
  }

  distanceTo(other: Vertex): number {
    const pow2 = (num: number) => num * num
    return Math.sqrt(
      pow2(this.visualX - other.visualX) + pow2(this.visualY - other.visualY)
    )
  }

  distanceToPoint(x: number, y: number): number {
    const pow2 = (num: number) => num * num
    return Math.sqrt(pow2(this.visualX - x) + pow2(this.visualY - y))
  }
}

export class Edge {
  constructor(public a: number, public b: number) {
    if (!Number.isInteger(b) || !Number.isInteger(b)) throw TypeError()
  }

  toString() {
    return `${this.a}_${this.b}`
  }
}

export interface GraphStore {
  vertices: Vertex[]
  edges: Edge[]
  distanceToClosestVertex(x: number, y: number): number
  addVert(visual_x: number, visual_y: number): void
  addEdge(i1: number, i2: number): void
  removeVert(index: number): void
  removeEdge(index: number): void
  moveVertex(index: number, newX: number, newY: number): void
  selectedVert: number | null
  setSelectedVert(vert: number | null): void
}

export const useGraphStore = create<GraphStore>((set, get) => ({
  vertices: [],
  edges: [],
  distanceToClosestVertex(x, y) {
    if (get().vertices.length == 0) return Number.POSITIVE_INFINITY

    // TODO: replace math.min with custom extension
    return Math.min(...get().vertices.map((e, i) => e.distanceToPoint(x, y)))
  },
  addVert(visual_x, visual_y) {
    set((state) => {
      state.vertices.push(new Vertex(visual_x, visual_y))
      return { vertices: state.vertices }
    })
  },
  addEdge(i1, i2) {
    if (!Number.isInteger(i1) || !Number.isInteger(i2)) throw TypeError()
    if (i1 < 0 || i2 < 0) throw RangeError()
    set((state) => {
      state.edges.push(new Edge(i1, i2))
      return { edges: state.edges }
    })
  },
  removeEdge(index) {
    if (!Number.isInteger(index)) throw TypeError()
    if (index < 0) throw RangeError()

    set((state) => {
      state.edges.splice(index, 1)
      return { edges: state.edges }
    })
  },
  removeVert(index) {
    set((state) => {
      state.edges.splice(index, 1)
      for (let x of state.edges) {
        // remove item at index
        if (x.a >= index) x.a -= 1
        if (x.b >= index) x.b -= 1
      }
      state.vertices.splice(index, 1)
      return { vertices: state.vertices, edges: state.edges }
    })
  },
  moveVertex(index, newX, newY) {
    if (!Number.isInteger(index)) throw TypeError()
    if (index < 0) throw RangeError()
    set((state) => {
      state.vertices[index].visualX = newX
      state.vertices[index].visualY = newY
      return { vertices: state.vertices }
    })
  },
  selectedVert: null,
  setSelectedVert(vert) {
    set((state) => ({ selectedVert: vert }))
  },
}))
