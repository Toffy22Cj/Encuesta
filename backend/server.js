const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

app.use(express.static("./public")); // Sirve archivos estáticos
// Página del panel admin
app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/admin.html"));
});
// Archivo para guardar respuestas
const DATA_FILE = path.join(__dirname, "db.json");

// Inicializar archivo de datos si no existe
function initializeDataFile() {
  if (!fs.existsSync(DATA_FILE)) {
    const initialData = {
      encuestas: [
        {
          id: "1",
          nombre: "Carlos Pérez",
          identificacion: "123456",
          programa: "Ingeniería en Software",
          opinion: "Excelente stand, muy creativo!",
          fecha: new Date().toISOString(),
        },
        {
          id: "2",
          nombre: "María Silva",
          identificacion: "789012",
          programa: "Diseño Gráfico",
          opinion: "Colores y energía vibrante, me encantó.",
          fecha: new Date().toISOString(),
        },
        {
          id: "3",
          nombre: "João Santos",
          identificacion: "456789",
          programa: "Ciencias Sociales",
          opinion: "Buena atención y muy informativo.",
          fecha: new Date().toISOString(),
        },
      ],
    };
    fs.writeFileSync(DATA_FILE, JSON.stringify(initialData, null, 2));
    console.log("📁 Archivo de datos inicializado con ejemplos");
  }
}

// Leer datos existentes
function readData() {
  try {
    const data = fs.readFileSync(DATA_FILE, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error leyendo datos:", error);
    return { encuestas: [] };
  }
}

// Guardar datos
function saveData(data) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error("Error guardando datos:", error);
    return false;
  }
}

// Ruta principal - sirve el formulario
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

// Ruta para el panel de administración
app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/admin.html"));
});

// Ruta para obtener todas las encuestas
app.get("/api/encuestas", (req, res) => {
  try {
    const data = readData();
    res.json({
      success: true,
      data: data.encuestas,
      total: data.encuestas.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al obtener las encuestas",
    });
  }
});

// Ruta para obtener una encuesta específica
app.get("/api/encuestas/:id", (req, res) => {
  try {
    const data = readData();
    const encuesta = data.encuestas.find((e) => e.id === req.params.id);

    if (!encuesta) {
      return res.status(404).json({
        success: false,
        message: "Encuesta no encontrada",
      });
    }

    res.json({
      success: true,
      data: encuesta,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al obtener la encuesta",
    });
  }
});

// Ruta para enviar nueva encuesta
// Luego actualiza la ruta POST /api/encuesta:
// Ruta para enviar nueva encuesta
app.post("/api/encuesta", (req, res) => {
  try {
    const { nombre, identificacion, correo, telefono, programa, opinion } =
      req.body;

    // Validación básica
    if (
      !nombre ||
      !identificacion ||
      !correo ||
      !telefono ||
      !programa ||
      !opinion
    ) {
      return res.status(400).json({
        success: false,
        message: "Todos los campos son requeridos",
      });
    }

    // Validación de formato de correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo)) {
      return res.status(400).json({
        success: false,
        message: "El formato del correo electrónico no es válido",
      });
    }

    // Validación de formato de teléfono
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{7,15}$/;
    if (!phoneRegex.test(telefono.replace(/\s/g, ""))) {
      return res.status(400).json({
        success: false,
        message: "El formato del teléfono no es válido",
      });
    }

    // Validación de identificación duplicada
    if (identificacionExiste(identificacion)) {
      return res.status(400).json({
        success: false,
        message:
          "Esta identificación ya ha sido registrada. Por favor, usa una identificación diferente.",
      });
    }

    const data = readData();

    const nuevaEncuesta = {
      id: Date.now().toString(),
      nombre: nombre.trim(),
      identificacion: identificacion.trim(),
      correo: correo.trim(),
      telefono: telefono.trim(),
      programa: programa.trim(),
      opinion: opinion.trim(),
      fecha: new Date().toISOString(),
    };

    data.encuestas.push(nuevaEncuesta);
    const guardado = saveData(data);

    if (!guardado) {
      throw new Error("Error al guardar los datos");
    }

    res.json({
      success: true,
      message: "¡Gracias por tu respuesta! 🇧🇷",
      data: nuevaEncuesta,
    });
  } catch (error) {
    console.error("Error al guardar encuesta:", error);
    res.status(500).json({
      success: false,
      message: "Error interno del servidor: " + error.message,
    });
  }
});
// Ruta para eliminar una encuesta
app.delete("/api/encuestas/:id", (req, res) => {
  try {
    const data = readData();
    const index = data.encuestas.findIndex((e) => e.id === req.params.id);

    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: "Encuesta no encontrada",
      });
    }

    const eliminada = data.encuestas.splice(index, 1)[0];
    const guardado = saveData(data);

    if (!guardado) {
      throw new Error("Error al guardar los datos después de eliminar");
    }

    res.json({
      success: true,
      message: "Encuesta eliminada correctamente",
      data: eliminada,
    });
  } catch (error) {
    console.error("Error al eliminar encuesta:", error);
    res.status(500).json({
      success: false,
      message: "Error al eliminar la encuesta",
    });
  }
});

// Ruta para estadísticas
app.get("/api/estadisticas", (req, res) => {
  try {
    const data = readData();
    const total = data.encuestas.length;

    const estadisticas = {
      totalRespuestas: total,
      programas: {},
      ultimaEncuesta: data.encuestas[data.encuestas.length - 1],
      fechaPrimera: data.encuestas[0] ? data.encuestas[0].fecha : null,
      fechaUltima: data.encuestas[data.encuestas.length - 1]
        ? data.encuestas[data.encuestas.length - 1].fecha
        : null,
    };

    // Contar por programa
    data.encuestas.forEach((encuesta) => {
      estadisticas.programas[encuesta.programa] =
        (estadisticas.programas[encuesta.programa] || 0) + 1;
    });

    res.json({
      success: true,
      data: estadisticas,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al obtener estadísticas",
    });
  }
});

function identificacionExiste(identificacion) {
  const data = readData();
  return data.encuestas.some(
    (encuesta) => encuesta.identificacion === identificacion.trim()
  );
}
// Ruta para exportar datos
app.get("/api/exportar", (req, res) => {
  try {
    const data = readData();

    res.setHeader("Content-Type", "application/json");
    res.setHeader("Content-Disposition", "attachment; filename=encuestas.json");

    res.send(JSON.stringify(data, null, 2));
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al exportar datos",
    });
  }
});

// Manejo de rutas no encontradas
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Ruta no encontrada",
  });
});

// Inicializar servidor
app.listen(PORT, () => {
  initializeDataFile();
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📊 API disponible en http://localhost:${PORT}/api`);
  console.log(`👨‍💼 Panel admin en http://localhost:${PORT}/admin`);
  console.log(`📝 Formulario en http://localhost:${PORT}/`);
});
