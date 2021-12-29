const isArray = maybeArray =>
  Array.isArray
    ? Array.isArray(maybeArray)
    : Object.prototype.toString.call(maybeArray) === '[object Array]'

/**
 * @description Promise.all() 方法用于将多个 Promise 实例包装成一个新的 Promise 实例
 * p 的状态由 p1, p2, p3 决定
 * 1. p1, p2, p3 都变成 fulfilled, p 才变成 fulfilled, p1, p2, p3 的返回值组成一个数组
 *    传递给 p 的回调函数
 * 2. 有一个被 reject, p 的状态就变成 rejected, 第一个被 reject 的实例的返回值传递给p的回调
 * @param {Array} promises
 * @returns Promise
 */
Promise.all = function (promises) {
  if (!isArray(promises)) {
    throw new TypeError('promise must be an array')
  }
  let result = []
  let count = 0
  return new Promise((resolve, reject) => {
    promises.forEach((promise, index) => {
      promise.then(
        res => {
          result[index] = res
          count++
          count === promises.length && resolve(result)
        },
        err => {
          reject(err)
        }
      )
    })
  })
}
