export function isParsableAsInteger(str: string) {
  const num = parseInt(str);
  return Number.isInteger(num);
}
