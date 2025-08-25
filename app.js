export function safeDivide(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    return NaN;
  }
  if (b === 0) {
    return 0;
  }
  return a / b;
}

console.log('hello vite');
