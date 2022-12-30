import queryToAPI from "./queryToApi.js";
import APIDATA from "./apiDataStorage.js";

// Método encargado de enviar el endpoint para obtener las categorías de productos.
export function getServices(){
  return queryToAPI('api/v2/servicios/', 'GET', '');
}

export function getPayments(){
  return queryToAPI('api/v2/pagos/', 'GET', '');
}

export function getExpiredPayments(){
  return queryToAPI('api/v2/expired-payments/', 'GET', '');
}

export async function refreshToken(){

  const refreshTokenData = {
    "refresh": localStorage.getItem('refresh_token')
  }
  
  const apiURL = `http://127.0.0.1:8000/users/jwt/refresh/`;

  let fetchData = {
    method: 'POST',
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(refreshTokenData)
  };
    // console.log(accessToken)
  try {
    let response = await fetch(apiURL, fetchData);
    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('auth_token', data.access)
    }
  } 
  
  catch (error) {
    console.log('Fetch Error', error);
  };


}

