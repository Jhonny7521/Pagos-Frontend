function renderServices(service){
  return `

  <div class="col mb-4">
    <div class="card text-center text-dark bg-warning h-100" style="width: 15rem; ">
      <input id="serviceId" type="hidden" value="${service.id}" />
      <div class="card-image">
        <img src="${service.logo}" class="card-img-top">      
      </div>
      <div class="card-body overflow-auto" style="height: 10rem; ">
        <div class="card-content ">
          <h3 class="card-title">${service.name}</h3>
        </div>
        <div class="">
        <p class="card-text">${service.description}</p>
        </div>
      </div>
      <div class="card-footer">
        <a href="#" class="card-link editLink" data-id="${service.id}">Editar</a>      
        <a href="#" class="card-link text-danger deleteLink" data-id="${service.id}">Borrar</a>      
      </div>
    </div>
  </div>
  `
}

export default renderServices;