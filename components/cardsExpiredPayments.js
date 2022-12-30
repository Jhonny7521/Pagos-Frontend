import APIDATA from "../js/apiDataStorage.js"

function findPaymentAndService(id){
  let objPaymentAndService = {};
  const payments = APIDATA.payments;
  console.log(payments.results)

  payments.results.forEach( (value) => {
    if (value.id == id) {
      objPaymentAndService['payment_id'] = value.id;
      objPaymentAndService['payment_amount'] = value.Amount;
      objPaymentAndService['payment_expiration_date'] = value.ExpirationDate;
      objPaymentAndService['payment_service_id'] = value.Service_id;
    }
  })

  const services = APIDATA.services;

  services.forEach( (value) => {
    if (value.id == objPaymentAndService.payment_service_id) {
      objPaymentAndService['Service_name'] = value.name;
      objPaymentAndService['Service_logo'] = value.logo;
    }
  })

  return objPaymentAndService;
}


function renderExpiredPayments(expired_payment){
  const servideObj = findPaymentAndService(expired_payment.Payment_user_id)
  return `
    <div class="card border-info mb-3 p-2">
      <div class="row">
        <div class="col d-flex flex-row justify-content-start align-items-center">
          <img src="${servideObj.Service_logo}" class="rounded mx-2" style="width: 40px ">
          <h6 class="card-text">${servideObj.Service_name}</h6>
        </div>
        
        <div class="col d-flex justify-content-start align-items-center">
          <p class="card-text">${servideObj.payment_expiration_date}</p>
        </div>
        <div class="col d-flex justify-content-start align-items-center">
          <p class="card-text">${servideObj.payment_amount}</p>
        </div>
        <div class="col d-flex justify-content-start align-items-center">
          <p class="card-text">${expired_payment.Penalty_fee_amount}</p>
        </div>
        
        <div class="col d-flex justify-content-start align-items-center">
          <a href="#" class="card-link">Editar</a>      
          <a href="#" class="card-link text-danger">Borrar</a>      
        </div>
      </div>
    </div>
  `
}

export default renderExpiredPayments;