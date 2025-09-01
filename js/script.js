const GOOGLE_CLIENT_ID = "19892285132-psummj7dv8icumc5d4dsak8msh03c33h.apps.googleusercontent.com";

  function handleGoogleLogin(response) {
    try {
      const payload = JSON.parse(atob(response.credential.split('.')[1]));
      sessionStorage.setItem("user", JSON.stringify(payload));

      // Show popup
      const popup = document.getElementById("popup");
      popup.style.display = "block";

      setTimeout(() => {
        popup.style.display = "none";
        document.body.classList.add("logged-in");
        initCountdown();
      }, 1500);

    } catch (e) {
      console.error("Login failed", e);
      alert("Google Login failed. Please try again.");
    }
  }

  window.onload = function() {
    const user = sessionStorage.getItem("user");
    if (user) {
      document.body.classList.add("logged-in");
      initCountdown();
    } else {
      google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleGoogleLogin,
        auto_select: false
      });
      google.accounts.id.prompt(); // popup login auto
    }

    document.getElementById("cta-button").addEventListener("click", () => {
      window.location.href = "register.html";
    });
  }

  function initCountdown() {
    const el = document.getElementById("countdown");
    const target = new Date("2025-08-20T18:00:00Z").getTime();
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const dist = target - now;
      if (dist < 0) { clearInterval(timer); el.innerHTML="Tournament started!"; return; }
      const d=Math.floor(dist/(1000*60*60*24));
      const h=Math.floor((dist%(1000*60*60*24))/(1000*60*60));
      const m=Math.floor((dist%(1000*60*60))/(1000*60));
      const s=Math.floor((dist%(1000*60))/1000);
      el.innerHTML = `Starts in: ${d}d ${h}h ${m}m ${s}s`;
    },1000);
  }
