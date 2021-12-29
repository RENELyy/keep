/**
 * @description debounce 防抖函数
 */
const _debounce = (fn, wait = 17, immediate = false) => {
  let timer
  let result
  const _debounced = function () {
    const thisArgs = this
    const args = arguments
    if (timer) clearTimeout(timer)
    if (immediate && !timer) {
      timer = setTimeout(null, wait)
      result = fn.apply(thisArgs, args)
    } else {
      timer = setTimeout(() => {
        result = fn.apply(thisArgs, args)
        /**
         * 用户停止触发动作，间隔时间后，触发函数
         * 如果此处设置 timer = null 表明下次触发重新刷新了 immediate
         * 所以设置不设置看场景，看需要
         */
        timer = null
      }, wait)
    }

    return result
  }
  _debounced.cancel = function () {
    clearTimeout(timer)
    timer = null
  }

  return _debounced
}
