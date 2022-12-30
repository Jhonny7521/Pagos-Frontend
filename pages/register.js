import Login from "./login.js"
import DOMHandler from "../js/DOMHandler.js"

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
  <div class="card mx-auto container-login" style="width: 25rem;">
    <div class="d-flex justify-content-center mt-4">
      <h3 class="card-title">Registrar usuario</h3>
    </div>
    
    <div class="card-body">
      <form class="register-form">

        <!-- First Name input -->
        <div class="form-outline mb-4">
          <label class="form-label" for="first_name">Nombre</label>
          <input type="text" id="first_name" class="form-control" />
        </div>

        <!-- Last Name input -->
        <div class="form-outline mb-4">
          <label class="form-label" for="last_name">Apellido</label>
          <input type="text" id="last_name" class="form-control" />
        </div>

        <!-- Username input -->
        <div class="form-outline mb-4">
          <label class="form-label" for="username">Nombre de usuario</label>
          <input type="text" id="username" class="form-control" />
        </div>
        
        <!-- Email input -->
        <div class="form-outline mb-4">
          <label class="form-label" for="email">Email</label>
          <input type="email" id="email" class="form-control" />
        </div>

        <!-- Password input -->
        <div class="form-outline mb-4">
          <label class="form-label" for="password">Password</label>
          <input type="password" id="password" class="form-control" />
        </div>

        <div class="d-flex justify-content-center">
          <button class="btn btn-primary search-button" type="submit">Registrarme</button>
        </div>

        <div class="d-flex justify-content-center mt-4">
          <p>Ya tengo cuenta <a href="#" id="change-form">Iniciar sesión</a> </p>
        </div>
      </form>
    </div>      
  </div>  
  `
}

function RegisterUser() {
  const loginForm = document.querySelector(".register-form")
  loginForm.addEventListener("submit",async (e) => {
    e.preventDefault()
    const {first_name, last_name, username, email, password} = e.target.elements

    const new_user = {
      'first_name': first_name,
      'last_name': last_name,
      'username': username,
      'email': email.value,
      'password': password.value
    }
    
    try {
      const response = await fetch("http://localhost:8000/users/signup/", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(new_user),
      });
      const data = await response.json();
      if (data) {
        console.log(data);
        console.log(data.user_data);
        console.log(data.tokens);
        // setToken(data.access);
        const userJson = JSON.stringify(data.user_data);
        localStorage.setItem('usuario', userJson)
        localStorage.setItem('auth_token', data.tokens.access)
        localStorage.setItem('refresh_token', data.tokens.refresh)
      }
    } catch (error) {
      console.log(error);
    }

    DOMHandler.load(Home)
  })

  const bodyContent = document.querySelector("#change-form")
  bodyContent.addEventListener("click", async (e) => {
    e.preventDefault()  
    DOMHandler.load(Login)
  })
}

// Clase Header con los métodos toString() para renderizar la estructura del componente Header y 
// setListeners() que establece el listener para el evento de búsqueda de productos por texto.
const Register = {
  toString(){
    return view()
  },
  setListeners(){
    RegisterUser()
  }
};

export default Register;