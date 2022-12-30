import { getServices, getPayments, getExpiredPayments } from "./fetchServices.js";


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
  services: [],
  payments: [],
  expiredPayments: [],
  errors: null,
  // categories: [],
  // active_category: 0,
  // filter_products: [],
  // search: false,
  // errors: null,
  // query: "",
  fetchServices,
  fetchPayments,
  fetchExpiredPayments
}

export default APIDATA;