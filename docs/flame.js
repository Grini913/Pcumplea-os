const countdownEl = document.getElementById("countdown");
const flame = document.getElementById("flame");

let counter = 3;

function showCountdown(text, duration = 1000) {
  countdownEl.textContent = text;
  countdownEl.style.animation = "none"; // reset animación
  void countdownEl.offsetWidth; // hack para reiniciar animación
  countdownEl.style.animation = `fadeZoom ${duration / 1000}s ease forwards`;
}

function startCountdown() {
  showCountdown(counter);

  const interval = setInterval(() => {
    counter--;

    if (counter > 0) {
      showCountdown(counter);
    } else if (counter === 0) {
      showCountdown("¡Sopla!", 2000); // ✨ más tiempo para mostrarse
    } else {
      clearInterval(interval);

      // Ocultar después de mostrar "¡Sopla!"
      setTimeout(() => {
        countdownEl.textContent = "";
        countdownEl.style.animation = "none";

        // 🔥 Apagar llama
        flame.style.animation = "fadeOut 2s forwards";

        // 🌫️ Crear humo
        for (let i = 0; i < 3; i++) {
          const smoke = document.createElement("div");
          smoke.classList.add("smoke");
          smoke.style.animationDelay = `${i * 0.3}s`;
          flame.parentElement.appendChild(smoke);

          setTimeout(() => smoke.remove(), 2500);
        }

        // ✨ Volver a encender la flama después de 10s
        setTimeout(() => {
          flame.style.animation = "flicker 0.4s infinite alternate";
          flame.style.opacity = "1"; // asegúrate que reaparezca
        }, 20000);

      }, 2000); // espera a que se vea "¡Sopla!"
    }
  }, 1000);
}

// Inicia la cuenta regresiva después de 10 segundos
setTimeout(startCountdown, 10000);
