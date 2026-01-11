export const pipe = (value, ...fns) => fns.reduce((v, fn) => fn(v), value)
