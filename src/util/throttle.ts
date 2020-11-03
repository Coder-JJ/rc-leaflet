export type Func<T = any> = (...args: any) => T

const throttle = (func: Func, wait: number): Func => {
  let prevCallTime: number | undefined
  return (...args: Parameters<Func>): ReturnType<Func> | void => {
    const now = new Date().getTime()
    if (prevCallTime && now - prevCallTime < wait) {
      return
    }
    prevCallTime = now
    return func(...args)
  }
}

export default throttle
