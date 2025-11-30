(async () => {
  try {
    const res = await fetch("/Templates/helpers/footer.html");
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    
    console.log("Footer HTML fetched successfully");

    const html = await res.text();
    const footer = document.getElementById("footer-placeholder");
    if (footer) {
      footer.innerHTML = html;
      console.log("Footer content inserted successfully");
    }

    const signUPnews = document.getElementById("signUPforNEWS");
    const isSignUP = document.getElementById("issignup");
    const emailInput = document.getElementById('emailInput');
    
    function isValidEmail(email) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPattern.test(email);
    }

    let storedUser = localStorage.getItem("alphaUser");
    console.log("Stored User from localStorage:", storedUser); 
    if (storedUser) {
      try {
        storedUser = JSON.parse(storedUser);
        console.log("Stored User after parsing:", storedUser);
      } catch (error) {
        console.error("Invalid JSON format in localStorage for alphaUser", error);
        
        storedUser = null;
      }
    }

    if (storedUser && typeof storedUser.signedUpForNews === 'undefined') {
      console.log("signedUpForNews property doesn't exist, initializing it.");
      storedUser.signedUpForNews = false; 

      try {
        localStorage.setItem("alphaUser", JSON.stringify(storedUser));
      } catch (error) {
        console.error("Error saving to localStorage:", error);
      }
    }

    signUPnews.addEventListener("click", function(event) {
      event.preventDefault();

      const emailValue = emailInput.value.trim();

      if (!isValidEmail(emailValue)) {
        isSignUP.classList.add("bg-danger", "text-white");
        isSignUP.innerHTML = "Invalid email input";
        isSignUP.style.pointerEvents = "none";
        isSignUP.classList.remove("d-none");
        return; 
      }

      isSignUP.classList.remove("d-none"); 
      isSignUP.classList.remove("bg-danger");
      isSignUP.classList.add("bg-info", "text-white");
      isSignUP.innerHTML = "Processing your sign-up...";

      
      if (storedUser) {
        if (!storedUser.signedUpForNews) {
          storedUser.signedUpForNews = true;       
        try {
           localStorage.setItem("alphaUser", JSON.stringify(storedUser));
            console.log("Stored User updated with signedUpForNews = true:", storedUser);
          } catch (error) {
            console.error("Error saving to localStorage:", error);
          }

          isSignUP.innerHTML = "Congratulations, you have successfully signed up for news!";
          isSignUP.classList.remove("bg-info");
          isSignUP.classList.add("bg-success", "text-white");
          emailInput.value = '';
          
          emailInput.style.display = 'none';
          signUPnews.style.display = 'none';
        } else {
          console.log("User is already signed up for news");

          emailInput.style.display = 'none';
          signUPnews.style.display = 'none';

          isSignUP.innerHTML = "Congratulations, you're already signed up for news!";
          isSignUP.classList.remove("bg-info");
          isSignUP.classList.add("bg-success", "text-white");
        }
      } else {
        isSignUP.classList.remove("d-none");
        isSignUP.classList.add("bg-danger", "text-white");
        isSignUP.innerHTML = "Please register on the website to access this feature.";
        isSignUP.style.pointerEvents = "auto";


        isSignUP.addEventListener("click", function() {
          const target = document.getElementById("introduction");
          if (target) {
            target.scrollIntoView({ behavior: "smooth" });
          }
        });
      }
    });

    if (storedUser && storedUser.signedUpForNews) {
      emailInput.style.display = 'none';
      signUPnews.style.display = 'none';

      isSignUP.classList.add("bg-success", "text-white");
      isSignUP.innerHTML = "Congratulations, you're already signed up for news!";
      isSignUP.style.pointerEvents = "none";

      isSignUP.classList.remove("d-none");
    }

  } catch (err) {
    console.error("Footer load error:", err);
  }
})();
