const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const DB_PATH = path.join(__dirname, "encuestas.db");

// Crear y configurar la base de datos
const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error("Error al conectar con la base de datos:", err.message);
  } else {
    console.log("✅ Conectado a la base de datos SQLite.");
    initializeDatabase();
  }
});

// Inicializar la tabla
function initializeDatabase() {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS encuestas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      identificacion TEXT UNIQUE NOT NULL,
      correo TEXT NOT NULL,
      telefono TEXT NOT NULL,
      programa TEXT NOT NULL,
      opinion TEXT NOT NULL,
      fecha DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `;

  db.run(createTableQuery, (err) => {
    if (err) {
      console.error("Error al crear la tabla:", err.message);
    } else {
      console.log('✅ Tabla "encuestas" lista.');
      insertSampleData();
    }
  });
}

// Insertar datos de ejemplo si la tabla está vacía
function insertSampleData() {
  const checkQuery = "SELECT COUNT(*) as count FROM encuestas";

  db.get(checkQuery, (err, row) => {
    if (err) {
      console.error("Error al verificar datos:", err.message);
      return;
    }

    if (row.count === 0) {
      const sampleData = [
        {
          nombre: "Carlos Pérez",
          identificacion: "123456",
          correo: "carlos@example.com",
          telefono: "1234567890",
          programa: "Ingeniería en Software",
          opinion: "Excelente stand, muy creativo!",
        },
        {
          nombre: "María Silva",
          identificacion: "789012",
          correo: "maria@example.com",
          telefono: "0987654321",
          programa: "Diseño Gráfico",
          opinion: "Colores y energía vibrante, me encantó.",
        },
        {
          nombre: "João Santos",
          identificacion: "456789",
          correo: "joao@example.com",
          telefono: "5551234567",
          programa: "Ciencias Sociales",
          opinion: "Buena atención y muy informativo.",
        },
      ];

      const insertQuery = `
        INSERT INTO encuestas (nombre, identificacion, correo, telefono, programa, opinion)
        VALUES (?, ?, ?, ?, ?, ?)
      `;

      sampleData.forEach((data) => {
        db.run(
          insertQuery,
          [
            data.nombre,
            data.identificacion,
            data.correo,
            data.telefono,
            data.programa,
            data.opinion,
          ],
          (err) => {
            if (err) {
              console.error("Error al insertar dato de ejemplo:", err.message);
            }
          }
        );
      });

      console.log("📝 Datos de ejemplo insertados.");
    }
  });
}

// Funciones para operaciones CRUD
const database = {
  // Obtener todas las encuestas
  getAllEncuestas: () => {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM encuestas ORDER BY fecha DESC";
      db.all(query, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  },

  // Obtener encuesta por ID
  getEncuestaById: (id) => {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM encuestas WHERE id = ?";
      db.get(query, [id], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  },

  // Crear nueva encuesta
  createEncuesta: (encuestaData) => {
    return new Promise((resolve, reject) => {
      const query = `
        INSERT INTO encuestas (nombre, identificacion, correo, telefono, programa, opinion)
        VALUES (?, ?, ?, ?, ?, ?)
      `;

      const params = [
        encuestaData.nombre,
        encuestaData.identificacion,
        encuestaData.correo,
        encuestaData.telefono,
        encuestaData.programa,
        encuestaData.opinion,
      ];

      db.run(query, params, function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID, ...encuestaData });
        }
      });
    });
  },

  // Eliminar encuesta
  deleteEncuesta: (id) => {
    return new Promise((resolve, reject) => {
      const query = "DELETE FROM encuestas WHERE id = ?";
      db.run(query, [id], function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.changes > 0);
        }
      });
    });
  },

  // Verificar si identificación existe
  identificacionExiste: (identificacion) => {
    return new Promise((resolve, reject) => {
      const query =
        "SELECT COUNT(*) as count FROM encuestas WHERE identificacion = ?";
      db.get(query, [identificacion], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row.count > 0);
        }
      });
    });
  },

  // Obtener estadísticas
  getEstadisticas: () => {
    return new Promise((resolve, reject) => {
      const queries = {
        total: "SELECT COUNT(*) as total FROM encuestas",
        programas:
          "SELECT programa, COUNT(*) as count FROM encuestas GROUP BY programa",
        ultima: "SELECT * FROM encuestas ORDER BY fecha DESC LIMIT 1",
        primera: "SELECT * FROM encuestas ORDER BY fecha ASC LIMIT 1",
      };

      db.get(queries.total, (err, totalRow) => {
        if (err) return reject(err);

        db.all(queries.programas, (err, programasRows) => {
          if (err) return reject(err);

          db.get(queries.ultima, (err, ultimaRow) => {
            if (err) return reject(err);

            db.get(queries.primera, (err, primeraRow) => {
              if (err) return reject(err);

              const programas = {};
              programasRows.forEach((row) => {
                programas[row.programa] = row.count;
              });

              resolve({
                totalRespuestas: totalRow.total,
                programas: programas,
                ultimaEncuesta: ultimaRow,
                fechaPrimera: primeraRow ? primeraRow.fecha : null,
                fechaUltima: ultimaRow ? ultimaRow.fecha : null,
              });
            });
          });
        });
      });
    });
  },
};

module.exports = database;
