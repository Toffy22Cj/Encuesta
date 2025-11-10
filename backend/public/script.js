// script.js - Versión corregida para Fonoaudiología Brasil

// ========== CONFIGURACIÓN INICIAL ==========
const audio = document.getElementById("sonidoSelva");
const sonidoBtn = document.getElementById("sonidoBtn");
const form = document.getElementById("encuestaForm");
const mensaje = document.getElementById("mensaje");
const submitBtn = document.getElementById("submitBtn");

// URL de Instagram
const urlInstagram =
  "https://www.instagram.com/fonoaudiologia_uds?igsh=MTZldTQ1cmU5ZGVmMQ%3D%3D&utm_source=qr";

// Textos en diferentes idiomas
const textos = {
  es: {
    tituloHeader: "🌿 Encuesta Fonoaudiología 🇧🇷",
    subtituloHeader: "Você na Fono",
    tituloBienvenida: "¡Bem-vindo!",
    textoBienvenida:
      "El programa de Fonoaudiología te da la bienvenida con una experiencia única inspirada en la biodiversidad brasileña. Ayúdanos a mejorar compartiendo tu opinión sobre nuestro stand.",
    tituloEncuesta: "Encuesta Fono",
    labelNombre: "Nombre completo *",
    labelIdentificacion: "Número de identificación *",
    labelCorreo: "Correo electrónico *",
    labelTelefono: "Teléfono *",
    labelPrograma: "Programa académico *",
    labelOpinion: "¿Qué te pareció nuestro stand de Fonoaudiología? *",
    btnEnviar: "Enviar opinión",
    textoCarga: "Enviando encuesta...",
    mensajeExito:
      "🎓 ¡Gracias por tu opinión sobre Fonoaudiología! Tu contribución nos ayuda a mejorar.",
    mensajeError: "Error al enviar",
    enviarOtra: "Enviar otra encuesta",
    verAgradecimiento: "Ver Agradecimiento",
    verGaleria: "Ver Galería",
    seguirInstagram: "Seguir en Instagram",
    tituloGaleria: "📸 Galería del Evento",
    textoGaleria: "¡Mira las fotos de nuestro stand y síguenos en Instagram!",
  },
  en: {
    tituloHeader: "🌿 Speech Therapy Survey 🇧🇷",
    subtituloHeader: "You in Speech Therapy",
    tituloBienvenida: "Welcome!",
    textoBienvenida:
      "The Speech Therapy program welcomes you with a unique experience inspired by Brazilian biodiversity. Help us improve by sharing your opinion about our stand.",
    tituloEncuesta: "Speech Therapy Survey",
    labelNombre: "Full name *",
    labelIdentificacion: "Identification number *",
    labelCorreo: "Email *",
    labelTelefono: "Phone *",
    labelPrograma: "Academic program *",
    labelOpinion: "What did you think of our Speech Therapy stand? *",
    btnEnviar: "Submit opinion",
    textoCarga: "Sending survey...",
    mensajeExito:
      "🎓 Thank you for your opinion about Speech Therapy! Your contribution helps us improve.",
    mensajeError: "Error sending",
    enviarOtra: "Submit another survey",
    verAgradecimiento: "View Appreciation",
    verGaleria: "View Gallery",
    seguirInstagram: "Follow on Instagram",
    tituloGaleria: "📸 Event Gallery",
    textoGaleria: "Check out our stand photos and follow us on Instagram!",
  },
  pt: {
    tituloHeader: "🌿 Pesquisa Fonoaudiologia 🇧🇷",
    subtituloHeader: "Você na Fono",
    tituloBienvenida: "Bem-vindo!",
    textoBienvenida:
      "O programa de Fonoaudiologia dá as boas-vindas a você com uma experiência única inspirada na biodiversidade brasileira. Ajude-nos a melhorar compartilhando sua opinião sobre nosso estande.",
    tituloEncuesta: "Pesquisa Fono",
    labelNombre: "Nome completo *",
    labelIdentificacion: "Número de identificação *",
    labelCorreo: "E-mail *",
    labelTelefono: "Telefone *",
    labelPrograma: "Programa acadêmico *",
    labelOpinion: "O que você achou do nosso estande de Fonoaudiologia? *",
    btnEnviar: "Enviar opinião",
    textoCarga: "Enviando pesquisa...",
    mensajeExito:
      "🎓 Obrigado pela sua opinião sobre Fonoaudiologia! Sua contribuição nos ajuda a melhorar.",
    mensajeError: "Erro ao enviar",
    enviarOtra: "Enviar outra pesquisa",
    verAgradecimiento: "Ver Agradecimento",
    verGaleria: "Ver Galeria",
    seguirInstagram: "Seguir no Instagram",
    tituloGaleria: "📸 Galeria do Evento",
    textoGaleria: "Veja as fotos do nosso estande e siga-nos no Instagram!",
  },
};

let idiomaActual = "es";

// ========== INICIALIZACIÓN ==========
document.addEventListener("DOMContentLoaded", function () {
  inicializarSonido();
  inicializarFormulario();
  crearElementosAnimados();
  aplicarIdioma(idiomaActual);
});

// ========== FUNCIONES INSTAGRAM ==========
function verGaleriaInstagram() {
  window.open(urlInstagram, "_blank");
}

function seguirInstagram() {
  const instagramUrl = "instagram://user?username=fonoaudiologia_uds";
  window.location.href = instagramUrl;

  // Fallback para navegadores que no soportan deep linking
  setTimeout(() => {
    window.open(urlInstagram, "_blank");
  }, 500);
}

// ========== SISTEMA DE SONIDO ==========
function inicializarSonido() {
  if (!audio || !sonidoBtn) return;

  audio.volume = 0.3;

  // Intentar reproducción automática
  window.addEventListener("DOMContentLoaded", () => {
    audio.play().catch((e) => {
      console.log("Reproducción automática bloqueada:", e);
      if (sonidoBtn) sonidoBtn.textContent = "🔇";
    });
  });

  // Control de sonido con botón
  sonidoBtn.addEventListener("click", () => {
    if (audio.paused) {
      audio.play();
      sonidoBtn.textContent = "🔊";
    } else {
      audio.pause();
      sonidoBtn.textContent = "🔇";
    }
  });

  // Activar sonido al hacer clic en la página
  document.body.addEventListener("click", () => {
    if (audio.paused) {
      audio
        .play()
        .then(() => {
          if (sonidoBtn) sonidoBtn.textContent = "🔊";
        })
        .catch(console.error);
    }
  });
}

// ========== SISTEMA DE IDIOMAS ==========
function cambiarIdioma(idioma) {
  idiomaActual = idioma;
  aplicarIdioma(idioma);

  // Guardar preferencia
  localStorage.setItem("idiomaPreferido", idioma);
}

function aplicarIdioma(idioma) {
  const t = textos[idioma];

  // Actualizar elementos del header
  const tituloHeader = document.querySelector("header h1");
  const subtituloHeader = document.querySelector("header p");
  const tituloBienvenida = document.querySelector(".info h2");
  const textoBienvenida = document.querySelector(".info p");
  const tituloEncuesta = document.querySelector(".form-header h2");

  if (tituloHeader) tituloHeader.textContent = t.tituloHeader;
  if (subtituloHeader) subtituloHeader.textContent = t.subtituloHeader;
  if (tituloBienvenida) tituloBienvenida.textContent = t.tituloBienvenida;
  if (textoBienvenida) textoBienvenida.textContent = t.textoBienvenida;
  if (tituloEncuesta) tituloEncuesta.textContent = t.tituloEncuesta;

  // Actualizar labels del formulario
  const labels = {
    'label[for="nombre"]': t.labelNombre,
    'label[for="identificacion"]': t.labelIdentificacion,
    'label[for="email"]': t.labelCorreo,
    'label[for="telefono"]': t.labelTelefono,
    'label[for="programa"]': t.labelPrograma,
    'label[for="opinion"]': t.labelOpinion,
  };

  Object.entries(labels).forEach(([selector, texto]) => {
    const element = document.querySelector(selector);
    if (element) element.textContent = texto;
  });

  // Actualizar botón de envío
  if (submitBtn) {
    const btnText = submitBtn.querySelector(".btn-text");
    if (btnText) btnText.textContent = t.btnEnviar;
  }

  // Actualizar sección de galería
  const tituloGaleria = document.querySelector(".galeria-instagram h3");
  const textoGaleria = document.querySelector(".galeria-instagram p");
  const botonGaleria = document.querySelector(".btn-galeria .btn-text");
  const botonSeguir = document.querySelector(".btn-seguir .btn-text");

  if (tituloGaleria) tituloGaleria.textContent = t.tituloGaleria;
  if (textoGaleria) textoGaleria.textContent = t.textoGaleria;
  if (botonGaleria) botonGaleria.textContent = t.verGaleria;
  if (botonSeguir) botonSeguir.textContent = t.seguirInstagram;
}

// ========== MANEJO DEL FORMULARIO ==========
function inicializarFormulario() {
  if (!form) return;

  form.addEventListener("submit", manejarEnvioFormulario);

  // Validación en tiempo real
  const emailInput = document.getElementById("email");
  if (emailInput) {
    emailInput.addEventListener("blur", validarEmail);
  }

  const telefonoInput = document.getElementById("telefono");
  if (telefonoInput) {
    telefonoInput.addEventListener("blur", validarTelefono);
  }
}

function validarEmail() {
  const emailInput = document.getElementById("email");
  if (!emailInput) return;

  const email = emailInput.value.trim();
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (email && !regex.test(email)) {
    mostrarError(emailInput, "Por favor ingresa un correo electrónico válido");
    return false;
  }

  limpiarError(emailInput);
  return true;
}

function validarTelefono() {
  const telefonoInput = document.getElementById("telefono");
  if (!telefonoInput) return true;

  const telefono = telefonoInput.value.trim().replace(/\s/g, "");
  const regex = /^[\+]?[0-9\s\-\(\)]{7,15}$/;

  if (telefono && !regex.test(telefono)) {
    mostrarError(
      telefonoInput,
      "Por favor ingresa un número de teléfono válido"
    );
    return false;
  }

  limpiarError(telefonoInput);
  return true;
}

function manejarEnvioFormulario(e) {
  e.preventDefault();

  // Validaciones básicas
  if (!validarEmail() || !validarTelefono()) return;

  // Obtener datos del formulario
  const datos = {
    nombre: document.getElementById("nombre").value.trim(),
    identificacion: document.getElementById("identificacion").value.trim(),
    correo: document.getElementById("email").value.trim(),
    telefono: document.getElementById("telefono").value.trim(),
    programa: document.getElementById("programa").value.trim(),
    opinion: document.getElementById("opinion").value.trim(),
  };

  // Validar que todos los campos estén completos
  for (const [key, value] of Object.entries(datos)) {
    if (!value) {
      mostrarErrorFormulario(`Por favor completa el campo: ${key}`);
      return;
    }
  }

  // Mostrar estado de carga
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML =
      '<span class="btn-text">' +
      textos[idiomaActual].textoCarga +
      '</span><span class="btn-icon">⏳</span>';
  }

  // Enviar datos al servidor
  enviarEncuesta(datos);
}

// Función para enviar datos al servidor
async function enviarEncuesta(datos) {
  try {
    const response = await fetch("/api/encuesta", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datos),
    });

    const resultado = await response.json();

    if (resultado.success) {
      // Redirigir a la página de agradecimiento
      window.location.href = "gracias.html";
    } else {
      mostrarErrorFormulario(resultado.message);
      restaurarBoton();
    }
  } catch (error) {
    console.error("Error al enviar encuesta:", error);
    mostrarErrorFormulario("Error de conexión. Intenta nuevamente.");
    restaurarBoton();
  }
}

// Función para mostrar errores del formulario
function mostrarErrorFormulario(mensaje) {
  if (!mensaje) return;

  mensaje.textContent = mensaje;
  mensaje.className = "mensaje error";

  // Auto-ocultar después de 5 segundos
  setTimeout(() => {
    mensaje.textContent = "";
    mensaje.className = "mensaje";
  }, 5000);
}

function restaurarBoton() {
  if (!submitBtn) return;

  submitBtn.disabled = false;
  submitBtn.innerHTML =
    '<span class="btn-text">' +
    textos[idiomaActual].btnEnviar +
    '</span><span class="btn-icon">🌴</span>';
}

// ========== SISTEMA DE ERRORES ==========
function mostrarError(inputElement, mensajeError) {
  const inputGroup = inputElement.parentNode;
  limpiarError(inputElement);

  inputElement.classList.add("error");

  const errorDiv = document.createElement("div");
  errorDiv.className = "input-error";
  errorDiv.innerHTML = `<span>⚠️</span> <span>${mensajeError}</span>`;
  inputGroup.appendChild(errorDiv);
}

function limpiarError(inputElement) {
  const inputGroup = inputElement.parentNode;
  const errorAnterior = inputGroup.querySelector(".input-error");
  if (errorAnterior) {
    errorAnterior.remove();
  }
  inputElement.classList.remove("error");
}

// ========== ANIMACIONES Y EFECTOS ==========
function crearElementosAnimados() {
  crearConfetiAmbiental();
  // Agregar más animaciones si es necesario
}

function crearConfetiAmbiental() {
  const contenedor = document.querySelector(".animales");
  if (!contenedor) return;

  const colores = ["#1b5e20", "#66bb6a", "#ffd54f", "#1e88e5"];

  for (let i = 0; i < 20; i++) {
    const confeti = document.createElement("div");
    confeti.className = "confeti-ambiental";
    confeti.style.cssText = `
      position: absolute;
      width: 6px;
      height: 6px;
      background: ${colores[Math.floor(Math.random() * colores.length)]};
      border-radius: 50%;
      pointer-events: none;
      animation: flotarConfeti ${Math.random() * 10 + 10}s linear infinite;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      animation-delay: ${Math.random() * 5}s;
    `;
    contenedor.appendChild(confeti);
  }
}

function crearEfectoExito() {
  const colores = ["#1b5e20", "#66bb6a", "#ffd54f", "#1e88e5"];

  for (let i = 0; i < 25; i++) {
    const confeti = document.createElement("div");
    confeti.className = "confeti-exito";
    confeti.style.cssText = `
      position: fixed;
      width: 8px;
      height: 8px;
      background: ${colores[Math.floor(Math.random() * colores.length)]};
      border-radius: 50%;
      top: 50%;
      left: 50%;
      pointer-events: none;
      z-index: 1000;
      animation: explotarConfeti 1s ease-out forwards;
    `;

    document.body.appendChild(confeti);

    setTimeout(() => {
      confeti.remove();
    }, 1000);
  }
}

// ========== ESTILOS DINÁMICOS ==========
const estilosDinamicos = `
  @keyframes explotarConfeti {
    0% {
      transform: translate(0, 0) scale(1);
      opacity: 1;
    }
    100% {
      transform: translate(${Math.random() * 200 - 100}px, ${
  Math.random() * 200 - 100
}px) scale(0);
      opacity: 0;
    }
  }
  
  @keyframes flotarConfeti {
    0%, 100% {
      transform: translateY(0px) rotate(0deg);
      opacity: 0.7;
    }
    50% {
      transform: translateY(-20px) rotate(180deg);
      opacity: 1;
    }
  }
  
  .confeti-ambiental {
    z-index: -1;
  }
  
  .input-error {
    color: #ff6b6b;
    font-size: 14px;
    margin-top: 8px;
    display: flex;
    align-items: center;
    gap: 8px;
    animation: fadeIn 0.3s ease;
  }
  
  input.error, textarea.error {
    border-color: #ff6b6b !important;
    box-shadow: 0 0 5px rgba(255, 107, 107, 0.5) !important;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  /* Estilos para la galería */
  .galeria-instagram {
    background: rgba(255, 255, 255, 0.1);
    padding: 2rem;
    border-radius: 15px;
    margin: 2rem 0;
    text-align: center;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  .galeria-instagram h3 {
    color: #fff;
    margin-bottom: 1rem;
    font-size: 1.5rem;
  }

  .galeria-instagram p {
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: 1.5rem;
  }

  .galeria-botones {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
  }

  .btn-galeria {
    background: linear-gradient(45deg, #667eea, #764ba2);
    color: white;
    border: none;
    padding: 0.8rem 1.5rem;
    border-radius: 25px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .btn-seguir {
    background: linear-gradient(45deg, #E4405F, #F77737);
  }

  .btn-galeria:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  }
`;

// Añadir estilos al documento
const styleSheet = document.createElement("style");
styleSheet.textContent = estilosDinamicos;
document.head.appendChild(styleSheet);

// ========== FUNCIONES GLOBALES ==========
function verAgradecimiento() {
  window.location.href = "gracias.html";
}

// Mejorar experiencia en dispositivos táctiles
if ("ontouchstart" in window) {
  document.body.classList.add("touch-device");
  const inputs = document.querySelectorAll("input, textarea, button");
  inputs.forEach((input) => {
    input.style.fontSize = "16px";
  });
}

// Cargar idioma guardado
const idiomaGuardado = localStorage.getItem("idiomaPreferido");
if (idiomaGuardado && textos[idiomaGuardado]) {
  cambiarIdioma(idiomaGuardado);
}
