import { refreshToken } from "./fetchServicesFunctions.js";

const BASE_URI = 'https://pagos-api-production.up.railway.app/'; // Uri para conexión con el servidor servidor
// const BASE_URI = 'http://127.0.0.1:8000/'; // Uri para conexión con el servidor servidor

// Método que realiza la consulta a la api para obtener los datos según el endpoint.
async function queryToAPI(endPoint, method, bodyData){

  const apiURL = `${BASE_URI}${endPoint}`;
  let accessToken = localStorage.getItem('auth_token');

  let fetchData = {
    method: method,
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify(bodyData)
  };

  if(method === 'GET') {
    fetchData = {
      method: method,
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        "Content-type": "application/json",
      },
    }
  }
  // console.log(accessToken)
  try {
    let response = await fetch(apiURL, fetchData);
    let data = ''
    if (response.ok) {
      data = await response.json();
      return data;
    }

    await refreshToken()

    accessToken = localStorage.getItem('auth_token')
    fetchData = {
      method: method,
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify(bodyData)
    };
  
    if(method === 'GET') {
      fetchData = {
        method: method,
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          "Content-type": "application/json",
        },
      }
    }
    response = await fetch(apiURL, fetchData)
    data = await response.json();
    return data;
  } 
  
  catch (error) {
    console.log('Fetch Error', error);
  };
};

export default queryToAPI;