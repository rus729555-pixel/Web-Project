window.addEventListener("DOMContentLoaded", () => {
  const plancards = document.querySelectorAll(".plancards");
  const beforePLAN = document.querySelectorAll(".beforePLAN");
  const savedUser = JSON.parse(localStorage.getItem("alphaUser"));
  const isLoggedIn = !!savedUser;

  if (!isLoggedIn) return;

  plancards.forEach((card) => card.classList.remove("disabled"));

  if (savedUser.plan) {
    beforePLAN.forEach((info) => (info.style.display = "none"));

    showCurrentPlan(savedUser.plan);

    const nutritionLink = document.querySelector('a[href="/Templates/Nutrition.html"]');
    if (nutritionLink && savedUser.plan === "Basic") {
      nutritionLink.classList.add("d-none");
    }

    plancards.forEach((btn) => {
      const cardTitle = btn.closest(".card").querySelector(".card-title").textContent.trim();
      if (cardTitle === savedUser.plan) {
        btn.classList.add("disabled");
      }
    });
  }

  plancards.forEach((card) => {
    card.addEventListener("click", (e) => {
      const clicked = e.currentTarget;
      const planName = clicked.closest(".card").querySelector(".card-title").textContent.trim();

      const nutritionLink = document.querySelector('a[href="/Templates/Nutrition.html"]');
      if (nutritionLink) {
        if (planName === "Basic") {
          nutritionLink.classList.add("d-none");
        } else {
          nutritionLink.classList.remove("d-none");
        }
      }

      plancards.forEach((c) => c.classList.remove("disabled"));
      clicked.classList.add("disabled");

      beforePLAN.forEach((info) => (info.style.display = "none"));

      const userData = JSON.parse(localStorage.getItem("alphaUser"));
      userData.plan = planName;
      localStorage.setItem("alphaUser", JSON.stringify(userData));

      showCurrentPlan(planName);
    });
  });
});

function showCurrentPlan(planName) {
  const planMsg = document.getElementById("planMessage");
  const planList = document.getElementById("planList");

  if (!planMsg || !planList) return;

  planMsg.innerHTML = `You are currently in the <span class="text-warning">${planName} Plan</span>`;

  const planBenefits = {
    Basic: ["gym subscription", "workout plans"],
    Pro: ["gym subscription", "workout plans", "Nutrition & Lifestyle"],
    Premium: [
      "gym subscription",
      "workout plans",
      "Nutrition & Lifestyle",
      "Sauna access",
    ],
  };

  const benefits = planBenefits[planName] || [];
  planList.innerHTML = benefits.map((b) => `<li>${b}</li>`).join("");
}
