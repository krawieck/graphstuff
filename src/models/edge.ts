export class Edge {
  constructor(public a: number, public b: number) {
    if (!Number.isInteger(b) || !Number.isInteger(b)) throw TypeError()
  }

  toString() {
    return `${this.a}_${this.b}`
  }
}
