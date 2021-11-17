const setItem = (key: string, value: string): void | null => {
  try {
    localStorage.setItem(`${key}`, value);
  } catch (error) {
    return null;
  }
};

const getItem = (key: string): string | null => {
  try {
    const value = localStorage.getItem(key);
    if (value) return value;
    else return null;
  } catch (error) {
    return null;
  }
};

const removeItem = (key: string): null => {
  try {
    localStorage.removeItem(key);
    return null;
  } catch (error) {
    return null;
  }
};

const setJsonItem = <TEntity,>(key: string, value: TEntity): void | null => {
  try {
    localStorage.setItem(`${key}`, JSON.stringify(value));
  } catch (error) {
    return null;
  }
};

const getJsonItem = <TEntity,>(key: string): TEntity | null => {
  try {
    const value = localStorage.getItem(key);
    if (value) return JSON.parse(value);
    else return null;
  } catch (error) {
    return null;
  }
};

export const storageManager = {
  setItem,
  getItem,
  removeItem,
  setJsonItem,
  getJsonItem,
};
