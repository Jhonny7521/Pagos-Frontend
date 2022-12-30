import APIDATA from "./apiDataStorage.js";

export function getUserData(){
  let userdata = localStorage.getItem('usuario')
  let userObj = JSON.parse(userdata)
  return userObj;
}

export function getSelectedService(id){
  const services = APIDATA.services
  const selectedService = services.find( (service) => service.id === Number(id) )

  if (selectedService){
    return selectedService
  }

  return "Servicio no existente"
}