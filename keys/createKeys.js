import { safeDivide } from '../app.js';

const NOTE_SEQUENCE = ['A','A#','B','C','C#','D','D#','E','F','F#','G','G#'];
const BLACK_NOTES = new Set(['A#','C#','D#','F#','G#']);

export function createKeys({ total = 88, keyWidth = 1, blackWidthFactor = 0.6, maxHeight = 10 } = {}) {
  const keys = [];
  let currentX = 0;
  for (let i = 0; i < total; i++) {
    const noteName = NOTE_SEQUENCE[i % 12];
    const octave = Math.floor((i + 9) / 12);
    const note = `${noteName}${octave}`;
    const isBlack = BLACK_NOTES.has(noteName);
    const width = isBlack ? keyWidth * blackWidthFactor : keyWidth;
    keys.push({
      note,
      color: isBlack ? 'black' : 'white',
      position: {
        x: currentX,
        y: safeDivide(i, total - 1) * maxHeight,
      },
      width,
    });
    currentX += width;
  }
  return keys;
}
