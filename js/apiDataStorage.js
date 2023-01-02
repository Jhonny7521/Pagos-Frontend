import { getServices, getPayments, getExpiredPayments } from "./fetchServicesFunctions.js";


async function fetchServices(){
  return APIDATA.services = await getServices()
}

async function fetchPayments(){
  return APIDATA.payments = await getPayments()
}

async function fetchExpiredPayments(){
  return APIDATA.expiredPayments = await getExpiredPayments()
}


const APIDATA = {
  base_uri: 'https://pagos-api-production.up.railway.app/',
  // base_uri: 'http://127.0.0.1:8000/',
  services: [],
  payments: [],
  expiredPayments: [],
  selectedService: [],
  selectedPayment: [],
  selectedExpiredPayment: [],
  errors: null,
  fetchServices,
  fetchPayments,
  fetchExpiredPayments
}

export default APIDATA;