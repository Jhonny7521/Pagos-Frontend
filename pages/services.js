import APIDATA from "../js/apiDataStorage.js";
import renderServices from "../components/cardsServices.js";
import Header from "../components/Header.js";
import AddService from "./add_service.js";
import DOMHandler from "../js/DOMHandler.js";
import EditService from "./edit_service.js";
import { getSelectedService } from "../js/usefulFunctions.js";

const view = () => {
  const services = APIDATA.services
  return `
    ${Header}
    <div class="container col-9">
      <br>
      <div class="container ">
        <h3 class="text-primary text-decoration-underline" >Servicios Streaming</h3>
        <br>
        <a class="btn btn-outline-success py-0 px-2" type="submit" id="add-service">Agregar servicio</a>
      </div>
      <div class="">
        ${ APIDATA.errors ? `<p class="error">${APIDATA.errors}</p>` : "" }
      </div>
      <br>
    
      <div class="d-flex flex-wrap">
        ${ services ? APIDATA.services.map(renderServices).join("") : "" }
      </div>
    
    </div>
  `;
}

function ServicesLinks(){

  // AGREGAR SERVICIO
  const addServiceLink = document.querySelector('#add-service')
  addServiceLink.addEventListener("click", (e) => {
    e.preventDefault()
    DOMHandler.load(AddService)
  })

  // EDITAR-ACTUALIZAR SERVICIO
  const editLinks = document.querySelectorAll('.editLink')
  if(editLinks.length > 0){
    editLinks.forEach( (element) => {
      element.addEventListener("click", (e) => {
        e.preventDefault()
        APIDATA.selectedService = getSelectedService(e.target.dataset.id)
        DOMHandler.load(EditService)
      })
    })
  }

  // BORRAR SERVICIO
  const deleteLinks = document.querySelectorAll('.deleteLink')
  if(deleteLinks.length > 0){
    deleteLinks.forEach( (element) => {
      element.addEventListener("click", async (e) => {
        e.preventDefault()
        
        const serviceId = e.target.dataset.id
        
        try {
          const response = await fetch(`http://127.0.0.1:8000/api/v2/servicios/${serviceId}/`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            }
          });
          // const data = await response.json();
          // console.log(data)
        } catch (error) {
          console.log(error);
        }
        await APIDATA.fetchServices()
    
        DOMHandler.reload();
      })
    })

  }

}

const Services = {
  toString(){
    return view()
  },
  setListeners(){
    ServicesLinks()
  }
}

export default Services;