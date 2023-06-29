export class Queue<T> {
  items: T[] = []

  constructor(initial: T[] = []) {
    this.items.push(...initial)
  }

  empty() {
    return this.items.length === 0
  }

  dequeue() {
    return this.items.shift()
  }

  enqueue(item: T) {
    this.items.push(item)
  }

  first() {
    return this.items[this.items.length - 1]
  }

  toString() {
    return this.items.toString()
  }
}
