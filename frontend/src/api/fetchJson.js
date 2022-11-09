export const fetchJson = (url, params = {}) => {
  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((success) => {
      return success;
    })
    .catch((error) => {
      return error;
    });
};
