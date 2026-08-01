const password = "Falak123";
const passInput = document.getElementById("password");
const unlockBtn = document.getElementById("unlockBtn");
const errorMsg = document.getElementById("errorMsg");

function nextScreen(current) {
    document.getElementById("screen" + current).classList.remove("active");
    document.getElementById("screen" + (current + 1)).classList.add("active");
    
    // Start heart game if moving to screen 3
    if(current + 1 === 3) {
        startHeartGame();
    }
}

unlockBtn.addEventListener("click", () => {
    if (passInput.value === password) {
        nextScreen(1);
    } else {
        errorMsg.style.display = "block";
        passInput.style.border = "2px solid #ff4e92";
        setTimeout(() => {
            passInput.style.border = "";
        }, 1200);
    }
});

// Heart Game Logic
let heartsCollected = 0;
let heartInterval;

function startHeartGame() {
    heartInterval = setInterval(createHeart, 800);
}

function createHeart() {
    const heart = document.createElement("div");
    heart.classList.add("falling-heart");
    heart.innerHTML = "❤️";
    heart.style.left = Math.random() * 90 + "vw";
    heart.style.top = "-50px";
    heart.style.animationDuration = (Math.random() * 2 + 2) + "s";
    
    heart.addEventListener("click", () => {
        heartsCollected++;
        document.getElementById("score").innerText = heartsCollected;
        heart.remove();
        
        if (heartsCollected >= 10) {
            clearInterval(heartInterval);
            setTimeout(() => nextScreen(3), 800);
        }
    });
    
    document.getElementById("hearts-container").appendChild(heart);
    
    // Remove heart if it falls off screen
    setTimeout(() => {
        if(heart.parentElement) heart.remove();
    }, 4000);
    }
