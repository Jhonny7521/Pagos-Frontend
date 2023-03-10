import Header from "../components/Header.js";
import APIDATA from "../js/apiDataStorage.js";
import DOMHandler from "../js/DOMHandler.js";
import Services from "./services.js";
import queryToAPI from "../js/queryToApi.js";

// Función que retorna la estructura de la SPA.
function view(){
  const userdata = localStorage.getItem('usuario')
  const userObj = JSON.parse(userdata)
  return `
  ${Header}
  <br>
  <div class="card mx-auto container-login" style="width: 25rem;">
    <div class="d-flex justify-content-center mt-4">
      <h3 class="card-title">Agregar Servicio</h3>
    </div>

    <div class="card-body">
      <form class="register-form">

        <!-- Service Name input -->
        <div class="form-outline mb-4">
          <label class="form-label" for="name">Nombre de servicio</label>
          <input type="text" id="name" class="form-control" />
        </div>

        <!-- Description input -->
        <div class="form-outline mb-4">
          <label class="form-label" for="description">Descripción</label>
          <input type="text" id="description" class="form-control" />
        </div>

        <!-- Url logo input -->
        <div class="form-outline mb-4">
          <label class="form-label" for="urlLogo">Url logo</label>
          <input type="text" id="urlLogo" class="form-control" />
        </div>

        <div class="d-flex justify-content-center">
          <button id="create-service" class="btn btn-primary" type="submit">Crear servicio</button>
        </div>

      </form>
    </div>
  </div>
  `;
}


function createService() {
  const paymentForm = document.querySelector(".register-form")
  paymentForm.addEventListener("submit",async (e) => {
    e.preventDefault()
    
    const { name, description, urlLogo} = e.target.elements
    const new_service = {
      'name': name.value,
      'description': description.value,
      'logo': urlLogo.value
    }
    
    try {
      const data = await queryToAPI('api/v2/servicios/', 'POST', new_service);      
      
      if(data){
        Swal.fire({
          icon: 'success',
          title: 'Correcto',
          text: 'Se ha creado un nuevo servicio',
          showConfirmButton: false,
          timer: 2000
        });
        await APIDATA.fetchServices()
    
        DOMHandler.load(Services);
      }
      
    } catch (error) {
      console.log(error);
    }

  })
}

// Clase "Home" con los métodos toString() para renderizar los componentes de la SPA y setListeners()
// que establece los listeners para los eventos de selección de una categoria ó de busqueda de productos
// por texto.
const AddService = {
  toString(){
    return view();
  },
  setListeners(){
    Header.setListeners()
    createService();
  }
}
export default AddService;