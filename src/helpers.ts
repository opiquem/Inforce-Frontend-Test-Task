export function areNumbers(...values: (string)[]): boolean {
  const numericRegex = /^-?\d+(\.\d+)?$/;
  return values.every(value => typeof value === 'number' || (typeof value === 'string' && numericRegex.test(value)));
}

export function areWhiteSpaces(...values: string[]): boolean {
  return values.every(value => value.trim().length === 0);
}