const btnContactos = document.querySelector("#btnContactos");
const nombre = document.querySelector("#nombre");
const apellido1 = document.querySelector("#apellido1");
const apellido2 = document.querySelector("#apellido2");
const telefono = document.querySelector("#telefono");
const email = document.querySelector("#email");
const fechaNacimiento = document.querySelector("#fechaNacimiento");
const nombreR = document.querySelector("#nombreR");
const apellido1R = document.querySelector("#apellido1R");
const apellido2R = document.querySelector("#apellido2R");
const telefonoR = document.querySelector("#telefonoR");
const emailR = document.querySelector("#emailR");
const fechaNacimientoR = document.querySelector("#fechaNacimientoR");
const btnAgregarContacto = document.querySelector("#btnAgregarContacto");

btnContactos.addEventListener("click", () => {
  capaMostrar.innerHTML = "";
  const tabla = document.createElement("table");
  tabla.setAttribute("class", "table");
  const thead = document.createElement("thead");
  const tr = document.createElement("tr");
  const th1 = document.createElement("th");
  th1.setAttribute("scope", "col");
  th1.innerText = "Id";
  const th2 = document.createElement("th");
  th2.setAttribute("scope", "col");
  th2.innerText = "Nombre";
  const th3 = document.createElement("th");
  th3.setAttribute("scope", "col");
  th3.innerText = "Apellido1";
  const th4 = document.createElement("th");
  th4.setAttribute("scope", "col");
  th4.innerText = "Apellido2";
  const th5 = document.createElement("th");
  th5.setAttribute("scope", "col");
  th5.innerText = "Telefono";
  const th6 = document.createElement("th");
  th6.setAttribute("scope", "col");
  th6.innerText = "Email";
  const th7 = document.createElement("th");
  th7.setAttribute("scope", "col");
  th7.innerText = "Email";
  const th8 = document.createElement("th");
  th8.setAttribute("scope", "col");
  th8.innerText = "Editar";
  const th9 = document.createElement("th");
  th9.setAttribute("scope", "col");
  th9.innerText = "Eliminar";
  const tbody = document.createElement("tbody");
  tabla.appendChild(thead);
  tabla.appendChild(tbody);
  thead.appendChild(tr);
  thead.appendChild(th1);
  thead.appendChild(th2);
  thead.appendChild(th3);
  thead.appendChild(th4);
  thead.appendChild(th5);
  thead.appendChild(th6);
  thead.appendChild(th7);
  thead.appendChild(th8);
  thead.appendChild(th9);
  fetch("http://localhost:4000/contactos")
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      for (let index = 0; index < response.length; index++) {
        const tr1 = document.createElement("tr");
        const th = document.createElement("th");
        th.setAttribute("scope", "row");
        th.innerText = response[index].id;
        const td1 = document.createElement("td");
        let fecha = response[index].fechaNacimiento.split("T");
        td1.innerText = response[index].nombre;
        const td2 = document.createElement("td");
        td2.innerText = response[index].apellido1;
        const td3 = document.createElement("td");
        td3.innerHTML = response[index].apellido2;
        const td4 = document.createElement("td");
        td4.innerHTML = response[index].telefono;
        const td5 = document.createElement("td");
        td5.innerHTML = response[index].email;
        const td6 = document.createElement("td");
        td6.innerHTML = fecha[0];
        const td7 = document.createElement("td");
        td7.innerHTML =
          '<button id="btnEditarCon" class="bi bi-pencil-square" data-bs-toggle="modal" data-bs-target="#modalContactoEditar"></button>';
        const td8 = document.createElement("td");
        td8.innerHTML =
          '<button id="btnEliminarCon" class="bi bi-trash3-fill"></button>';
        tr1.appendChild(th);
        tr1.appendChild(td1);
        tr1.appendChild(td2);
        tr1.appendChild(td3);
        tr1.appendChild(td4);
        tr1.appendChild(td5);
        tr1.appendChild(td6);
        tr1.appendChild(td7);
        tr1.appendChild(td8);
        tbody.appendChild(tr1);
      }
    });
  capaMostrar.appendChild(tabla);
});

on(document, "click", "#btnEliminarCon", (e) => {
  let fila = e.target.parentNode.parentNode;
  let id = fila.firstElementChild.innerHTML;
  //id necesario para borrar
  //const id = fila.children[0].innerHTML;
  console.log(id);

  Swal.fire({
    title: "Deseas eliminar?",
    text: "El contacto sera eliminado de la BASE DE DATOS!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, Eliminar!",
  }).then((result) => {
    if (result.isConfirmed) {
      fetch("http://localhost:4000/contactos/" + id, {
        method: "DELETE",
      })
        .then((respuesta) => {
          return respuesta.json();
        })
        .then((data) => {});
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Se ha eliminado!",
        showConfirmButton: false,
        timer: 3500,
      });
    }
  });
});

on(document, "click", "#btnEditarCon", (e) => {
  let fila = e.target.parentNode.parentNode;
  let id = fila.firstElementChild.innerHTML;
  console.log(id);
  btnEditarContacto.addEventListener("click", (e) => {
    e.preventDefault();
    fetch("http://localhost:4000/contactos/" + id, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        nombre: nombreR.value,
        apellido1: apellido1R.value,
        apellido2: apellido2R.value,
        telefono: telefonoR.value,
        email: emailR.value,
        fechaNacimiento: fechaNacimientoR.value,
      }),
    })
      .then((respuesta) => {
        return respuesta.text();
      })
      .then(() => {
        location.reload();
      });
  });
});

//Modal para agregar nuevo contacto
btnAgregarContacto.addEventListener("click", (e) => {
  e.preventDefault();
  fetch("http://localhost:4000/contactos", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      nombre: nombre.value,
      apellido1: apellido1.value,
      apellido2: apellido2.value,
      telefono: telefono.value,
      email: email.value,
      fechaNacimiento: fechaNacimiento.value,
    }),
  })
    .then((res) => {
      return res.text();
    })
    .then((res) => {
      if (res === "true") {
        Swal.fire(
          "Felicitaciones!",
          "Contacto registrado satisfactoriamente",
          "success"
        );
        setTimeout(() => {
          window.location.reload();
        }, 1200);
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Error en la insercion",
        });
      }
    });
});
