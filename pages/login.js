import Register from "./register.js";
import DOMHandler from "../js/DOMHandler.js";
import Home from "./home.js";

//Función que retorna la estructura del Header de la SPA.
const view = () =>{
  return `
  <div style="background-color: #e3f2fd;">
    <div class="container col-9 ">
      <nav class="navbar navbar-light" style="background-color: #e3f2fd;">
        <div class="container">
          <a class="navbar-brand" href="#">
            <img src="./img/logo_n.png" alt="logo de página" id="logoWeb" style="height: 40px;"/>
          </a>
        </div>
      </nav>
    </div>
  </div>
  <br>
  <br>
  <div id="container-login" class="card mx-auto" style="width: 20rem;">
    <div class="d-flex justify-content-center mt-4">
      <h3 class="card-title">Iniciar sesión</h3>
    </div>
    <br>
    <div class="card-body">
      <form class="login-form">
        <!-- Email input -->
        <div class="form-outline mb-4">
          <label class="form-label" for="email">Email address</label>
          <input type="email" id="email" class="form-control" />
        </div>

        <!-- Password input -->
        <div class="form-outline mb-4">
          <label class="form-label" for="password">Password</label>
          <input type="password" id="password" class="form-control" />
        </div>

        <div class="d-flex justify-content-center">
          <button class="btn btn-primary search-button" type="submit">Iniciar sesión</button>
        </div>

        <div class="d-flex justify-content-center mt-4">
          <p>No tienes cuenta? <a href="#" id="change-form">Registrarme</a> </p>
        </div>
      </form>

    </div>      
  </div>  
  `
}


function LoginUser() {
  const loginForm = document.querySelector(".login-form")
  loginForm.addEventListener("submit",async (e) => {
    e.preventDefault()
    const {email, password}  = e.target.elements
    const user = {
      'email': email.value,
      'password': password.value
    }

  try {
    const response = await fetch("http://localhost:8000/users/login/", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await response.json();
    if (data) {
      // setToken(data.access);
      const userJson = JSON.stringify(data.user_data);
      localStorage.setItem('usuario', userJson)
      localStorage.setItem('auth_token', data.tokens.access)
      localStorage.setItem('refresh_token', data.tokens.refresh)
    }
  } catch (error) {
    console.log(error);
  }
    // location.reload(true)
    DOMHandler.load(Home)
  })

  const bodyContent = document.querySelector("#change-form")
  bodyContent.addEventListener("click", async (e) => {
    e.preventDefault()  
    DOMHandler.load(Register)
  })

}

// Clase Header con los métodos toString() para renderizar la estructura del componente Header y 
// setListeners() que establece el listener para el evento de búsqueda de productos por texto.
const Login = {
  toString(){
    return view()
  },
  setListeners(){
    LoginUser();
  }
};

export default Login;