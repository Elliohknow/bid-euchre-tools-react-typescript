import { useState } from "react";
/**
 * Custom hook to retrieve and store a cookie
 * @param {String} key The key of the data we're storing
 * @param {String} initialValue The value to return if the cookie doesn't exist
 * @returns [cookie, updateCookie] Tuple consisting of the cookie and a function to update the cookie
 */
export function useCookie(key: string, initialValue: string): any[] {
  const getCookie = () => getCookieItem(key) || initialValue;
  const [cookie, setCookie] = useState(getCookie());

  const updateCookie = (value: string) => {
    setCookie(value);
    setCookieItem(key, value);
  };
  return [cookie, updateCookie];
}

function calcExpirationDate(): Date {
  const now = new Date();
  // set the time to be now + 30 days
  now.setTime(now.getTime() + 30 * 60 * 60 * 24 * 1000);
  return now;
}

function getCookieItem(key: string): string {
  return document.cookie.split("; ").reduce((total, currentCookie) => {
    const item = currentCookie.split("=");
    const storedKey = item[0];
    const storedValue = item[1];
    return key === storedKey ? decodeURIComponent(storedValue) : total;
  }, "");
}

function setCookieItem(key: string, value: string): void {
  const now = calcExpirationDate();
  document.cookie = `${key}=${value}; expires=${now.toUTCString()}; path=/`;
}

/**
 * Custom hook to retrieve and store a value in localStorage
 * @param {String} key The key of the data we're storing
 * @param {String} initialValue The value to return if the storedItem doesn't exist
 * @returns [storedValue, setValue] Tuple consisting of the cookie and a function to update the cookie
 */
export function useLocalStorage(key: string, initialValue: string): any[] {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value: any) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };

  return [storedValue, setValue];
}
