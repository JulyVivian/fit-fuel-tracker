import { onUnmounted } from 'vue';

function useDebounce(func: Function, delay = 1000) {
  let timer: ReturnType<typeof setTimeout> | null = null;

  const debouncedFunction = (...args: any[]) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      func(...args);
      timer = null;
    }, delay);
  };

  onUnmounted(() => {
    if (timer) {
      clearTimeout(timer);
    }
  });

  return debouncedFunction;
}

export default useDebounce;
