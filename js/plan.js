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
    disableCurrentPlan(savedUser.plan);
  }

plancards.forEach((card) => {
 card.addEventListener("click", (e) => {
      const clicked = e.currentTarget;
      const planName = clicked.closest(".card").querySelector(".card-title").textContent.trim();

      plancards.forEach((c) => c.classList.remove("disabled"));
 clicked.classList.add("disabled");

      beforePLAN.forEach((info) => (info.style.display = "none"));

     const userData = JSON.parse(localStorage.getItem("alphaUser"));
 userData.plan = planName;
      localStorage.setItem("alphaUser", JSON.stringify(userData));

  showCurrentPlan(planName);
  disableCurrentPlan(planName);

      if (typeof controlNavbar === "function") {
        controlNavbar();
      }
    });
  });
});

function disableCurrentPlan(planName) {
  const plancards = document.querySelectorAll(".plancards");
  plancards.forEach((btn) => {
    const cardTitle = btn.closest(".card").querySelector(".card-title").textContent.trim();
    if (cardTitle === planName) btn.classList.add("disabled");
  });
}

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
