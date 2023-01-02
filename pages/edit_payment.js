import Header from "../components/Header.js";
import APIDATA from "../js/apiDataStorage.js";
import DOMHandler from "../js/DOMHandler.js";
import queryToAPI from "../js/queryToApi.js";
import Home from "./home.js";

// Función que retorna la estructura de la SPA.
function view(){
  
  const payment = APIDATA.selectedPayment;
  
  return `
  ${Header}
  <div class="card mx-auto container-login" style="width: 25rem;">
    <div class="d-flex justify-content-center mt-4">
      <h3 class="card-title">Actualizar Pago</h3>
    </div>

    <div class="card-body">
      <form class="update-payment-form">

        <!-- User id -->
        <input type="hidden" id="payment_id" class="form-control" value="${payment.id}" />
        <input type="hidden" id="user_id" class="form-control" value="${payment.User_id}" />
        <input type="hidden" id="paymentDate" class="form-control" value="${payment.PaymentDate}" />

        <!-- Amount input -->
        <div class="form-outline mb-4">
          <label class="form-label" for="amount">Monto de pago</label>
          <input type="text" id="amount" class="form-control" value="${payment.Amount}"/>
        </div>

        <!-- Expiration date input -->
        <div class="form-outline mb-4">
          <label class="form-label" for="expiration_date">Fecha de expiración</label>
          <input type="date" id="expiration_date" class="form-control" value="${payment.ExpirationDate}"/>
        </div>

        <!-- Service input -->
        <div class="form-outline mb-4">
          <label class="form-label" for="service_id">Servicio</label>
          <select id="service_id" class="form-select" aria-label="Default select example" value="${payment.Service_id}">
            <option>Seleccione un servicio</option>
            ${ services ? APIDATA.services.map(renderOptions).join("") : "" }
          </select>
        </div>

        <div class="d-flex justify-content-center">
          <button id="update-payment" class="btn btn-primary" type="submit">Actualizar</button>
        </div>

      </form>
    </div>
  </div>
  `;
}

function renderOptions(service){
  const payment = APIDATA.selectedPayment
  let option = `<option value="${service.id}">${service.name}</option>`

  if(payment.Service_id === service.id){
    option = `<option selected value="${service.id}">${service.name}</option>`
  }
  
  return option
}

function editPayment() {

  const paymentForm = document.querySelector(".update-payment-form")
  paymentForm.addEventListener("submit",async (e) => {
    e.preventDefault()
    
    const {payment_id, user_id, paymentDate, amount, expiration_date, service_id} = e.target.elements
    
    const payment = {
      'User_id': user_id.value,
      'Amount': amount.value,
      'PaymentDate': paymentDate.value,
      'ExpirationDate': expiration_date.value,
      'Service_id': service_id.value
    }
    
    try {
      const data = await queryToAPI(`api/v2/pagos/${payment_id.value}/`, 'PUT', payment);  
      // const data = await response.json();
      console.log(data)
      if (data){
        Swal.fire({
          icon: 'success',
          title: 'Actualizado',
          text: 'Se ha actuaizado el pago',
          showConfirmButton: false,
          timer: 2000
        });
      }

    } catch (error) {
      console.log(error);
    }
    await APIDATA.fetchPayments()
    // await APIDATA.fetchExpiredPayments()

    DOMHandler.load(Home);
  })
}


const EditPaymet = {
  toString(){
    return view();
  },
  setListeners(){
    Header.setListeners();
    editPayment();
  }
}
export default EditPaymet;