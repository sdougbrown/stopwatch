import { useCallback, useState, useRef } from 'react';
import { formatTime as formatElapsedTime } from './format';
import './watch.scss';

export function Watch() {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);
  const elapsed = useRef<number>(0);
  const lapTotal = useRef<number>(0);
  const started = useRef<number | null>(null);
  const lastUpdate = useRef<number | null>(null);

  const updateElapsedTime = useCallback(() => {
    if (started.current === null || lastUpdate.current === null) {
      return;
    }
    const last = lastUpdate.current;
    const now = Date.now();
    setElapsedTime(elapsed.current = elapsed.current + (now - last));
    lastUpdate.current = now;
    requestAnimationFrame(updateElapsedTime);
  }, [elapsed, lastUpdate, setElapsedTime, started]);

  const onToggleStart = useCallback(() => {
    if (started.current === null) {
      started.current = lastUpdate.current = Date.now();
      setIsStarted(true);
      requestAnimationFrame(updateElapsedTime);
      return;
    }

    started.current = null;
    setIsStarted(false);

  }, [lastUpdate, setIsStarted, started, updateElapsedTime]);

  const onAddLap = useCallback(() => {
    const time = elapsed.current - lapTotal.current;
    lapTotal.current += time;
    setLaps(prevLaps => [...prevLaps, time]);
  }, [elapsed, lapTotal, setLaps]);

  const onReset = useCallback(() => {
    setElapsedTime(elapsed.current = 0);
    setLaps([]);
  }, [elapsed, setElapsedTime, setLaps]);

  const time = formatElapsedTime(elapsedTime)

  return (
    <div className="sw">
      <div className="sw__body">
        <div className="sw__timer">
          <span className={`sw-time${time.length > 8 ? ' sw-time--long' : ''}`}>
            {time}
          </span>
        </div>
        <div className="sw__btns">
          <button className={`sw-btn sw-btn--${isStarted ? 'stop' : 'start'}`} onClick={onToggleStart}>{isStarted ? 'Stop' : 'Start'}</button>
          <button className="sw-btn" disabled={!isStarted} onClick={onAddLap}>{'Lap'}</button>
          <button className="sw-btn" disabled={!isStarted && elapsedTime === 0} onClick={onReset}>{'Reset'}</button>
        </div>
      </div>
      <div className="sw__laps">
        <ul className="sw-laps">
          {laps.map((lap, i) => (
            <li key={`${i}|${lap}`}>
              {`Lap ${i + 1}: ${formatElapsedTime(lap)}`}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
