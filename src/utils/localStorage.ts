import { ref } from 'vue';

// 封装一个自定义 hook 来操作 localStorage
function useLocalStorage<T>(key: string, initialValue: T) {
  const storedValue = ref<T>(initialValue);

  // 从 localStorage 中获取初始值
  if (localStorage.getItem(key)) {
    storedValue.value = JSON.parse(localStorage.getItem(key)!);
  }

  // 更新 localStorage 中的值
  const setLocalStorage = (value: T) => {
    localStorage.setItem(key, JSON.stringify(value));
    storedValue.value = value;
  };

  // 清除 localStorage 中的值
  const clearLocalStorage = () => {
    localStorage.removeItem(key);
    storedValue.value = initialValue;
  };

  return { storedValue, setLocalStorage, clearLocalStorage };
}

export default useLocalStorage;
