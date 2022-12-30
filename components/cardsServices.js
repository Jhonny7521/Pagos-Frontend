function renderServices(service){
  return `

  <div class="col">
    <div class="card text-center text-dark bg-warning mb-3 h-100" style="width: 15rem; height: 30rem;">
      <div class="card-image">
        ${service.logo ? 
          `
            <img src="${service.logo}" class="card-img-top">
          `
          :
          `
            <div class="no-image">
              <p>NO HAY IMAGEN DISPONIBLE</p>
            </div>
          `
        }
        <img src="">
      </div>
      <div class="card-body">
        <div class="card-content">
          <h3 class="card-title">${service.name}</h3>
        </div>
        <div class="card-description">
        <p class="card-text">${service.description}</p>
        </div>
      </div>
      <div class="card-footer">
        <a href="#" class="card-link">Editar</a>      
      </div>
    </div>
  </div>
  `
}

export default renderServices;