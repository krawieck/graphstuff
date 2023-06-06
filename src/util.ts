interface Math {
  /** num^2 */
  pow2(num: number): number
}

Math.pow2 = (num: number) => num * num

interface Array<T> {
  /** Math.min of list of elements */
  min(): T
  /** Math.max of list of elements */
  max(): T
  /** pops an element at [index] and returns it */
  popAt(index: number): void
}

Array.prototype.min = function () {
  return Math.min(...this)
}
Array.prototype.max = function () {
  return Math.max(...this)
}

Array.prototype.popAt = function (index) {
  return this.splice(index, 1)
}
