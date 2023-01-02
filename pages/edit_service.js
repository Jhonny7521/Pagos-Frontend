import Header from "../components/Header.js";
import APIDATA from "../js/apiDataStorage.js";
import DOMHandler from "../js/DOMHandler.js";
import queryToAPI from "../js/queryToApi.js";
import Services from "./services.js";

// Función que retorna la estructura de la SPA.
function view(){
  const service = APIDATA.selectedService
  return `
  ${Header}
  <br>
  <div class="card mx-auto container-login" style="width: 25rem;">
    <div class="d-flex justify-content-center mt-4">
      <h3 class="card-title">Actualizar Servicio</h3>
    </div>

    <div class="card-body">
      <form class="updateService-form">

        <input id="serviceId" type="hidden" value="${service.id}" />

        <!-- Service Name input -->
        <div class="form-outline mb-4">
          <label class="form-label" for="name">Nombre de servicio</label>
          <input type="text" id="name" class="form-control" value="${service.name}"/>
        </div>

        <!-- Description input -->
        <div class="form-outline mb-4">
          <label class="form-label" for="description">Descripción</label>
          <input type="text" id="description" class="form-control" value="${service.description}"/>
        </div>

        <!-- Url logo input -->
        <div class="form-outline mb-4">
          <label class="form-label" for="urlLogo">Url logo</label>
          <input type="text" id="urlLogo" class="form-control" value="${service.logo}"/>
        </div>

        <div class="d-flex justify-content-center">
          <button id="create-service" class="btn btn-primary" type="submit">Actualizar servicio</button>
        </div>

      </form>
    </div>
  </div>
  `;
}


function updateService() {
  const updateService = document.querySelector(".updateService-form")
  updateService.addEventListener("submit",async (e) => {
    e.preventDefault()
    
    const {serviceId, name, description, urlLogo} = e.target.elements
    const new_service = {
      'name': name.value,
      'description': description.value,
      'logo': urlLogo.value
    }
    
    try {
      const data = await queryToAPI(`api/v2/servicios/${serviceId.value}/`, 'PUT', new_service); 

      if(data){
        Swal.fire({
          icon: 'success',
          title: 'Actualizado',
          text: 'Se ha actualizado los datos del servicio',
          showConfirmButton: false,
          timer: 2000
        });
        await APIDATA.fetchServices()
    
        DOMHandler.load(Services);
      }

      // console.log(data)
    } catch (error) {
      console.log(error);
    }
  })
}

// Clase "Home" con los métodos toString() para renderizar los componentes de la SPA y setListeners()
// que establece los listeners para los eventos de selección de una categoria ó de busqueda de productos
// por texto.
const EditService = {
  toString(){
    return view();
  },
  setListeners(){
    Header.setListeners()
    updateService();
  }
}
export default EditService;