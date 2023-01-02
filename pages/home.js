import Header from "../components/Header.js";
import APIDATA from "../js/apiDataStorage.js";
import renderPayments from "../components/cardsPayments.js";
import renderExpiredPayments from "../components/cardsExpiredPayments.js";
import DOMHandler from "../js/DOMHandler.js";
import { getObjectSelected } from "../js/usefulFunctions.js";
import EditPaymet from "./edit_payment.js";
import EditExpiredPaymet from "./edit_expired_payment.js";

// Función que retorna la estructura de la SPA.
function view(){
  const payments = APIDATA.payments.results;
  const expiredPayments = APIDATA.expiredPayments;
  // console.log(payments)
  return `
    ${Header}
    <div class="container col-9">
      <br>
      <h3 class="text-primary text-decoration-underline" >Pagos realizados</h3>
      <br>
      <div class="container">
        <div class="card border-info mb-3 p-2" style="background-color: #61aafb">
          <div class="row">
            <div class="col d-flex flex-row justify-content-center align-items-center">
              <h6 class="card-text">Servicio</h6>
            </div>
            
            <div class="col d-flex justify-content-center align-items-center">
              <h6 class="card-text">Fecha de pago</h6>
            </div>
            <div class="col d-flex justify-content-center align-items-center">
              <h6 class="card-text">Monto de pago</h6>
            </div>
            
            <div class="col d-flex justify-content-center align-items-center">
              <h6 class="card-text">Acciones Permitidas</h6>
            </div>
            
          </div>
        </div>
        ${ payments ? payments.map(renderPayments).join("") : "" }
      </div>
      <br>
      <br>
      <h3 class="text-danger text-decoration-underline" >Pagos vencidos</h3>
      <br>
      <div class="container">
        <div class="card border-danger mb-3 p-2" style="background-color: #e7858f">
          <div class="row">
            <div class="col d-flex flex-row justify-content-center align-items-center">
              <h6 class="card-text">Servicio</h6>
            </div>
            
            <div class="col d-flex justify-content-center align-items-center">
              <h6 class="card-text">Fecha de pago</h6>
            </div>
            <div class="col d-flex justify-content-center align-items-center">
              <h6 class="card-text">Monto de pago</h6>
            </div>
            
            <div class="col d-flex justify-content-center align-items-center">
              <h6 class="card-text">Penalidad</h6>
            </div>
            <div class="col d-flex justify-content-center align-items-center">
              <h6 class="card-text">Acciones Permitidas</h6>
            </div>
            
          </div>
        </div>
        ${ expiredPayments ? expiredPayments.map(renderExpiredPayments).join("") : "" }
      </div>
    </div>

    `;

}

function HomeLinks(){
  //<a href="#" class="card-link">Editar</a>      
  // EDITAR-ACTUALIZAR PAGO
  const editLinks = document.querySelectorAll('.editLink')
  if(editLinks.length > 0){
    editLinks.forEach( (element) => {
      element.addEventListener("click", (e) => {
        e.preventDefault()
        APIDATA.selectedPayment = getObjectSelected(e.target.dataset.id, APIDATA.payments.results)
        DOMHandler.load(EditPaymet)
      })
    })
  }

  const editLinks2 = document.querySelectorAll('.editLink2')
  if(editLinks2.length > 0){
    editLinks2.forEach( (element) => {
      element.addEventListener("click", (e) => {
        e.preventDefault()
        APIDATA.selectedExpiredPayment = getObjectSelected(e.target.dataset.id, APIDATA.expiredPayments)
        DOMHandler.load(EditExpiredPaymet)
      })
    })
  }

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

            const paymentId = e.target.dataset.id
            const accessToken = localStorage.getItem('auth_token')

            try {
              const response = await fetch(`${APIDATA.base_uri}api/v2/pagos/${paymentId}/`, {
                method: "DELETE",
                headers: {
                  'Authorization': `Bearer ${accessToken}`,
                  "Content-Type": "application/json",
                }
              });
              
              if(response.ok){
                Swal.fire(
                  {
                    title: 'Eliminado!',
                    text: "El servicio ha sido eliminado.",
                    icon: 'success',
                    // showConfirmButton: true,
                    // confirmButtonColor: '#3085d6',
                    timer: 2000
                  }
                  // 'Eliminado!',
                  // 'El servicio ha sido eliminado.',
                  // 'success'
                )              
                await APIDATA.fetchPayments()
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

  const deleteLinks2 = document.querySelectorAll('.deleteLink2')
  if(deleteLinks2.length > 0){
    deleteLinks2.forEach( (element) => {
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

            const expiredPaymentId = e.target.dataset.id
            const accessToken = localStorage.getItem('auth_token')

            try {
              const response = await fetch(`${APIDATA.base_uri}api/v2/expired-payments/${expiredPaymentId}/`, {
                method: "DELETE",
                headers: {
                  'Authorization': `Bearer ${accessToken}`,
                  "Content-Type": "application/json",
                }
              });
              
              if(response.ok){
                Swal.fire(
                  {
                    title: 'Eliminado!',
                    text: "El servicio ha sido eliminado.",
                    icon: 'success',
                    showConfirmButton: true,
                    confirmButtonColor: '#3085d6',
                    timer: 2000
                  }
                )              
                await APIDATA.fetchExpiredPayments()
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

// Clase "Home" con los métodos toString() para renderizar los componentes de la SPA y setListeners() 
// que establece los listeners para los eventos de selección de una categoria ó de busqueda de productos 
// por texto.
const Home = {
  toString(){
    return view();
  },
  setListeners(){
    Header.setListeners();
    HomeLinks();
  }
}
export default Home;