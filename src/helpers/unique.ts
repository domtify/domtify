/**
 * 返回数组去重后的新数组
 * @param array 要去重的数组
 * @returns 去重后的数组
 */
export const unique = <T>(array: T[]): T[] => Array.from(new Set(array))
