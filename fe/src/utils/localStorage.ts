export const write = (key: string, value: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Error writing to localStorage:", error);
  }
};

export const setToken = (token: string) => {
  try {
    localStorage.setItem("token", String(token));
  } catch (error) {
    console.error("Error writing to localStorage:", error);
  }
};

export const read = (key: string) => {
  try {
    const storedValue = localStorage.getItem(key);

    if (storedValue != null) {
      try {
        return JSON.parse(storedValue);
      } catch (jsonError) {
        return storedValue;
      }
    }

    return null;
  } catch (error) {
    console.error("Error reading from localStorage:", error);
    return null;
  }
};

export const remove = (key: string) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error("Error removing from localStorage:", error);
  }
};

export const clear = () => {
  try {
    localStorage.clear();
  } catch (error) {
    console.error("Error clearing localStorage:", error);
  }
};
