import APIDATA from "../js/apiDataStorage.js";
import renderServices from "../components/cardsServices.js";
import Header from "../components/Header.js";
import AddService from "./add_service.js";
import DOMHandler from "../js/DOMHandler.js";
import EditService from "./edit_service.js";
import { getObjectSelected } from "../js/usefulFunctions.js";
import Home from "./home.js";

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
        APIDATA.selectedService = getObjectSelected(e.target.dataset.id, APIDATA.services)
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
        
        /* SWEET ALERT*/
        Swal.fire({
          title: 'Estas seguro?',
          text: "¡No podrás revertir esto!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: '¡Sí, bórralo!'
        }).then( async (result) => {
          
          if (result.isConfirmed) {

            const serviceId = e.target.dataset.id
            const accessToken = localStorage.getItem('auth_token')

            try {
              const response = await fetch(`${APIDATA.base_uri}api/v2/servicios/${serviceId}/`, {
                method: "DELETE",
                headers: {
                  'Authorization': `Bearer ${accessToken}`,
                  "Content-Type": "application/json",
                }
              });
              
              if(response.ok){
                Swal.fire(
                  'Eliminado!',
                  'El servicio ha sido eliminado.',
                  'success'
                )              
                await APIDATA.fetchServices()
                DOMHandler.reload();
              }

            } catch (error) {
              console.log(error);
            }
          }
        })
        /* SWEET ALERT*/     
      })
    })

  }

}

const Services = {
  toString(){
    return view();
  },
  setListeners(){
    Header.setListeners();
    ServicesLinks();
  }
}

export default Services;