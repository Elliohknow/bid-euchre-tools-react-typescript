import { useState } from "react";

export const useLocalStorage = (key: string, initialValue: string) => {
  // pass initial state function to useState so logic is only executed once
  // const [storedValue, setStoredValue] = useState(() => {
  //   try {
  //     // fish for the value by key
  //     const item = window.localStorage.getItem(key);
  //     // return object from json (if it exists) or return initialValue
  //     return item ? JSON.parse(item) : initialValue;
  //   } catch (error) {
  //     // if error, return initialValue
  //     console.log(error);
  //     return initialValue;
  //   }
  const [storedValue, setStoredValue] = useState(() => {
    const arr = localStorage.getItem(key);
    if (arr === null) {
      return initialValue;
    } else return JSON.parse(arr);
  });
  // });
  // wrapped useState setter function, let param be a function to mimic useState API
  const setValue = (value: any) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      // set state
      setStoredValue(valueToStore);
      // save it
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // throw new Error(`Unable to save item to localStorage: ${error}`);
      console.log(error);
    }
  };
  // useEffect(() => setValue(storedValue), [storedValue, setValue]);
  return [storedValue, setValue];
};
