const btnHome = document.querySelector("#btnHome");
let capaMostar = document.querySelector("#capaMostrar");

btnHome.addEventListener("click", () => {
  capaMostar.innerHTML =
    '<h1 class="text-center mt-3"> BIENVENIDO A TU AGENDA</h1> <div class="text-center content-align-center m-auto"><img src="./assets/media/cartoon-calendar-icon-in-comic-style-agenda-illustration-pictogram-month-sign-splash-business-concept-vector-removebg-preview(1).png" alt=""></div>';
});
