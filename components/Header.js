import DOMHandler from "../js/DOMHandler.js";
import Home from "../pages/home.js";
import AddPaymet from "../pages/add_payment.js";
import Services from "../pages/services.js";
import { getUserData } from "../js/usefulFunctions.js";

//Función que retorna la estructura del Header de la SPA.
const view = () =>{
  const userdata = getUserData()

  return `
  <div style="background-color: #e3f2fd;">
  <div class="container col-9 ">
  <nav class="navbar navbar-expand-lg navbar-light " style="background-color: #e3f2fd;">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">
        <img src="./img/logo_n.png" alt="logo de página" id="logoWeb" style="height: 40px;"/>
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link" aria-current="page" href="#" id="home">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" id="addPayment">Añadir pago</a>
          </li>
          <li class="nav-item" style=" ${userdata.is_superuser ? "": "display: none;"}">
            <a class="nav-link" href="#" id="services">Servicios</a>
          </li>          
          
          
        </ul>
        <div class="d-flex flex-row justify-content-start align-items-center">
          <div class="border border-info mx-2" style="border-radius: 50%;" >
            <img src="./img/icono-user.png" alt="usuario" id="usuarioImg" style="height: 45px; border-radius: 50%;"/>
          </div>
          <div class="ms-2 text-center" >
            <p class="fw-bold m-0 text-info text-center">${userdata.username}</p>
            <a class="btn btn-outline-info py-0 px-2" type="submit">Cerrar sesión</a>
          </div>
        </div>
      </div>
    </div>
  </nav> 
  </div>
  </div>
  `
}

function NavbarOptions(){
  const homeLink = document.querySelector('#home')
  homeLink.addEventListener("click", (e) => {
    e.preventDefault()
    DOMHandler.load(Home)
  })

  const addPaymentLink = document.querySelector('#addPayment')
  addPaymentLink.addEventListener("click", (e) => {
    e.preventDefault()
    DOMHandler.load(AddPaymet)
  })

  const ServicesLink = document.querySelector('#services')
  ServicesLink.addEventListener("click", (e) => {
    e.preventDefault()
    DOMHandler.load(Services)
  })
}

// Clase Header con los métodos toString() para renderizar la estructura del componente Header y 
// setListeners() que establece el listener para el evento de búsqueda de productos por texto.
const Header = {
  toString(){
    return view()
  },
  setListeners(){
    NavbarOptions()
  }
};

export default Header;


{/* <div class="container col-9">
    <div class="header">
      <a href="/" class="header-logo" >
        <img src="./img/logo_n.png" alt="logo de página" id="logoWeb" style="width: 80px;"/>
      </a>
      <a href="#" id="home">Home</a>
      <a href="#" id="addPayment">Añadir pago</a>
      <a href="#" id="services">Servicios</a>
    </div>  
  </div>  */}