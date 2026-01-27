export function toArray<T>(arrLike: ArrayLike<T> | Iterable<T>): T[] {
  return Array.from(arrLike)
}
