const calculateBTN = document.getElementById("calBTN");
const errorDiv = document.getElementById("error-msg");

calculateBTN.addEventListener("click", (e)=>{
    e.preventDefault();

    let BMR = 0;

    const gender = document.getElementById("gender").value;
    const age = document.getElementById("age").value;
    const height = document.getElementById("height").value;
    const weight = document.getElementById("weight").value
    const activity = document.getElementById("activity").value;
   
    if (age < 10 || age > 100) {
    errorDiv.textContent = "Age must be between 10 and 100.";
    errorDiv.classList.remove("d-none");
    return;
  }
  if (height < 100 || height > 250) {
    errorDiv.textContent = "Height must be between 100 and 250 cm.";
    errorDiv.classList.remove("d-none");
    return;
  }
  if (weight < 30 || weight > 300) {
    errorDiv.textContent = "Weight must be between 30 and 300 kg.";
    errorDiv.classList.remove("d-none");
    return;
  }

    let activityFactor;

    switch (activity) {
        case "Little or no activity (BMR)":
        activityFactor = 1.2;
    break;
    case "Light: exercise 1-3 times/week":
         activityFactor = 1.375;
    break;
        case "Moderate: exercise 4-5 times/week":
        activityFactor = 1.55;
    break;
        case "Active: exercise 6-7 times/week":
        activityFactor = 1.725;
    break;
        default:
    activityFactor = 1.2;
}

    if(gender==="Male"){
        BMR = 10 * weight + 6.25 * height - 5 * age + 5;
    }else{
        BMR = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    const TDEE = BMR * activityFactor;

    const protein = weight * 1.8;
    const fat = weight * 0.9;
    const proteinCalories = protein * 4;
    const fatCalories = fat * 9;
    const carbsCalories = TDEE - (proteinCalories + fatCalories);
    const carbs = carbsCalories / 4;

if (!gender || !age || !height || !weight || !activity) {
  errorDiv.textContent = "Please fill in all fields before calculating";
  errorDiv.classList.remove("d-none");
  return;
} else {
    document.getElementById("result-calories").textContent = `${TDEE.toFixed(0)} kcal`;
    document.getElementById("result-protein").textContent = `${protein.toFixed(0)} g`;
    document.getElementById("result-carbs").textContent = `${carbs.toFixed(0)} g`;
    document.getElementById("result-fats").textContent = `${fat.toFixed(0)} g`;

  errorDiv.classList.add("d-none");
  ["result-calories","result-protein","result-carbs","result-fats"].forEach(id=>{
  const element = document.getElementById(id);
  element.classList.add("show-results");
  setTimeout(()=>element.classList.remove("show-results"),500);
});
}

})