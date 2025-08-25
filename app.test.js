import assert from 'node:assert';
import { safeDivide } from './app.js';

// should return the quotient when both numbers are valid
assert.strictEqual(safeDivide(6, 3), 2);

// should return NaN if any argument is not a number
assert.ok(Number.isNaN(safeDivide('a', 2)));

// should return 0 when divisor is 0
assert.strictEqual(safeDivide(5, 0), 0);

console.log('All tests passed');
