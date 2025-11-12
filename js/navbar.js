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
  const savedUser = JSON.parse(localStorage.getItem("alphaUser"));
  const isLoggedIn = !!savedUser;

  const home = document.querySelector('a[href="/Templates/index.html"]')?.closest("li");
  const products = document.querySelector('a[href="/Templates/products.html"]')?.closest("li");
  const facilities = document.querySelector('a[href="/Templates/facilities.html"]')?.closest("li");
  const nutrition = document.querySelector('a[href="/Templates/Nutrition.html"]')?.closest("li");
  const makingof = document.querySelector('a[href="/Templates/makingof.html"]')?.closest("li");
  const story = document.querySelector('a[href="/Templates/story.html"]')?.closest("li");

  [home, products, facilities, nutrition, makingof, story].forEach(li => li?.classList.add("d-none"));

  home?.classList.remove("d-none");
  makingof?.classList.remove("d-none");
  story?.classList.remove("d-none");

  if (!isLoggedIn) return;

  products?.classList.remove("d-none");
  facilities?.classList.remove("d-none");
  nutrition?.classList.remove("d-none");

  if (savedUser.plan?.toLowerCase() === "basic" || !savedUser.plan) {
    nutrition?.querySelector("a")?.classList.add("text-secondary");
    nutrition?.querySelector("a")?.classList.add("disabled-link");
  } else {
    nutrition?.querySelector("a")?.classList.remove("text-secondary");
    nutrition?.querySelector("a")?.classList.remove("disabled-link");
  }
}
