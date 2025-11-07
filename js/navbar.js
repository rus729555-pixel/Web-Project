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
  const workout = document.querySelector('a[href="/Templates/workout.html"]')?.closest("li");
  const nutrition = document.querySelector('a[href="/Templates/Nutrition.html"]')?.closest("li");
  const makingof = document.querySelector('a[href="/Templates/makingof.html"]')?.closest("li");
  const story = document.querySelector('a[href="/Templates/story.html"]')?.closest("li");

  [home, products, workout, nutrition, makingof, story].forEach((li) =>
    li?.classList.add("d-none")
  );

home?.classList.remove("d-none");
makingof?.classList.remove("d-none");
story?.classList.remove("d-none");

if(!isLoggedIn) return;

products?.classList.remove("d-none");

  if (savedUser.plan) {
    if (savedUser.plan === "Basic") {
      workout?.classList.remove("d-none");
    } else if (savedUser.plan === "Pro" || savedUser.plan === "Premium") {
      workout?.classList.remove("d-none");
      nutrition?.classList.remove("d-none");
    }
  }
}
