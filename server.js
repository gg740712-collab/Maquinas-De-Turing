const express = require('express');
const fs = require('node:fs');
const path = require('node:path');
const bodyParser = require('body-parser');

// Usa el puerto definido en la variable de entorno o 3000 por defecto
const PORT = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.json()); // para parsear JSON en el body

// Ruta POST para guardar un archivo JSON
app.post('/guardar', (req, res) => {
  const { nombre, contenido } = req.body;

  if (!nombre || !contenido) {
    return res.status(400).send('Faltan datos');
  }

  const ruta = path.join(__dirname, 'public','archivos', nombre);

  fs.writeFile(ruta, JSON.stringify(contenido, null, 2), (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error al guardar');
    }
    res.send('Archivo guardado correctamente');
  });
});

// Ruta GET para listar archivos
app.get('/archivos', (req, res) => {
  const ruta = path.join(__dirname, 'public', 'archivos');
  fs.readdir(ruta, (err, files) => {
    if (err) {
      return res.status(500).send('Error al leer directorio');
    }
    res.json(files);
  });
});

// Ruta GET que devuelve un HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'Turing.html'));
});

// Servir archivos estáticos (CSS, JS, imágenes, etc.)
app.use(express.static(path.join(__dirname, 'public')));




app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});