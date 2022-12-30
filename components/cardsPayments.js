import APIDATA from "../js/apiDataStorage.js"

function findService(id){
  let objService = {};
  const services = APIDATA.services;

  services.forEach( (value) => {
    if (value.id == id) {
      objService['id'] = value.id;
      objService['name'] = value.name;
      objService['description'] = value.description;
      objService['logo'] = value.logo;
    }
  })

  return objService;
}


function renderPayments(payment){
  const servideObj = findService(payment.Service_id)
  return `
    <div class="card border-info mb-3 p-2">
      <div class="row">
        <div class="col d-flex flex-row justify-content-start align-items-center">
          <img src="${servideObj.logo}" class="rounded mx-2" style="width: 40px">
          <h6 class="card-text">${servideObj.name}</h6>
        </div>
        
        <div class="col d-flex justify-content-start align-items-center">
          <p class="card-text">${payment.ExpirationDate}</p>
        </div>
        <div class="col d-flex justify-content-start align-items-center">
          <p class="card-text">${payment.Amount}</p>
        </div>
        
        <div class="col d-flex justify-content-start align-items-center">
          <a href="#" class="card-link">Editar</a>      
          <a href="#" class="card-link text-danger">Borrar</a>      
        </div>
      </div>
    </div>
    
  `
}

export default renderPayments;