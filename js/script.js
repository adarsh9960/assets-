const GOOGLE_CONFIG = {
        clientId: "19892285132-psummj7dv8icumc5d4dsak8msh03c33h.apps.googleusercontent.com",
        clientSecret: "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", // NEVER expose this in client-side code in production
        redirectUri: "https://fra.cloud.appwrite.io/v1/account/sessions/oauth2/callback/google/689ca564003c38db4d3f",
        projectId: "crucial-arcanum-401819"
    };

    // ===== GOOGLE LOGIN HANDLER =====
    function handleGoogleLogin(response) {
        try {
            const payload = JSON.parse(atob(response.credential.split('.')[1]));
            
            sessionStorage.setItem("user", JSON.stringify({
                name: payload.name,
                email: payload.email,
                picture: payload.picture,
                idToken: response.credential
            }));
            
            loginSuccess(payload.picture);
            
        } catch (error) {
            console.error("Login error:", error);
            alert("Login failed. Please try again.");
        }
    }

    // ===== LOGIN SUCCESS HANDLER =====
    function loginSuccess(pic) {
        document.getElementById("loginContainer").style.display = "none";
        const popup = document.getElementById("popup");
        popup.style.display = "block";

        setTimeout(() => {
            popup.style.display = "none";
            document.getElementById("profileContainer").style.display = "flex";
            document.getElementById("profilePic").src = pic;
            document.getElementById("tournamentContent").style.display = "block";
            
            // Initialize tournament content
            initializeTournamentContent();
        }, 1500);
    }

    // ===== TOURNAMENT CONTENT INITIALIZATION =====
    function initializeTournamentContent() {
        // Countdown timer
        const countdownElement = document.getElementById("countdown");
        const countdownDate = new Date(countdownElement.dataset.countdown).getTime();
        
        function updateCountdown() {
            const now = new Date().getTime();
            const distance = countdownDate - now;
            
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            countdownElement.innerHTML = `Starts in: ${days}d ${hours}h ${minutes}m ${seconds}s`;
            
            if (distance < 0) {
                clearInterval(countdownInterval);
                countdownElement.innerHTML = "Tournament has started!";
            }
        }
        
        const countdownInterval = setInterval(updateCountdown, 1000);
        updateCountdown();
        
        // CTA button event
        document.getElementById("cta-button").addEventListener("click", function() {
            window.location.href = "register.html";
        });
    }

    // ===== LOGOUT FUNCTIONS =====
    function toggleLogout() {
        const btn = document.getElementById("logoutBtn");
        btn.style.display = btn.style.display === "block" ? "none" : "block";
    }

    function logout() {
        sessionStorage.removeItem("user");
        google.accounts.id.disableAutoSelect();
        
        // Hide tournament content and show login
        document.getElementById("tournamentContent").style.display = "none";
        document.getElementById("profileContainer").style.display = "none";
        document.getElementById("loginContainer").style.display = "flex";
    }

    // ===== INITIAL LOAD CHECK =====
    window.onload = function() {
        const savedUser = sessionStorage.getItem("user");
        if (savedUser) {
            const userData = JSON.parse(savedUser);
            document.getElementById("loginContainer").style.display = "none";
            document.getElementById("profileContainer").style.display = "flex";
            document.getElementById("profilePic").src = userData.picture;
            document.getElementById("tournamentContent").style.display = "block";
            initializeTournamentContent();
        }
        
        google.accounts.id.initialize({
            client_id: GOOGLE_CONFIG.clientId,
            callback: handleGoogleLogin
        });
    }
