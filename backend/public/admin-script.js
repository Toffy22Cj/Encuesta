// Script para el panel de administración
const API_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:3000/api"
    : "/api";

let datosEncuestas = [];

// Cargar datos al iniciar
document.addEventListener("DOMContentLoaded", function () {
  cargarDatos();
  // Actualizar cada 30 segundos
  setInterval(cargarDatos, 30000);
});

// Cargar datos desde la API
async function cargarDatos() {
  const tablaBody = document.getElementById("tablaBody");
  const mensajeDiv = document.getElementById("mensaje");

  try {
    tablaBody.innerHTML = `
            <tr>
                <td colspan="8" class="loading">
                    <div class="spinner"></div>
                    Cargando datos...
                </td>
            </tr>
        `;

    const [encuestasResponse, statsResponse] = await Promise.all([
      fetch(`${API_URL}/encuestas`),
      fetch(`${API_URL}/estadisticas`),
    ]);

    const encuestasData = await encuestasResponse.json();
    const statsData = await statsResponse.json();

    if (!encuestasData.success || !statsData.success) {
      throw new Error("Error al cargar datos");
    }

    datosEncuestas = encuestasData.data;

    // Actualizar estadísticas
    actualizarEstadisticas(statsData.data);

    // Actualizar tabla
    actualizarTabla(datosEncuestas);

    // Limpiar mensajes
    mensajeDiv.innerHTML = "";
  } catch (error) {
    console.error("Error:", error);
    tablaBody.innerHTML = `
            <tr>
                <td colspan="8" class="error">
                    ❌ Error al cargar los datos: ${error.message}
                </td>
            </tr>
        `;
  }
}

// Actualizar estadísticas
function actualizarEstadisticas(stats) {
  document.getElementById("totalRespuestas").textContent =
    stats.totalRespuestas;
  document.getElementById("totalProgramas").textContent = Object.keys(
    stats.programas
  ).length;

  if (stats.fechaUltima) {
    const fecha = new Date(stats.fechaUltima).toLocaleString();
    document.getElementById("ultimaFecha").textContent = fecha;
  }
}

// Actualizar tabla con animación
function actualizarTabla(datos) {
  const tablaBody = document.getElementById("tablaBody");

  if (datos.length === 0) {
    tablaBody.innerHTML = `
            <tr>
                <td colspan="8" class="empty-state">
                    📝 No hay encuestas registradas todavía
                </td>
            </tr>
        `;
    return;
  }

  tablaBody.innerHTML = "";

  datos.forEach((item, index) => {
    const fila = document.createElement("tr");
    fila.style.opacity = "0";
    fila.style.transform = "translateY(20px)";

    const fecha = new Date(item.fecha).toLocaleString();

    fila.innerHTML = `
            <td>${item.nombre}</td>
            <td>${item.identificacion}</td>
            <td><a href="mailto:${item.correo}">${item.correo}</a></td>
            <td><a href="tel:${item.telefono}">${item.telefono}</a></td>
            <td>${item.programa}</td>
            <td title="${item.opinion}">${
      item.opinion.length > 50
        ? item.opinion.substring(0, 50) + "..."
        : item.opinion
    }</td>
            <td>${fecha}</td>
            <td>
                <button class="action-btn" onclick="eliminarEncuesta('${
                  item.id
                }')" title="Eliminar">
                    🗑️
                </button>
            </td>
        `;

    tablaBody.appendChild(fila);

    // Animación de entrada
    setTimeout(() => {
      fila.style.transition = "all 0.6s ease";
      fila.style.opacity = "1";
      fila.style.transform = "translateY(0)";
    }, index * 100);
  });
}

// Eliminar encuesta
async function eliminarEncuesta(id) {
  if (!confirm("¿Estás seguro de que quieres eliminar esta encuesta?")) {
    return;
  }

  const mensajeDiv = document.getElementById("mensaje");

  try {
    const response = await fetch(`${API_URL}/encuestas/${id}`, {
      method: "DELETE",
    });

    const result = await response.json();

    if (result.success) {
      mensajeDiv.innerHTML = `
                <div class="success">
                    ✅ ${result.message}
                </div>
            `;
      cargarDatos(); // Recargar datos
    } else {
      throw new Error(result.message);
    }
  } catch (error) {
    mensajeDiv.innerHTML = `
            <div class="error">
                ❌ Error al eliminar: ${error.message}
            </div>
        `;
  }
}

// Exportar datos
function exportarDatos() {
  window.open(`${API_URL}/exportar`, "_blank");
}

// Ir al formulario de encuesta
function irAEncuesta() {
  window.location.href = "/";
}

// Limpiar todos los datos
async function limpiarDatos() {
  if (
    !confirm(
      "⚠️ ¿ESTÁS SEGURO? Esto eliminará TODAS las encuestas y no se puede deshacer."
    )
  ) {
    return;
  }

  const mensajeDiv = document.getElementById("mensaje");

  try {
    // Eliminar una por una (en un sistema real tendrías un endpoint para limpiar todo)
    for (const encuesta of datosEncuestas) {
      await fetch(`${API_URL}/encuestas/${encuesta.id}`, {
        method: "DELETE",
      });
    }

    mensajeDiv.innerHTML = `
            <div class="success">
                ✅ Todas las encuestas han sido eliminadas
            </div>
        `;

    cargarDatos(); // Recargar datos vacíos
  } catch (error) {
    mensajeDiv.innerHTML = `
            <div class="error">
                ❌ Error al limpiar datos: ${error.message}
            </div>
        `;
  }
}
