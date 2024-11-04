export function padDigit(num: number, z: number = 2): string {
  return (`00${num}`).slice(-z)
}

const cutToHours = 11;
const cutToMins = 14;

const msInHrs = 1000 * 60 * 60;

// "simple" conversion
export function formatTime(t: number) {
  return new Date(t).toISOString().slice(t / msInHrs > 1 ? cutToHours : cutToMins, -2);
}

// "fast" conversion
export function formatElapsedTime(t: number) {
  let s = t;
  const ms = t % 1000;
  s = (s - ms) / 1000;
  const sec = s % 60;
  s = (s - sec) / 60;
  const min = s % 60;;
  const hrs = (s - min) / 60;

  const stamp = `${padDigit(min % 60)}:${padDigit(sec % 60)}.${padDigit(ms, 3)}`;

  if (hrs < 1) {
    return stamp;
  }

  return `${Math.floor(hrs)}:${stamp}`;
}

