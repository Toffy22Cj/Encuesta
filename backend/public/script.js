// Textos en diferentes idiomas
const textos = {
  es: {
    tituloHeader: "🇧🇷 Carnaval Brasil",
    subtituloHeader: "Tu opinión nos impulsa a mejorar 🌿✨",
    tituloBienvenida: "¡Bem-vindo al Carnaval!",
    textoBienvenida:
      "Gracias por visitarnos. Completa esta breve encuesta y ayúdanos a seguir compartiendo la alegría, color y creatividad de Brasil.",
    tituloEncuesta: "Encuesta de Satisfacción",
    labelNombre: "Nombre completo",
    labelIdentificacion: "Identificación",
    labelPrograma: "Programa al que perteneces",
    labelOpinion: "¿Qué te pareció el stand?",
    btnEnviar: "Enviar opinión",
    textoCarga: "Enviando encuesta...",
    refAmazonas: "Amazonas",
    refPlayas: "Playas de Brasil",
    refFutbol: "Fútbol Brasileño",
    refSamba: "Samba y Carnaval",
    refCafe: "Café Brasileño",
    mensajeExito: "¡Obrigado por tu opinión!",
    mensajeError: "Error al enviar",
    enviarOtra: "Enviar otra encuesta",
    verAgradecimiento: "Ver Agradecimiento",
    intentarNuevamente: "Intentar nuevamente",
  },
  en: {
    tituloHeader: "🇧🇷 Brazil Carnival",
    subtituloHeader: "Your opinion drives us to improve 🌿✨",
    tituloBienvenida: "Welcome to Carnival!",
    textoBienvenida:
      "Thank you for visiting us. Complete this short survey and help us continue sharing the joy, color and creativity of Brazil.",
    tituloEncuesta: "Satisfaction Survey",
    labelNombre: "Full name",
    labelIdentificacion: "Identification",
    labelPrograma: "Program you belong to",
    labelOpinion: "What did you think of the stand?",
    btnEnviar: "Submit opinion",
    textoCarga: "Sending survey...",
    refAmazonas: "Amazon",
    refPlayas: "Brazilian Beaches",
    refFutbol: "Brazilian Football",
    refSamba: "Samba and Carnival",
    refCafe: "Brazilian Coffee",
    mensajeExito: "Thank you for your opinion!",
    mensajeError: "Error sending",
    enviarOtra: "Submit another survey",
    verAgradecimiento: "View Appreciation",
    intentarNuevamente: "Try again",
  },
  pt: {
    tituloHeader: "🇧🇷 Carnaval Brasil",
    subtituloHeader: "Sua opinião nos impulsiona a melhorar 🌿✨",
    tituloBienvenida: "Bem-vindo ao Carnaval!",
    textoBienvenida:
      "Obrigado por nos visitar. Complete esta breve pesquisa e ajude-nos a continuar compartilhando a alegria, cor e criatividade do Brasil.",
    tituloEncuesta: "Pesquisa de Satisfação",
    labelNombre: "Nome completo",
    labelIdentificacion: "Identificação",
    labelPrograma: "Programa ao qual pertence",
    labelOpinion: "O que você achou do estande?",
    btnEnviar: "Enviar opinião",
    textoCarga: "Enviando pesquisa...",
    refAmazonas: "Amazônia",
    refPlayas: "Praias do Brasil",
    refFutbol: "Futebol Brasileiro",
    refSamba: "Samba e Carnaval",
    refCafe: "Café Brasileiro",
    mensajeExito: "Obrigado pela sua opinião!",
    mensajeError: "Erro ao enviar",
    enviarOtra: "Enviar outra pesquisa",
    verAgradecimiento: "Ver Agradecimento",
    intentarNuevamente: "Tentar novamente",
  },
};

// Variable para guardar el idioma actual
let idiomaActual = "es";

// Función para cambiar idioma
function cambiarIdioma(idioma) {
  idiomaActual = idioma;
  document.getElementById("titulo-header").textContent =
    textos[idioma].tituloHeader;
  document.getElementById("subtitulo-header").textContent =
    textos[idioma].subtituloHeader;
  document.getElementById("titulo-bienvenida").textContent =
    textos[idioma].tituloBienvenida;
  document.getElementById("texto-bienvenida").textContent =
    textos[idioma].textoBienvenida;
  document.getElementById("titulo-encuesta").textContent =
    textos[idioma].tituloEncuesta;
  document.getElementById("label-nombre").textContent =
    textos[idioma].labelNombre;
  document.getElementById("label-identificacion").textContent =
    textos[idioma].labelIdentificacion;
  document.getElementById("label-programa").textContent =
    textos[idioma].labelPrograma;
  document.getElementById("label-opinion").textContent =
    textos[idioma].labelOpinion;
  document.getElementById("btn-enviar").textContent = textos[idioma].btnEnviar;
  document.getElementById("texto-carga").textContent =
    textos[idioma].textoCarga;
  document.getElementById("ref-amazonas").textContent =
    textos[idioma].refAmazonas;
  document.getElementById("ref-playas").textContent = textos[idioma].refPlayas;
  document.getElementById("ref-futbol").textContent = textos[idioma].refFutbol;
  document.getElementById("ref-samba").textContent = textos[idioma].refSamba;
  document.getElementById("ref-cafe").textContent = textos[idioma].refCafe;
}

// Función para crear confeti
function crearConfeti() {
  const contenedor = document.querySelector(".elementos-carnaval");
  const colores = [
    "#00A86B",
    "#FFD700",
    "#00A9E0",
    "#FF6B35",
    "#FF44CC",
    "#8A2BE2",
    "#40E0D0",
    "#FF4500",
  ];

  for (let i = 0; i < 50; i++) {
    const confeti = document.createElement("div");
    confeti.className = "confeti";
    confeti.style.left = Math.random() * 100 + "vw";
    confeti.style.background =
      colores[Math.floor(Math.random() * colores.length)];
    confeti.style.animationDuration = Math.random() * 3 + 2 + "s";
    confeti.style.animationDelay = Math.random() * 5 + "s";
    contenedor.appendChild(confeti);
  }
}

// Función para crear pájaros (guacamayos como en Río)
function crearPajaros() {
  const contenedor = document.querySelector(".elementos-carnaval");
  for (let i = 0; i < 4; i++) {
    const pajaro = document.createElement("div");
    pajaro.className = "pajaro-rio";
    pajaro.style.top = Math.random() * 50 + 10 + "vh";
    pajaro.style.animationDelay = Math.random() * 10 + "s";
    pajaro.style.animationDuration = Math.random() * 10 + 15 + "s";
    contenedor.appendChild(pajaro);
  }
}

// Función para crear máscaras de carnaval
function crearMascaras() {
  const contenedor = document.querySelector(".elementos-carnaval");
  const mascaras = ["🎭", "😷", "🥸", "👺"];

  for (let i = 0; i < 6; i++) {
    const mascara = document.createElement("div");
    mascara.className = "mascara";
    mascara.textContent = mascaras[Math.floor(Math.random() * mascaras.length)];
    mascara.style.left = Math.random() * 90 + 5 + "vw";
    mascara.style.top = Math.random() * 80 + 10 + "vh";
    mascara.style.animationDelay = Math.random() * 5 + "s";
    mascara.style.fontSize = Math.random() * 1 + 1.5 + "rem";
    contenedor.appendChild(mascara);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // Crear elementos animados
  crearConfeti();
  crearPajaros();
  crearMascaras();

  const form = document.getElementById("encuestaForm");
  const respuestaDiv = document.getElementById("respuesta");
  const spinner = document.getElementById("spinner");
  const mensaje = document.getElementById("mensaje");
  const boton = document.getElementById("btn-enviar");
  const formSection = document.getElementById("formSection");
  const identificacionInput = document.getElementById("identificacion");

  const API_URL =
    window.location.hostname === "localhost"
      ? "http://localhost:3000/api"
      : "/api";

  // Efecto de flotación al hacer scroll
  if (formSection) {
    window.addEventListener("scroll", () => {
      const scroll = window.scrollY;
      formSection.style.transform = `translateY(${scroll * 0.05}px)`;
    });
  }

  // Validación en tiempo real de identificación
  if (identificacionInput) {
    let timeoutId;
    identificacionInput.addEventListener("input", function () {
      clearTimeout(timeoutId);
      limpiarError(this);
      timeoutId = setTimeout(() => {
        verificarIdentificacion(this.value.trim());
      }, 800);
    });
  }

  // Función para limpiar errores de un input
  function limpiarError(inputElement) {
    const inputGroup = inputElement.parentNode;
    const errorAnterior = inputGroup.querySelector(".input-error");
    if (errorAnterior) {
      errorAnterior.remove();
    }
    inputElement.classList.remove("error");
  }

  // Función para mostrar error de validación
  function mostrarError(inputElement, mensajeError) {
    const inputGroup = inputElement.parentNode;
    limpiarError(inputElement);

    inputElement.classList.add("error");

    const errorDiv = document.createElement("div");
    errorDiv.className = "input-error";
    errorDiv.innerHTML = `<span>&#10060;</span> <span>${mensajeError}</span>`;
    inputGroup.appendChild(errorDiv);
  }

  // Función para verificar identificación
  async function verificarIdentificacion(identificacion) {
    if (!identificacion) return;
    try {
      const response = await fetch(`${API_URL}/encuestas`);
      const result = await response.json();
      if (
        result.success &&
        result.data.some((e) => e.identificacion === identificacion)
      ) {
        mostrarError(
          identificacionInput,
          "Esta identificación ya está registrada"
        );
      }
    } catch (error) {
      console.error("Error verificando identificación:", error);
    }
  }

  // Manejo del envío del formulario
  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    // Limpiar errores previos
    document.querySelectorAll(".input-error").forEach((el) => el.remove());
    document
      .querySelectorAll("input.error, textarea.error")
      .forEach((el) => el.classList.remove("error"));

    const formData = {
      nombre: document.getElementById("nombre").value.trim(),
      identificacion: document.getElementById("identificacion").value.trim(),
      programa: document.getElementById("programa").value.trim(),
      opinion: document.getElementById("opinion").value.trim(),
    };

    // Validación básica
    let esValido = true;
    if (!formData.nombre) {
      mostrarError(document.getElementById("nombre"), "El nombre es requerido");
      esValido = false;
    }
    if (!formData.identificacion) {
      mostrarError(
        document.getElementById("identificacion"),
        "La identificación es requerida"
      );
      esValido = false;
    }
    if (!esValido) return;

    // Efecto del botón y animación de carga
    boton.disabled = true;
    let dotCount = 0;
    const loadingInterval = setInterval(() => {
      dotCount = (dotCount + 1) % 4;
      boton.textContent = textos[idiomaActual].btnEnviar + ".".repeat(dotCount);
    }, 400);

    form.style.opacity = "0.5";
    spinner.style.display = "block";

    try {
      const response = await fetch(`${API_URL}/encuesta`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        // Ocultar formulario y mostrar mensaje de éxito
        form.style.display = "none";
        spinner.style.display = "none";
        respuestaDiv.innerHTML = `
          <div class="success-message">
            <h3>&#x2705; ${textos[idiomaActual].mensajeExito}</h3>
            <p>${result.message}</p>
            <div style="margin-top: 20px;">
              <button onclick="location.reload()" class="btn-secondary">
                &#x1F4DD; ${textos[idiomaActual].enviarOtra}
              </button>
              <button onclick="verAgradecimiento()" class="btn-primary" style="margin-left: 10px;">
                &#x1F389; ${textos[idiomaActual].verAgradecimiento}
              </button>
            </div>
          </div>
        `;
        lanzarConfetiEspecial();
      } else {
        if (result.message.includes("identificación")) {
          mostrarError(identificacionInput, result.message);
        } else {
          throw new Error(result.message);
        }
        // Restaurar botón y formulario en caso de error de validación
        boton.disabled = false;
        form.style.opacity = "1";
        spinner.style.display = "none";
      }
    } catch (error) {
      console.error("Error:", error);
      form.style.display = "none";
      spinner.style.display = "none";
      respuestaDiv.innerHTML = `
        <div class="error-message">
          <h3>&#x274C; ${textos[idiomaActual].mensajeError}</h3>
          <p>${error.message || "Ocurrió un problema, intenta de nuevo."}</p>
          <button onclick="location.reload()" class="btn-secondary">
            &#x1F504; ${textos[idiomaActual].intentarNuevamente}
          </button>
        </div>
      `;
    } finally {
      clearInterval(loadingInterval);
      boton.textContent = textos[idiomaActual].btnEnviar;
    }
  });

  // Efectos visuales en los inputs
  const inputs = document.querySelectorAll("input, textarea");
  inputs.forEach((input) => {
    input.addEventListener("focus", function () {
      this.style.boxShadow =
        "0 0 20px var(--amarillo-sol), 0 0 30px var(--naranja-pasion)";
      this.style.borderColor = "var(--amarillo-sol)";
    });

    input.addEventListener("blur", function () {
      if (!this.classList.contains("error")) {
        this.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.1)";
        this.style.borderColor = "transparent";
      }
    });
  });
});

// Función global para ir a la página de agradecimiento
function verAgradecimiento() {
  window.location.href = "gracias.html";
}

// Función de confeti especial para éxito
function lanzarConfetiEspecial() {
  const container = document.body;
  const confettiCount = 200;
  const colors = [
    "#00A86B",
    "#FFD700",
    "#00A9E0",
    "#FF6B35",
    "#FF44CC",
    "#8A2BE2",
    "#40E0D0",
    "#FF4500",
  ];

  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement("div");
    confetti.style.position = "absolute";
    confetti.style.width = `${Math.random() * 12 + 6}px`;
    confetti.style.height = confetti.style.width;
    confetti.style.backgroundColor =
      colors[Math.floor(Math.random() * colors.length)];
    confetti.style.top = `${Math.random() * 100}%`;
    confetti.style.left = `${Math.random() * 100}%`;
    confetti.style.opacity = "1";
    confetti.style.borderRadius = "50%";
    confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
    confetti.style.transition = "transform 3s ease-out, opacity 3s ease-out";
    confetti.style.zIndex = "9999";
    confetti.style.boxShadow = "0 0 5px rgba(255,255,255,0.5)";
    container.appendChild(confetti);

    setTimeout(() => {
      confetti.style.transform = `translateY(${window.innerHeight}px) rotate(${
        Math.random() * 720 + 360
      }deg)`;
      confetti.style.opacity = "0";
    }, 10);

    setTimeout(() => {
      confetti.remove();
    }, 3000);
  }
}
