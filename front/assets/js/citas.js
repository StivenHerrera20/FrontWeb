const btnCitas = document.querySelector("#btnCitas");
const fecha = document.querySelector("#fecha");
const fechaEditar = document.querySelector("#fechaEditar");
const descripcion = document.querySelector("#descripcion");
const descripcionEditar = document.querySelector("#descripcionEditar");
const btnAgregarCita = document.querySelector("#btnAgregarCita");
const btnEditarCita = document.querySelector("#btnEditarCita");
const urlApi = "http://localhost:4000/";

btnCitas.addEventListener("click", () => {
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
  th2.innerText = "Fecha";
  const th3 = document.createElement("th");
  th3.setAttribute("scope", "col");
  th3.innerText = "Descripcion";
  const th4 = document.createElement("th");
  th4.setAttribute("scope", "col");
  th4.innerText = "Editar";
  const th5 = document.createElement("th");
  th5.setAttribute("scope", "col");
  th5.innerText = "Eliminar";
  const tbody = document.createElement("tbody");
  tabla.appendChild(thead);
  tabla.appendChild(tbody);
  thead.appendChild(tr);
  thead.appendChild(th1);
  thead.appendChild(th2);
  thead.appendChild(th3);
  thead.appendChild(th4);
  thead.appendChild(th5);
  fetch("http://localhost:4000/citas")
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
        let fecha = response[index].fecha.split("T");
        td1.innerText = fecha[0];
        const td2 = document.createElement("td");
        td2.innerText = response[index].descripcion;
        const td3 = document.createElement("td");
        td3.innerHTML =
          "<button id='btnEditar' class='bi bi-pencil-square' data-bs-toggle='modal' data-bs-target='#modalCitasEditar' ></button>";
        const td4 = document.createElement("td");
        td4.innerHTML =
          "<button id='btnEliminar' class='bi bi-trash3-fill'></button>";
        tr1.appendChild(th);
        tr1.appendChild(td1);
        tr1.appendChild(td2);
        tr1.appendChild(td3);
        tr1.appendChild(td4);
        tbody.appendChild(tr1);
      }
    });
  capaMostrar.appendChild(tabla);
});

//Agregamos una cita
btnAgregarCita.addEventListener("click", (e) => {
  e.preventDefault();
  fetch(urlApi + "citas", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      fecha: fecha.value,
      descripcion: descripcion.value,
    }),
  })
    .then((res) => {
      return res.text();
    })
    .then((res) => {
      if (res === "true") {
        Swal.fire(
          "Felicitaciones!",
          "Cita registrada satisfactoriamente",
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

const on = (element, event, selector, handler) => {
  element.addEventListener(event, (e) => {
    if (e.target.closest(selector)) {
      handler(e);
    }
  });
};
on(document, "click", "#btnEliminar", (e) => {
  let fila = e.target.parentNode.parentNode;
  let id = fila.firstElementChild.innerHTML; //id necesario para borrar
  //const id = fila.children[0].innerHTML;
  console.log(id);

  Swal.fire({
    title: "Deseas eliminar?",
    text: "La cita sera eliminada de la BASE DE DATOS!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, Eliminar!",
  }).then((result) => {
    if (result.isConfirmed) {
      fetch(urlApi + "citas/" + id, {
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
      setTimeout(() => {
        window.location.reload();
      }, 1200);
    }
  });
});

//Editar una cita
on(document, "click", "#btnEditar", (e) => {
  let fila = e.target.parentNode.parentNode;
  let id = fila.firstElementChild.innerHTML;
  console.log(id);
  btnEditarCita.addEventListener("click", (e) => {
    e.preventDefault();
    fetch(urlApi + "citas/" + id, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        fecha: fechaEditar.value,
        descripcion: descripcionEditar.value,
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
