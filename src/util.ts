Math.pow2 = (num: number) => num * num

Array.prototype.min = function () {
  return Math.min(...this)
}
Array.prototype.max = function () {
  return Math.max(...this)
}

Array.prototype.popAt = function (index) {
  return this.splice(index, 1)
}
