import { useState, useEffect } from 'react';
import { saveToLocalStorage, loadFromLocalStorage } from '../utils/storage';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    const saved = loadFromLocalStorage(key);
    return saved !== null ? saved : initialValue;
  });

  useEffect(() => {
    saveToLocalStorage(key, value);
  }, [key, value]);

  return [value, setValue] as const;
}