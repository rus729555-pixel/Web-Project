(async () => {
  try {
    const res = await fetch("/Templates/helpers/navbar.html");
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const html = await res.text();

    const navbar = document.getElementById("navbar-placeholder");
    navbar.innerHTML = html;

    controlNavbar();
  } catch (err) {
    console.error("Navbar load error:", err);
  }
})();

function controlNavbar() {
  const isLoggedIn = !!localStorage.getItem("alphaUser");
  const navLinks = document.querySelectorAll(".navbar-nav .nav-item");

  navLinks.forEach((li) => {
    const linkText = li.textContent.trim();
    const alwaysVisible = ["Home", "Making of", "Our Story"];

    if (alwaysVisible.includes(linkText)) {
      li.classList.remove("d-none");
    } else {
      li.classList.toggle("d-none", !isLoggedIn);
    }
  });
}
