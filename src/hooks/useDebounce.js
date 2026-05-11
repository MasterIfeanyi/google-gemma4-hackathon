import { useState, useEffect, useRef } from 'react';

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const timerRef = useRef();

  useEffect(() => {
    // Reset the timer on each change
    timerRef.current = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cancel the timer on unmount or when value changes
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;