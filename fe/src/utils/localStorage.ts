// Function to write data to localStorage
export const write = (key: string, value: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Error writing to localStorage:", error);
  }
};

export const setToken = (userName: string, password: string) => {
  try {
    localStorage.setItem("token", btoa(`${userName}:${password}`));
  } catch (error) {
    console.error("Error writing to localStorage:", error);
  }
};

export const read = (key: string) => {
  try {
    const storedValue = localStorage.getItem(key);

    // If the stored value is not null or undefined
    if (storedValue != null) {
      // Attempt to parse the JSON
      try {
        return JSON.parse(storedValue);
      } catch (jsonError) {
        // If parsing fails, return the original string value
        return storedValue;
      }
    }

    // If the stored value is null or undefined, return null
    return null;
  } catch (error) {
    console.error("Error reading from localStorage:", error);
    return null;
  }
};

// Function to remove data from localStorage
export const remove = (key: string) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error("Error removing from localStorage:", error);
  }
};

// Function to clear all data from localStorage
export const clear = () => {
  try {
    localStorage.clear();
  } catch (error) {
    console.error("Error clearing localStorage:", error);
  }
};
