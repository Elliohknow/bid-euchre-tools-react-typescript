import { useState } from "react";

export const useLocalStorage = () => {
  const [state, setState] = useState(false);
  if (!state) {
    setState(true);
  }
  return state;
};
