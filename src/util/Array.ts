export const distinct = <T = string | number>(a: T[], b: T[] = []): T[] => {
  const array = [...a, ...b]
  const cache = {}
  const result = []

  for (const el of array) {
    if (!cache[String(el)]) {
      result.push(el)
      cache[String(el)] = 1
    }
  }

  return result
}
