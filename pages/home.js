import Header from "../components/Header.js";
import APIDATA from "../js/apiDataStorage.js";
import renderPayments from "../components/cardsPayments.js";
import renderExpiredPayments from "../components/cardsExpiredPayments.js";

// Función que retorna la estructura de la SPA.
function view(){
  const payments = APIDATA.payments.results;
  const expiredPayments = APIDATA.expiredPayments;
  return `
    ${Header}
    <div class="container col-9">
      <br>
      <h3 class="text-primary text-decoration-underline" >Pagos realizados</h3>
      <br>
      <div class="container">
        ${ payments ? payments.map(renderPayments).join("") : "" }
      </div>
      <br>
      <br>
      <h3 class="text-danger text-decoration-underline">Pagos vencidos</h3>
      <br>
      <div class="container">
        ${ expiredPayments ? expiredPayments.map(renderExpiredPayments).join("") : "" }
      </div>
    </div>

    `;

}

// Clase "Home" con los métodos toString() para renderizar los componentes de la SPA y setListeners() 
// que establece los listeners para los eventos de selección de una categoria ó de busqueda de productos 
// por texto.
const Home = {
  toString(){
    return view();
  },
  setListeners(){
    Header.setListeners();
  }
}
export default Home;