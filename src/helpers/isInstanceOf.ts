export type Constructor<T> = new (...args: any[]) => T

export function isInstanceOf<T>(obj: unknown, ctor: Constructor<T>): obj is T {
  return obj instanceof ctor
}
