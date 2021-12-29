// ES2020 add
// 只有等到参数数组的所有 Promise 对象都发生状态变更（不管是fulfilled还是rejected），
// 返回的 Promise 对象才会发生状态变更
Promise.allSettled = function (promises) {
  if (promises.length === 0) return Promise.resolve([])

  _promises = promises.map(promise => {
    return promise instanceof Promise ? promise : Promise.resolve(promise)
  })

  let hasSettledCount = 0
  let result = []
  return new Promise((resolve, reject) => {
    _promises.forEach((promise, i) => {
      promise.then(
        value => {
          result[i] = {
            status: 'fulfilled',
            value,
          }
          hasSettledCount++
          hasSettledCount === _promises.length && resolve(result)
        },
        reason => {
          result[i] = {
            status: 'rejected',
            reason,
          }
          hasSettledCount++
          hasSettledCount === _promises.length && resolve(result)
        }
      )
    })
  })
}
