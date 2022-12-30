import DOMHandler from "./js/DOMHandler.js";
import Home from "./pages/home.js";
import Login from "./pages/login.js";
import APIDATA from "./js/apiDataStorage.js";

// función INIT() encargarda de obtener los productos y cargarlos en el DOM al cargar la página.
async function init(){
  await APIDATA.fetchServices()
  await APIDATA.fetchPayments()
  await APIDATA.fetchExpiredPayments()
  const token = localStorage.getItem('auth_token')
  try {
    if(token !== null){
      DOMHandler.load(Home)
    }
    else{
      DOMHandler.load(Login)
    }
  } catch (error) {
    DOMHandler.load(Home)
  }
}

init();
