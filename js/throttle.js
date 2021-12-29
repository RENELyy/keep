/**
 * @description throttle 节流函数
 * @param {Function} fn
 * @param {Number} wait
 * @param {Object} options
 *  leading: 为是否在进入时立即执行一次
 *  trailing: 是否在最后额外触发一次
 *  ctx:
 */
export const _throttle = (
  fn,
  wait = 17,
  options = {
    leading: true,
    trailing: false,
    ctx: null,
  }
) => {
  let result
  let timer
  let previous = 0
  let called = false
  const _throttled = function () {
    let args = arguments
    let now = +new Date()
    if (!options.leading) {
      if (timer) return
      timer = setTimeout(() => {
        result = fn.apply(options.ctx, args)
        timer = null
      }, wait)
      // if (!called) {
      //   result = fn.apply(options.ctx, args)
      //   previous = now
      //   called = true
      // } else if (now - previous > wait) {
      //   previous = now
      //   result = fn.apply(options.ctx, args)
      // }
    } else if (now - previous > wait) {
      previous = now
      result = fn.apply(options.ctx, args)
    } else if (options.trailing) {
      clearTimeout(timer)
      timer = setTimeout(() => {
        result = fn.apply(options.ctx, args)
        timer = null
      }, wait)
    }

    return result
  }
  _throttled.cancel = function () {
    previous = 0
    clearTimeout(timer)
    timer = null
  }

  return _throttled
}
