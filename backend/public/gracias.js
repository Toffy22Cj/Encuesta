// URLs para los QR
const urlEncuesta = window.location.origin + "/index.html";
const urlAgradecimiento = window.location.href;

// 🌈 Animación de confeti mejorada
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const confettiCount = 200;
const confetti = [];
const colors = ["#009739", "#FEDF00", "#002776", "#FFFFFF", "#FF6B6B"];

for (let i = 0; i < confettiCount; i++) {
  confetti.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height - canvas.height,
    r: Math.random() * 8 + 3,
    d: Math.random() * confettiCount,
    color: colors[Math.floor(Math.random() * colors.length)],
    tilt: Math.floor(Math.random() * 10) - 10,
    tiltAngle: 0,
    tiltAngleIncrement: Math.random() * 0.1 + 0.05,
  });
}

function drawConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  confetti.forEach((p) => {
    ctx.save();
    ctx.translate(p.x + p.tilt, p.y);
    ctx.rotate(p.tiltAngle);
    ctx.fillStyle = p.color;
    ctx.fillRect(-p.r / 2, -p.r / 2, p.r, p.r);
    ctx.restore();
  });
  updateConfetti();
}

function updateConfetti() {
  confetti.forEach((p) => {
    p.tiltAngle += p.tiltAngleIncrement;
    p.y += (Math.cos(p.d) + 1 + p.r / 2) * 0.5;
    p.x += Math.sin(p.d) * 2;
    p.tilt = Math.sin(p.tiltAngle) * 15;

    if (p.y > canvas.height) {
      p.x = Math.random() * canvas.width;
      p.y = -20;
      p.r = Math.random() * 8 + 3;
    }
  });
}

function animate() {
  drawConfetti();
  requestAnimationFrame(animate);
}
animate();

// Generar códigos QR
function generarQRs() {
  // QR para la encuesta
  QRCode.toCanvas(
    document.getElementById("qr-encuesta"),
    urlEncuesta,
    {
      width: 150,
      height: 150,
      margin: 1,
      color: {
        dark: "#002776",
        light: "#FFFFFF",
      },
    },
    function (error) {
      if (error) console.error(error);
    }
  );

  // QR para la página de agradecimiento
  QRCode.toCanvas(
    document.getElementById("qr-agradecimiento"),
    urlAgradecimiento,
    {
      width: 150,
      height: 150,
      margin: 1,
      color: {
        dark: "#009739",
        light: "#FFFFFF",
      },
    },
    function (error) {
      if (error) console.error(error);
    }
  );
}

// Descargar QR individual
function descargarQR(url, nombre) {
  // Crear un canvas temporal para el QR
  const canvas = document.createElement("canvas");
  QRCode.toCanvas(
    canvas,
    url,
    {
      width: 300,
      height: 300,
      margin: 2,
      color: {
        dark: "#002776",
        light: "#FFFFFF",
      },
    },
    function (error) {
      if (error) {
        console.error(error);
        return;
      }

      // Convertir canvas a imagen y descargar
      const link = document.createElement("a");
      link.download = `QR_${nombre}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    }
  );
}

// Descargar ambos QRs
function descargarQRs() {
  descargarQR(urlEncuesta, "Encuesta_Brasil");
  setTimeout(() => {
    descargarQR(urlAgradecimiento, "Agradecimiento_Brasil");
  }, 500);
}

// Compartir con QR
function compartirConQR() {
  const mensaje =
    `¡Visita nuestro Stand de Brasil! 🇧🇷\n\n` +
    `📝 Encuesta: ${urlEncuesta}\n` +
    `🙏 Agradecimiento: ${urlAgradecimiento}\n\n` +
    `#Fonoferiabrasil`;

  if (navigator.share) {
    navigator.share({
      title: "Stand Brasil - Fonoferia",
      text: mensaje,
      url: urlEncuesta,
    });
  } else {
    // Copiar al portapapeles
    navigator.clipboard
      .writeText(mensaje)
      .then(() => {
        alert(
          "✅ Enlaces copiados al portapapeles. ¡Compártelos con tus amigos!"
        );
      })
      .catch(() => {
        // Fallback para navegadores antiguos
        const textArea = document.createElement("textarea");
        textArea.value = mensaje;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        alert(
          "✅ Enlaces copiados al portapapeles. ¡Compártelos con tus amigos!"
        );
      });
  }
}

// Crear partículas brasileñas
function crearParticulas() {
  const particlesContainer = document.getElementById("particles");
  const colors = ["#009739", "#FEDF00", "#002776"];

  for (let i = 0; i < 30; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.style.background =
      colors[Math.floor(Math.random() * colors.length)];
    particle.style.left = Math.random() * 100 + "%";
    particle.style.animationDelay = Math.random() * 8 + "s";
    particle.style.animationDuration = Math.random() * 5 + 5 + "s";
    particlesContainer.appendChild(particle);
  }
}

// Función para compartir original (mantener compatibilidad)
function compartir() {
  if (navigator.share) {
    navigator.share({
      title: "¡Visitá el Stand de Brasil! 🇧🇷",
      text: "Acabo de vivir una experiencia increíble en el Stand de Brasil. ¡No te lo pierdas!",
      url: window.location.href,
    });
  } else {
    alert("¡Compartí tu experiencia con #Fonoferiabrasil! 🇧🇷");
  }
}

// Inicializar efectos
document.addEventListener("DOMContentLoaded", function () {
  crearParticulas();
  generarQRs();
});

// Ajustar canvas al redimensionar
window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
