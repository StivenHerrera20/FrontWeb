const urlApi = "http://localhost:4000/";
const nombre = document.querySelector("#name");
const apellido = document.querySelector("#apellido");
const emailR = document.querySelector("#emailR");
const btnRegistrarse = document.querySelector("#btnRegistrarse");
const passwordR = document.querySelector("#passwordR");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const btnEnviar = document.querySelector("#btnEnviar");
btnEnviar.addEventListener("click", (e) => {
  e.preventDefault();
  fetch(urlApi + "login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email.value,
      password: password.value,
    }),
  })
    .then((res) => {
      return res.text();
    })
    .then((res) => {
      if (res === "true") {
        window.location = "http://127.0.0.1:5500/front/dashboard.html";
      } else {
        Swal.fire({
          icon: "error",
          title: "Falla en la validacion...",
          text: "email o contraseña incorrecta!",
        });
      }
    });
});

btnRegistrarse.addEventListener("click", (e) => {
  e.preventDefault();
  fetch(urlApi + "usuarios", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nombre: nombre.value,
      apellido: apellido.value,
      email: emailR.value,
      password: passwordR.value,
    }),
  })
    .then((res) => {
      return res.text();
    })
    .then((res) => {
      if (res === "true") {
        Swal.fire(
          "Felicidades!",
          "Te has registrado correctamente!",
          "success"
        );
      } else {
        Swal.fire({
          icon: "error",
          title: "No es posible registrar...",
          text: "......!",
        });
      }
    });
});
