export const getItem = (key) => {
    return JSON.parse(localStorage.getItem(key));
  };
  
  export const setItem = (key, content) => {
    localStorage.setItem(key, JSON.stringify(content));
  };
  
  export const deleteItem = (key) => {
    localStorage.removeItem(key);
  };