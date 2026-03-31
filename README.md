# Máquina de Turing Retro

¡Bienvenido a la Máquina de Turing Retro! 🕹️

Este proyecto es un emulador visual e interactivo de máquinas de Turing, diseñado para que puedas experimentar, aprender y divertirte programando tus propias máquinas, ¡todo desde tu navegador!

## 🚀 ¿Qué es una máquina de Turing?
Una máquina de Turing es un modelo matemático fundamental en la computación, capaz de ejecutar cualquier algoritmo. Es ideal para aprender sobre lógica, autómatas y los límites de la computación.

## 🌐 ¿Dónde puedo probalo on-line?
- [Haz clic aquí para abrir la demo](http://maquinas-de-turing-turing-tmluvi-baea7e-144-225-147-9.traefik.me/)  
- [Canal de YouTube con ejecución de algunas máquinas](https://www.youtube.com/@ass-j4j)  

En el archivo GUIDE.md obtendrás información paso a paso de como usarlo.

## 🎨 Características principales
- **Interfaz retro y visual**: Inspirada en los viejos sistemas, con una estética atractiva y clara.
- **Editor de programas**: Crea, edita y guarda tus propias máquinas de Turing.
- **Simulación paso a paso**: Ejecuta tu máquina lentamente, paso a paso, o de forma automática.
- **Cinta interactiva**: Modifica la cinta con solo hacer clic, y observa cómo evoluciona durante la ejecución.
- **Ejemplos incluidos**: Prueba máquinas clásicas como el famoso "Busy Beaver".

## 🖥️ ¿Cómo usarlo?
1. **Instala las dependencias**:
   ```bash
   npm install
   ```
2. **Inicia el servidor**:
   ```bash
   node server.js
   ```
3. **Abre tu navegador** y visita [http://localhost:3000](http://localhost:3000)
4. **Edita o crea tu máquina** usando la tabla de estados.
5. **Configura la cinta** haciendo clic en las celdas para cambiar su valor.
6. **Ejecuta la simulación** usando los botones de control (paso, correr, pausar, reiniciar).

## 📁 Estructura del proyecto
- `server.js`: Servidor Express para servir la app y guardar programas.
- `public/Turing.html`: Interfaz principal del emulador.
- `public/mvc/`: Lógica del modelo-vista-controlador para la simulación.
- `public/archivos/`: Carpeta donde se guardan tus programas en formato JSON.

## 🤩 ¿Por qué probarlo?
- Es una herramienta educativa y divertida.
- Te permite experimentar con conceptos fundamentales de la computación.
- ¡Puedes compartir y guardar tus propias máquinas!

## 🛠️ Créditos y tecnologías
- Node.js, Express, Bootstrap, FontAwesome.
- Inspirado en la pasión por la computación retro y la enseñanza interactiva.

---

¡Anímate a crear, modificar y compartir tus propias máquinas de Turing! Si tienes dudas o sugerencias, no dudes en contribuir o abrir un issue.

