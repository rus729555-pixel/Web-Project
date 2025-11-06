const RegisterBTN = document.getElementById("RegisterBTN");
const LoginForm = document.getElementById("login");
const submitBTN = document.getElementById("submit");
const error = document.getElementById("error");
const homeContainer = document.querySelector(".home .container");
const loginText = document.getElementById("login-text");
const buttonMORE = document.getElementById("button-more");

RegisterBTN.addEventListener("click", () => {
  RegisterBTN.classList.add("d-none");
  LoginForm.classList.remove("d-none");
});

submitBTN.addEventListener("click", (e) => {
  e.preventDefault();

  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const phone = document.getElementById("phone").value.trim();

  let msg = "";
  if (firstName.length < 3 || lastName.length < 3) msg += "First and Last name must have at least 3 characters.<br>";
  if (phone.length !== 8 || isNaN(phone)) msg += "Phone must contain exactly 8 digits.";

  if (msg) {
    error.innerHTML = msg;
    error.classList.remove("d-none");
    error.style.color = "red";
  } else {
    localStorage.setItem("alphaUser", JSON.stringify({ firstName, lastName, phone }));
    location.reload();
  }
});

function makeWelcomeCard(user) {
  return `
  <div id="welcomeCard" class="container">
    <div class="row justify-content-center">
      <div class="col-11 col-md-9 col-lg-6">
        <div class="p-4 rounded bg-dark bg-opacity-75 text-white mt-4 shadow">
          <div class="text-warning fw-semibold text-uppercase small mb-2">Welcome to Alpha Gym</div>
          <div class="fs-4 fw-bold mb-1">${user.firstName} ${user.lastName}</div>
          <div class="text-secondary mb-2">Mobile: ${user.phone}</div>
          <hr class="border-light my-3"/>
          <div class="fw-semibold d-flex flex-column align-items-center mb-2">
          <p id="planMessage"></p>
          <ul>
          <li id=planList></i>
          </ul>
          <p class="beforePLAN">Find the Plan That Fits Your Fitness Journey</p>
          <a class="btn btn-warning text-dark fw-semibold mb-2 signin beforePLAN" href="#plans">Explore Your Plans</a>
          <button id="logoutBtn" class="btn btn-outline-light signin">Logout</button>
        </div>
      </div>
    </div>
  </div>`;
}

function showWelcome(user) {
  error.classList.add("d-none");
  LoginForm.classList.add("d-none");
  RegisterBTN.classList.add("d-none");
  loginText.classList.add("d-none");
  buttonMORE.classList.remove("d-none");

  document.getElementById("welcomeCard")?.remove();
  homeContainer.insertAdjacentHTML("beforeend", makeWelcomeCard(user));

  document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("alphaUser");
    location.reload();
  });
}

window.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem("alphaUser");
  if (saved) showWelcome(JSON.parse(saved));
});
