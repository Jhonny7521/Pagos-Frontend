import APIDATA from "../js/apiDataStorage.js";
import renderServices from "../components/cardsServices.js";
import Header from "../components/Header.js";

const view = () => {
  const services = APIDATA.services
  return `
    ${Header}
    <br>
    <div class="products-container">
      ${ APIDATA.errors ? `<p class="error">${APIDATA.errors}</p>` : "" }
    </div>
    <br>
    <div class="container col-10";>
      <div class="d-flex flex-wrap">
        ${ services ? APIDATA.services.map(renderServices).join("") : "" }
      </div>
    </div>
  `;
}

const Services = {
  toString(){
    return view()
  },
  setListeners(){

  }
}

export default Services;