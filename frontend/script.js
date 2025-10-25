document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("encuestaForm");
  const respuestaDiv = document.getElementById("respuesta");
  const spinner = document.getElementById("spinner");
  const mensaje = document.getElementById("mensaje");
  const boton = document.getElementById("enviarBtn");
  const formSection = document.getElementById("formSection");
  const identificacionInput = document.getElementById("identificacion");

  // Determinar la URL del backend (para producción/desarrollo)
  const API_URL =
    window.location.hostname === "localhost"
      ? "http://localhost:3000/api"
      : "/api";

  // Pequeño efecto de flotación del formulario al hacer scroll
  if (formSection) {
    window.addEventListener("scroll", () => {
      const scroll = window.scrollY;
      formSection.style.transform = `translateY(${scroll * 0.1}px)`;
    });
  }

  // Validación en tiempo real de identificación
  if (identificacionInput) {
    let timeoutId;

    identificacionInput.addEventListener("input", function () {
      clearTimeout(timeoutId);
      const identificacion = this.value.trim();

      // Limpiar mensajes anteriores
      const existingError = this.parentNode.querySelector(".input-error");
      if (existingError) {
        existingError.remove();
      }

      // Quitar estilo de error
      this.style.borderColor = "#009C3B";

      // Validar después de 1 segundo de inactividad
      if (identificacion.length > 0) {
        timeoutId = setTimeout(() => {
          verificarIdentificacion(identificacion);
        }, 1000);
      }
    });
  }

  // Función para verificar identificación en el servidor
  async function verificarIdentificacion(identificacion) {
    try {
      const response = await fetch(`${API_URL}/encuestas`);
      const result = await response.json();

      if (result.success) {
        const existe = result.data.some(
          (encuesta) => encuesta.identificacion === identificacion
        );

        if (existe) {
          mostrarErrorIdentificacion(
            "⚠️ Esta identificación ya está registrada"
          );
        }
      }
    } catch (error) {
      console.error("Error verificando identificación:", error);
    }
  }

  // Función para mostrar error de identificación
  function mostrarErrorIdentificacion(mensajeError) {
    const inputGroup = identificacionInput.parentNode;

    // Remover error anterior si existe
    const errorAnterior = inputGroup.querySelector(".input-error");
    if (errorAnterior) {
      errorAnterior.remove();
    }

    // Añadir estilo de error al input
    identificacionInput.style.borderColor = "#FF3333";
    identificacionInput.style.boxShadow = "0 0 0 3px rgba(255, 51, 51, 0.3)";

    // Crear mensaje de error
    const errorDiv = document.createElement("div");
    errorDiv.className = "input-error";
    errorDiv.style.color = "#FF3333";
    errorDiv.style.fontSize = "14px";
    errorDiv.style.marginTop = "5px";
    errorDiv.style.display = "flex";
    errorDiv.style.alignItems = "center";
    errorDiv.style.gap = "5px";
    errorDiv.innerHTML = `
      <span>❌</span>
      <span>${mensajeError}</span>
    `;

    inputGroup.appendChild(errorDiv);
  }

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = {
      nombre: document.getElementById("nombre").value,
      identificacion: document.getElementById("identificacion").value,
      programa: document.getElementById("programa").value,
      opinion: document.getElementById("opinion").value,
    };

    // Validación adicional antes de enviar
    if (!formData.identificacion.trim()) {
      mostrarErrorIdentificacion("La identificación es requerida");
      return;
    }

    // Efecto del botón
    if (boton) {
      boton.disabled = true;
      boton.textContent = "Enviando...";
      boton.style.opacity = "0.7";
    }

    // Mostrar spinner
    if (spinner) {
      spinner.style.display = "block";
    }
    form.style.display = "none";

    try {
      const response = await fetch(`${API_URL}/encuesta`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        // Mostrar mensaje de éxito con opción de ver agradecimiento
        if (respuestaDiv) {
          respuestaDiv.innerHTML = `
            <div class="success-message">
              <h3>✅ ${result.message}</h3>
              <p>¡Tu opinión es muy importante para nosotros!</p>
              <div style="margin-top: 20px;">
                <button onclick="location.reload()" class="btn-secondary">
                  📝 Enviar otra encuesta
                </button>
                <button onclick="verAgradecimiento()" class="btn-primary" style="margin-left: 10px;">
                  🎉 Ver mensaje de agradecimiento
                </button>
              </div>
            </div>
          `;
        }

        // También mostrar mensaje temporal
        if (mensaje) {
          mensaje.classList.remove("hidden");
          mensaje.textContent = "✅ ¡Encuesta enviada correctamente!";
          mensaje.style.opacity = "1";

          // Desvanecer el mensaje después de 4s
          setTimeout(() => {
            mensaje.style.opacity = "0";
          }, 4000);
        }

        // Reiniciar formulario
        form.reset();
      } else {
        // Manejar error específico de identificación duplicada
        if (result.message.includes("identificación ya ha sido registrada")) {
          mostrarErrorIdentificacion(result.message);
          form.style.display = "block";
          if (boton) {
            boton.disabled = false;
            boton.textContent = "Enviar opinión";
            boton.style.opacity = "1";
          }
        } else {
          throw new Error(result.message);
        }
      }
    } catch (error) {
      console.error("Error:", error);

      // Restaurar botón en caso de error
      if (boton) {
        boton.disabled = false;
        boton.textContent = "Enviar opinión";
        boton.style.opacity = "1";
      }

      // Mostrar formulario nuevamente
      form.style.display = "block";

      // Mostrar mensaje de error
      if (respuestaDiv) {
        respuestaDiv.innerHTML = `
          <div class="error-message">
            <h3>❌ Error al enviar la encuesta</h3>
            <p>${error.message}</p>
            <button onclick="location.reload()" class="btn-secondary">
              🔄 Intentar nuevamente
            </button>
          </div>
        `;
      }
    } finally {
      // Ocultar spinner
      if (spinner) {
        spinner.style.display = "none";
      }
    }
  });

  // Efectos visuales en los inputs
  const inputs = document.querySelectorAll("input, textarea, select");
  inputs.forEach((input) => {
    input.addEventListener("focus", function () {
      this.style.borderColor = "#FFCC29";
      this.style.boxShadow = "0 0 0 3px rgba(255, 204, 41, 0.3)";
    });

    input.addEventListener("blur", function () {
      // No cambiar color si hay error
      if (!this.parentNode.querySelector(".input-error")) {
        this.style.borderColor = "#009C3B";
        this.style.boxShadow = "none";
      }
    });
  });
});

// Función global para redirigir a la página de agradecimiento
function verAgradecimiento() {
  window.location.href = "gracias.html";
}
