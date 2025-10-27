const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
require("dotenv").config();

const database = require("./database"); // Importar la base de datos

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("./public"));

// Ruta principal - sirve el formulario
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

// Ruta para el panel de administración
app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/admin.html"));
});

// Ruta para obtener todas las encuestas
app.get("/api/encuestas", async (req, res) => {
  try {
    const encuestas = await database.getAllEncuestas();
    res.json({
      success: true,
      data: encuestas,
      total: encuestas.length,
    });
  } catch (error) {
    console.error("Error al obtener encuestas:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener las encuestas",
    });
  }
});

// Ruta para obtener una encuesta específica
app.get("/api/encuestas/:id", async (req, res) => {
  try {
    const encuesta = await database.getEncuestaById(req.params.id);

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
    console.error("Error al obtener encuesta:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener la encuesta",
    });
  }
});

// Ruta para enviar nueva encuesta
app.post("/api/encuesta", async (req, res) => {
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
    const existe = await database.identificacionExiste(identificacion);
    if (existe) {
      return res.status(400).json({
        success: false,
        message:
          "Esta identificación ya ha sido registrada. Por favor, usa una identificación diferente.",
      });
    }

    const nuevaEncuesta = await database.createEncuesta({
      nombre: nombre.trim(),
      identificacion: identificacion.trim(),
      correo: correo.trim(),
      telefono: telefono.trim(),
      programa: programa.trim(),
      opinion: opinion.trim(),
    });

    res.json({
      success: true,
      message: "¡Gracias por tu respuesta! 🇧🇷",
      data: nuevaEncuesta,
    });
  } catch (error) {
    console.error("Error al guardar encuesta:", error);

    // Manejar error de duplicado de SQLite
    if (error.message.includes("UNIQUE constraint failed")) {
      return res.status(400).json({
        success: false,
        message: "Esta identificación ya ha sido registrada.",
      });
    }

    res.status(500).json({
      success: false,
      message: "Error interno del servidor: " + error.message,
    });
  }
});

// Ruta para eliminar una encuesta
app.delete("/api/encuestas/:id", async (req, res) => {
  try {
    const eliminada = await database.deleteEncuesta(req.params.id);

    if (!eliminada) {
      return res.status(404).json({
        success: false,
        message: "Encuesta no encontrada",
      });
    }

    res.json({
      success: true,
      message: "Encuesta eliminada correctamente",
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
app.get("/api/estadisticas", async (req, res) => {
  try {
    const estadisticas = await database.getEstadisticas();

    res.json({
      success: true,
      data: estadisticas,
    });
  } catch (error) {
    console.error("Error al obtener estadísticas:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener estadísticas",
    });
  }
});

// Ruta para exportar datos
app.get("/api/exportar", async (req, res) => {
  try {
    const encuestas = await database.getAllEncuestas();
    const data = { encuestas };

    res.setHeader("Content-Type", "application/json");
    res.setHeader("Content-Disposition", "attachment; filename=encuestas.json");
    res.send(JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Error al exportar datos:", error);
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
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📊 API disponible en http://localhost:${PORT}/api`);
  console.log(`👨‍💼 Panel admin en http://localhost:${PORT}/admin`);
  console.log(`📝 Formulario en http://localhost:${PORT}/`);
});
