import assert from 'node:assert';
import { createKeys } from './keys/createKeys.js';

const keys = createKeys();

// 1. assert there are 88 keys
assert.strictEqual(keys.length, 88);

// 2. assert number of white keys is 52
const whiteKeys = keys.filter(k => k.color === 'white');
assert.strictEqual(whiteKeys.length, 52);

// 3. assert number of black keys is 36
const blackKeys = keys.filter(k => k.color === 'black');
assert.strictEqual(blackKeys.length, 36);

// 4. assert C1 x < D1 x
const c1 = keys.find(k => k.note === 'C1');
const d1 = keys.find(k => k.note === 'D1');
assert.ok(c1 && d1);
assert.ok(c1.position.x < d1.position.x);

// 5. assert C1 y < D1 y
assert.ok(c1.position.y < d1.position.y);

// 6. assert no overlap between consecutive keys
for (let i = 0; i < keys.length - 1; i++) {
  const a = keys[i];
  const b = keys[i + 1];
  const rightA = a.position.x + a.width;
  assert.ok(rightA <= b.position.x, `Keys ${a.note} and ${b.note} overlap`);
}

console.log('Piano tests passed');
