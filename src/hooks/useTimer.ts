import { useState, useEffect } from 'react';

interface UseTimerProps {
  duration: number;
  onComplete?: () => void;
}

export function useTimer({ duration, onComplete }: UseTimerProps) {
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    let timer: number;
    if (isActive && timeLeft > 0) {
      timer = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsActive(false);
            onComplete?.();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isActive, timeLeft, onComplete]);

  const start = () => setIsActive(true);
  const pause = () => setIsActive(false);
  const reset = () => {
    setIsActive(false);
    setTimeLeft(duration);
  };

  return {
    isActive,
    timeLeft,
    start,
    pause,
    reset
  };
}