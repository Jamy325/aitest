const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

const NOTE_MAP = {
  'C': 0,
  'C#': 1,
  'D': 2,
  'D#': 3,
  'E': 4,
  'F': 5,
  'F#': 6,
  'G': 7,
  'G#': 8,
  'A': 9,
  'A#': 10,
  'B': 11
};

function noteToFrequency(note) {
  const match = note.match(/^([A-G]#?)(\d)$/);
  if (!match) return 440;
  const [, pitch, octave] = match;
  const n = NOTE_MAP[pitch] + (parseInt(octave, 10) - 4) * 12;
  return 440 * Math.pow(2, (n - 9) / 12);
}

export function playNote(note, duration = 0.5) {
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = 'sine';
  osc.frequency.value = noteToFrequency(note);
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  const now = audioCtx.currentTime;
  osc.start(now);
  gain.gain.setValueAtTime(1, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
  osc.stop(now + duration);
}
