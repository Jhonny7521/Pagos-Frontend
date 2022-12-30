import queryToAPI from "./queryToApi.js";

// Método encargado de enviar el endpoint para obtener las categorías de productos.
export function getServices(){
  return queryToAPI('/api/v2/servicios/');
}

export function getPayments(){
  return queryToAPI('/api/v2/pagos/');
}

export function getExpiredPayments(){
  return queryToAPI('/api/v2/expired-payments/');
}

