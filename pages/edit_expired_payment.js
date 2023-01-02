import Header from "../components/Header.js";
import APIDATA from "../js/apiDataStorage.js";
import DOMHandler from "../js/DOMHandler.js";
import queryToAPI from "../js/queryToApi.js";
import Home from "./home.js";

// Función que retorna la estructura de la SPA.
function view(){
  
  const payment = APIDATA.selectedExpiredPayment

  return `
  ${Header}
  <div class="card mx-auto container-login" style="width: 25rem;">
    <div class="d-flex justify-content-center mt-4">
      <h3 class="card-title">Actualizar Pago Expirado</h3>
    </div>

    <div class="card-body">
      <form class="update-expiredpayment-form">

        <!-- User id -->
        <input type="hidden" id="payment_id" class="form-control" value="${payment.id}" />
        <input type="hidden" id="payment_user_id" class="form-control" value="${payment.Payment_user_id}" />

        <!-- Penalty fee input -->
        <div class="form-outline mb-4">
          <label class="form-label" for=penalty_fee_amount">Monto de penalidad</label>
          <input type="text" id="penalty_fee_amount" class="form-control" value="${payment.Penalty_fee_amount}"/>
        </div>

        <div class="d-flex justify-content-center">
          <button id="update-expired-payment" class="btn btn-primary" type="submit">Actualizar pago</button>
        </div>

      </form>
    </div>
  </div>
  `;
}

function editExpiredPayment() {

  const paymentForm = document.querySelector(".update-expiredpayment-form")
  paymentForm.addEventListener("submit",async (e) => {
    e.preventDefault()
    
    const {payment_id, payment_user_id, penalty_fee_amount} = e.target.elements
    
    const payment = {
      'Payment_user_id': payment_user_id.value,
      'Penalty_fee_amount': penalty_fee_amount.value
    }
    
    try {
      const data = await queryToAPI(`api/v2/expired-payments/${payment_id.value}/`, 'PUT', payment);  
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
    await APIDATA.fetchExpiredPayments()

    DOMHandler.load(Home);
  })
}


const EditExpiredPaymet = {
  toString(){
    return view();
  },
  setListeners(){
    Header.setListeners();
    editExpiredPayment();
  }
}
export default EditExpiredPaymet;