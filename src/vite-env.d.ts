/// <reference types="vite/client" />
declare interface Math {
  /** num^2 */
  pow2(num: number): number
}

declare interface Array<T> {
  /** Math.min of list of elements */
  min(): T
  /** Math.max of list of elements */
  max(): T
  /** pops an element at [index] and returns it */
  popAt(index: number): T
}
