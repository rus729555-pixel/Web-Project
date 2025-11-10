const userData = JSON.parse(localStorage.getItem("alphaUser"));

if (!userData) {
  window.location.href = "/Templates/helpers/errorPage.html";
} else {
const userPlan = userData.plan?.toLowerCase();

  if (userPlan === "basic" || !userPlan) {
    const errorDiv = document.getElementById("error-msg");
    errorDiv.textContent = "Nutrition features are available for Premium and Pro members only.";
    errorDiv.classList.remove("d-none");

    document.getElementById("nutritionForm").classList.add("opacity-50");
    document.getElementById("calBTN").disabled = true;
  }
}