let maquinaTuring = "NONE";
let puedemodificarcinta = true;
let contadorEstado = 0;

function esperar(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function estadoMaquinaTuring(){
  if (maquinaTuring === "NONE")
    return 0;
  return maquinaTuring.estadoactual;
}

async function ejecutarMaquinaTuring(maquinaTuring) {
  runBtn.disabled = true;
  pauseBtn.disabled = false;
  stepBtn.disabled = true;

  while (maquinaTuring.hayinstrucciones() && pauseBtn.disabled === false) {
    const { escritura, direccion, proximoEstado } =
      maquinaTuring.ejecutarInstruccion();
    grabarYmover(escritura, direccion);
    if (proximoEstado!==-1) colorear(proximoEstado);
    //console.log(escritura, direccion, proximoEstado);
    await esperar(speed);
  }

  runBtn.disabled = false;
  pauseBtn.disabled = true;
  stepBtn.disabled = false;

  showNotification("La ejecución finalizó exitosamente", "success");
}

async function ejecutarMaquinaBusyBeaver3() {
  const estado0 = new Estado(
    new NodoEstado("1", true, 1),
    new NodoEstado("1", false, 2)
  );
  const estado1 = new Estado(
    new NodoEstado("1", false, 0),
    new NodoEstado("1", true, 1)
  );
  const estado2 = new Estado(
    new NodoEstado("1", false, 1),
    new NodoEstado("1", true, -1)
  );

  const mipgm = new Programa();
  mipgm.agregarEstado(estado0);
  mipgm.agregarEstado(estado1);
  mipgm.agregarEstado(estado2);

  const micinta = new Cinta();

  const maquinaTuring = new MaquinaTuring(mipgm, micinta);
  await ejecutarMaquinaTuring(maquinaTuring);
}

function maquinaBusyBeaver4() {
  const estado0 = new Estado(
    new NodoEstado("1", true, 1),
    new NodoEstado("1", false, 1)
  );
  const estado1 = new Estado(
    new NodoEstado("1", false, 0),
    new NodoEstado("0", false, 2)
  );
  const estado2 = new Estado(
    new NodoEstado("1", false, -1),
    new NodoEstado("1", false, 3)
  );
  const estado3 = new Estado(
    new NodoEstado("1", true, 3),
    new NodoEstado("0", true, 0)
  );

  const mipgm = new Programa();
  mipgm.agregarEstado(estado0);
  mipgm.agregarEstado(estado1);
  mipgm.agregarEstado(estado2);
  mipgm.agregarEstado(estado3);

  const micinta = new Cinta();

  return new MaquinaTuring(mipgm, micinta);
}

function maquinaBusyBeaver501() {
  const estado0 = new Estado(
    new NodoEstado("1", true, 1),
    new NodoEstado("0", false, 2)
  );
  const estado1 = new Estado(
    new NodoEstado("1", true, 2),
    new NodoEstado("1", true, 3)
  );
  const estado2 = new Estado(
    new NodoEstado("1", false, 0),
    new NodoEstado("0", true, 1)
  );
  const estado3 = new Estado(
    new NodoEstado("0", true, 4),
    new NodoEstado("1", true, -1)
  );
  const estado4 = new Estado(
    new NodoEstado("1", false, 2),
    new NodoEstado("1", true, 0)
  );

  const mipgm = new Programa();
  mipgm.agregarEstado(estado0);
  mipgm.agregarEstado(estado1);
  mipgm.agregarEstado(estado2);
  mipgm.agregarEstado(estado3);
  mipgm.agregarEstado(estado4);

  const micinta = new Cinta();

  return new MaquinaTuring(mipgm, micinta);
}

async function ejecutarMaquinaActual() {
  crearMaquina();

  const inicio = Date.now();
  await ejecutarMaquinaTuring(maquinaTuring);
  const fin = Date.now();
  console.log(`Tiempo transcurrido: ${fin - inicio} ms`);
}

function pausar() {
  pauseBtn.disabled = true;
}
function pasoapaso() {
  crearMaquina();
  
  const { escritura, direccion, proximoEstado } =
    maquinaTuring.ejecutarInstruccion();
  
  grabarYmover(escritura, direccion);
  if (proximoEstado!==-1) colorear(proximoEstado);
  console.log(">>> ",maquinaTuring.toString());
}

function crearMaquina() {
  puedemodificarcinta = false;
  if (maquinaTuring !== "NONE") return;
   
  const definicionMaquina = capturarMaquina();
  const programaTuring = new Programa();

  for (const nombreEstado in definicionMaquina) {
    //console.log(`Estado: ${nombreEstado}`);

    const transiciones = definicionMaquina[nombreEstado];
    const nodoParaSimbolo0 = procesarTransicion("0", transiciones["0"]);
    const nodoParaSimbolo1 = procesarTransicion("1", transiciones["1"]);

    const estado = new Estado(nodoParaSimbolo0, nodoParaSimbolo1);
    programaTuring.agregarEstado(estado);
  }

  const cinta = new Cinta();
  cinta.copiarEstado(obtener_estado());
  maquinaTuring = new MaquinaTuring(programaTuring, cinta);
}

function procesarTransicion(simbolo, transicion) {
  const [nuevoSimbolo, direccion, siguienteEstado] = transicion;

  //console.log(`  Si lee "${simbolo}": escribe "${nuevoSimbolo}", se mueve "${direccion}" y va a "${siguienteEstado}"`);
  const direccionADerecha = direccion === "R";

  let numeroEstado = siguienteEstado.slice(1);
  numeroEstado = (numeroEstado === "in") ? -1 : Number(numeroEstado);

  return new NodoEstado(nuevoSimbolo, direccionADerecha, numeroEstado);
}
function resetMaquina() {
  maquinaTuring = "NONE";
  puedemodificarcinta = true;
  
  init();
  colorear(0);
}
function eliminarFila(btn) {
  btn.closest("tr").remove();
  renumerarEstados();
}

function renumerarEstados() {
  const filas = document.querySelectorAll("#tablaTuring tr");
  contadorEstado = 0;
  for (let i = 2; i < filas.length; i++) {
    filas[i].children[0].textContent = `q${contadorEstado++}`;
  }
}

function agregarEstado(nombre = `q${contadorEstado++}`, transiciones = []) {
  const tabla = document.getElementById("tablaTuring");
  const fila = document.createElement("tr");

  let contenido = `<td class="negrita">${nombre}</td>`;
  for (let i = 0; i < 6; i++) {
    const valor = transiciones[i] || "";
    contenido += `<td><input class="col-12 input-table" value="${valor}"></td>`;
  }
  contenido += `<td><button class="btnEliminar border-0 bg-transparent" onclick="eliminarFila(this)"><i class="bi bi-trash" style="cursor: pointer;"></i></button></td>`;
  fila.innerHTML = contenido;
  tabla.appendChild(fila);
  renumerarEstados();
}

function capturarMaquina() {
  const filas = document.querySelectorAll("#tablaTuring tr");
  const maquina = {};

  for (let i = 2; i < filas.length; i++) {
    const celdas = filas[i].children;
    const estado = celdas[0].textContent.trim();
    const valores = [];

    for (let j = 1; j <= 6; j++) {
      valores.push(celdas[j].querySelector("input").value.trim());
    }

    maquina[estado] = {
      0: valores.slice(0, 3),
      1: valores.slice(3, 6),
    };
  }
  return maquina;
}

function guardarMaquina() {
  // Mostrar el prompt
  Swal.fire({
    title: '¿Cuál es el nombre de la máquina?',
    input: 'text',
    inputPlaceholder: 'Escribilo acá',
    showCancelButton: true,
    confirmButtonText: 'Aceptar',
    cancelButtonText: 'Cancelar'
  }).then((resultado) => {
    if (resultado.isConfirmed) {
      console.log("Nombre ingresado:", resultado.value);
      if (resultado.value!==""){
        const maquina = capturarMaquina();
        localStorage.setItem(`maquinaTuring_${resultado.value}`, JSON.stringify(maquina));
      }
    } else {
      console.log("El usuario canceló");
    }
  });
}

function obtenerMaquinasDeLocalStorage(){
  // Preparar las opciones tomando las claves que comienzan con "maquinaTuring_"
  let opcionesHTML = '<select id="selectorMaquinaAlert" class="form-select">';

  for (let i = 0; i < localStorage.length; i++) {
    const clave = localStorage.key(i);

    // Filtramos claves con el prefijo deseado
    if (clave.startsWith("maquinaTuring_")) {
      // Usamos el valor como texto de opción y la clave como valor
      opcionesHTML += `<option value="${clave}">${clave.substring(14)}</option>`;
    }
  }
  opcionesHTML += '</select>';
  return opcionesHTML;
}
function cargarMaquina() {
  // Preparar las opciones tomando las claves que comienzan con "maquinaTuring_"
  let opcionesHTML = obtenerMaquinasDeLocalStorage();

  // Mostrar SweetAlert con opciones generadas dinámicamente
  Swal.fire({
    title: 'Seleccioná una máquina',
    html: opcionesHTML,
    showCancelButton: true,
    confirmButtonText: 'Aceptar',
    cancelButtonText: 'Cancelar',
    preConfirm: () => {
      const seleccion = document.getElementById('selectorMaquinaAlert').value;
      return seleccion;
    }
  }).then((resultado) => {
    if (resultado.isConfirmed) {
      console.log("***Clave seleccionada:", resultado.value);
      console.log("***Nombre de máquina:", localStorage.getItem(resultado.value));
      
      console.log("**",localStorage.getItem(resultado.value));
      const maquina = JSON.parse(localStorage.getItem(resultado.value));
      const tabla = document.getElementById("tablaTuring");

      tabla.querySelectorAll("tr").forEach((f, i) => {
        if (i >= 2) f.remove();
      });

      Object.entries(maquina).forEach(([estado, datos]) => {
        const fila = [...datos["0"], ...datos["1"]];
        agregarEstado(estado, fila);
      });
    }
  });
}

function eliminarMaquina() {
  // Preparar las opciones tomando las claves que comienzan con "maquinaTuring_"
  let opcionesHTML = obtenerMaquinasDeLocalStorage();

  // Mostrar SweetAlert con opciones generadas dinámicamente
  Swal.fire({
    title: 'Seleccioná una máquina',
    html: opcionesHTML,
    showCancelButton: true,
    confirmButtonText: 'Aceptar',
    cancelButtonText: 'Cancelar',
    preConfirm: () => {
      const seleccion = document.getElementById('selectorMaquinaAlert').value;
      return seleccion;
    }
  }).then((resultado) => {
    if (resultado.isConfirmed) {
      localStorage.removeItem(resultado.value);
    }
  });
}

function exportarMaquina() {
  // Mostrar el prompt
  Swal.fire({
    title: '¿Cuál es el nombre de la máquina?',
    input: 'text',
    inputPlaceholder: 'Escribilo acá',
    showCancelButton: true,
    confirmButtonText: 'Aceptar',
    cancelButtonText: 'Cancelar'
  }).then((resultado) => {
    if (resultado.isConfirmed) {
      console.log("Nombre ingresado:", resultado.value);
      if (resultado.value !== "") {
        const maquina = capturarMaquina(); // tu función que arma el objeto
        if (maquina) {
          // Enviar al servidor vía POST
          fetch('/guardar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              nombre: `${resultado.value}.json`,
              contenido: maquina
            })
          })
          .then(res => res.text())
          .then(msg => {
            console.log("Respuesta del servidor:", msg);
            Swal.fire("Éxito", "La máquina se guardó en el servidor", "success");
          })
          .catch(err => {
            console.error("Error al guardar:", err);
            Swal.fire("Error", "No se pudo guardar la máquina", "error");
          });
        }
      }
    } else {
      console.log("El usuario canceló");
    }
  });
}

function importarMaquina() {
  // Preparar las opciones tomando las claves que comienzan con "maquinaTuring_"
  let opcionesHTML =
    '<input type="file" id="archivoMaquinaAlert" accept=".json" >';

  // Mostrar SweetAlert con opciones generadas dinámicamente
  Swal.fire({
    title: "Seleccioná una máquina",
    html: opcionesHTML,
    showCancelButton: true,
    confirmButtonText: "Aceptar",
    cancelButtonText: "Cancelar",
    preConfirm: () => {
      const archivoInput = document.getElementById("archivoMaquinaAlert");
      console.log(archivoInput);
      const archivo = archivoInput.files[0];
      console.log(archivo);

      return archivo;
    },
  }).then((resultado) => {
    const archivo = resultado.value;
    console.log(archivo);
    if (!archivo) return;

    const lector = new FileReader();
    lector.onload = function (evento) {
      try {
        const maquina = JSON.parse(evento.target.result);
        const tabla = document.getElementById("tablaTuring");

        // Limpiar tabla actual (solo filas, no encabezados)
        tabla.querySelectorAll("tr").forEach((fila, index) => {
          if (index >= 2) fila.remove();
        });

        // Reconstruir la tabla con los datos importados
        Object.entries(maquina).forEach(([estado, transiciones]) => {
          const fila = [...transiciones["0"], ...transiciones["1"]];
          agregarEstado(estado, fila);
        });
      } catch (error) {
        console.log("Detalle del error:", error);
      }
    };

    lector.readAsText(archivo);
  });
}

function importarMaquinaDesdeServidor() {
  fetch('/archivos/ncuadrado.json')
    .then(response => response.json())
    .then(maquina => {
      const tabla = document.getElementById("tablaTuring");

      // Limpiar tabla actual
      tabla.querySelectorAll("tr").forEach((fila, index) => {
        if (index >= 2) fila.remove();
      });

      // Reconstruir tabla con los datos importados
      Object.entries(maquina).forEach(([estado, transiciones]) => {
        const fila = [...transiciones["0"], ...transiciones["1"]];
        agregarEstado(estado, fila);
      });
    })
    .catch(error => console.error("Error al cargar:", error));
}

function actualizarSelector() {
  const selector = document.getElementById("selectorMaquina");
  selector.innerHTML = "";

  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith("maquinaTuring_")) {
      const nombre = key.replace("maquinaTuring_", "");
      const option = document.createElement("option");
      option.value = nombre;
      option.textContent = nombre;
      selector.appendChild(option);
    }
  });
}

function elegirMaquina() {
  // Pedir al servidor la lista de archivos
  fetch('/archivos')
    .then(res => res.json())
    .then(archivos => {
      // Construir el <select> dinámicamente
      const opcionesHTML = `
        <select id="selectorMaquina" class="swal2-select">
          ${archivos.map(a => `<option value="/archivos/${a}">${a}</option>`).join('')}
        </select>
      `;

      Swal.fire({
        title: "Seleccioná una máquina",
        html: opcionesHTML,
        showCancelButton: true,
        confirmButtonText: "Cargar",
        cancelButtonText: "Cancelar",
        preConfirm: () => {
          const selector = document.getElementById("selectorMaquina");
          return selector.value;
        },
      }).then((resultado) => {
        const rutaArchivo = resultado.value;
        if (!rutaArchivo) return;

        // Cargar el archivo elegido
        fetch(rutaArchivo)
          .then(r => r.json())
          .then(maquina => {
            const tabla = document.getElementById("tablaTuring");

            // Limpiar tabla actual
            tabla.querySelectorAll("tr").forEach((fila, index) => {
              if (index >= 2) fila.remove();
            });

            // Reconstruir la tabla con los datos importados
            Object.entries(maquina).forEach(([estado, transiciones]) => {
              const fila = [...transiciones["0"], ...transiciones["1"]];
              agregarEstado(estado, fila);
            });
          })
          .catch(err => console.error("Error al cargar:", err));
      });
    })
    .catch(err => console.error("Error al listar archivos:", err));
}
