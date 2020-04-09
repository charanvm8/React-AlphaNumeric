import {handleError,handleResponse} from  "./appUtils"
const baseUrl = "http://localhost:3000/";

export function getAlphaNumericValues(number,page) {
  return fetch(baseUrl + "getAlphaNumericValues", {
    
    method: "POST", // POST for create, PUT to update when id already exists.
    headers: { "Content-Type": "application/json"},
    body: JSON.stringify({
      "number": number,
      "pageSize": page
    }),
  })
    .then(handleResponse)
    .catch(handleError);
}
