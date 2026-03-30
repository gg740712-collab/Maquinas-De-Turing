//Variables
let totalceldas = 100;
let posicionDelCabezal = 0;
let speed = 1;
let zoomLevel = 100;

//Inicializa pagina y eventos
function init(){
  tapeContainer.innerText = "";
  stepBtn.disabled = false;
  runBtn.disabled = false;
  pauseBtn.disabled = true;
  resetBtn.disabled = false;

  const mitadtotalceldas = Math.floor(totalceldas / 2);
  posicionDelCabezal = mitadtotalceldas;

  for (let i = 0; i < totalceldas; i++) {
    let cell = document.createElement("div");
    cell.textContent = "0";
    cell.className = "tape-cell value-0";
    cell.id = i.toString();
    if (i == mitadtotalceldas) {
      cell.className = "tape-cell value-0 tape-head";
    }

    cell.addEventListener("click", (event) => {
      if (! puedemodificarcinta)
        return;
      if (cell.classList.contains("value-0")) {
        cell.classList.remove("value-0");
        cell.classList.add("value-1");
        cell.textContent = "1";
      } else if (cell.classList.contains("value-1")) {
        cell.classList.remove("value-1");
        cell.classList.add("value-0");
        cell.textContent = "0";
      }
      colorear(estadoMaquinaTuring());
    });
    cell.addEventListener("contextmenu", (event) => {
      event.preventDefault();
      document
        .getElementsByClassName("tape-head")[0]
        .classList.remove("tape-head");
      
      posicionDelCabezal = Number.parseInt(event.target.id);
      console.log(typeof posicionDelCabezal, posicionDelCabezal,event.target,event.target.id);
      
      event.target.classList.add("tape-head");
      showNotification("Posición del cabezal actualizada", "info");
      console.log("Posición del cabezal actualizada");
      colorear(estadoMaquinaTuring());
    });
    tapeContainer.appendChild(cell);
  }
  
  runBtn.addEventListener('click', ejecutarMaquinaActual);
  
}

function agregarEventos(){
  const addStatebtn = document.getElementById('addState-btn');
  addStatebtn.addEventListener('click', agregarEstado);

  const tapeLengthInput = document.getElementById('tape-length-input');
  tapeLengthInput.addEventListener('change', () => {
    let value = Number.parseInt(tapeLengthInput.value); 
    if (value < 10 || Number.isNaN(value)) value = 10;
    if (value > 6000) value = 6000;        
    totalceldas = value;
    tapeContainer.innerHTML = '';
    init();
    if (value <= 10) {
      tapeLengthInput.value = value;
    }
  });
  const slider = document.getElementById('speed-slider');
  const display = document.getElementById('speed-display');

  slider.addEventListener('input', () => {
    speed = Number(2001 - slider.value);
    display.textContent = Math.floor(slider.value/20);
  });
  pauseBtn.addEventListener('click', pausar);
  stepBtn.addEventListener('click', pasoapaso);
  resetBtn.addEventListener('click', resetMaquina);

  colorPicker0.addEventListener('change', () => {
    console.log('.....')
    document.documentElement.style.setProperty('--color-0', colorPicker0.value);
    console.log('color 0')
  });
      
  colorPicker1.addEventListener('change', () => {
    console.log('.....')
    document.documentElement.style.setProperty('--color-1', colorPicker1.value);
    console.log('color 1')
  });
}
init();
agregarEventos();
colorear(0);
obtener_estado();

//Grabar y mover cabezal
function grabarYmover(escritura,direccion){
  //console.log(typeof escritura,escritura);
  let elemento = document.getElementById(posicionDelCabezal.toString());
  elemento.classList.remove("tape-head");
  
  if (escritura === "0"){
    //console.log('por 0');
    elemento.classList.remove("value-1");
    elemento.classList.add("value-0");
    elemento.textContent = escritura;
  }
  if (escritura === "1"){
    //console.log('por 1');
    elemento.classList.remove("value-0");
    elemento.classList.add("value-1");
    elemento.textContent = escritura;
  }
  

  if (direccion) posicionDelCabezal += 1;
  else posicionDelCabezal -= 1;

  // Verificar si el cabezal se sale de la cinta
  if (posicionDelCabezal < 0 || posicionDelCabezal >= totalceldas) {
    showNotification("La ejecución finalizó erróneamente la cinta es finita", "error");
    // Detener ejecución: deshabilitar botones de ejecución
    if (typeof runBtn !== 'undefined') runBtn.disabled = false;
    if (typeof pauseBtn !== 'undefined') pauseBtn.disabled = true;
    if (typeof stepBtn !== 'undefined') stepBtn.disabled = false;
    return;
  }
  document.getElementById(posicionDelCabezal.toString()).classList.add("tape-head");
}

//Activa globo de notificaciones
function showNotification(message, type = "info") {
  const notification = document.getElementById("notification");
  notification.textContent = message;
  notification.className = `notification ${type}`;
  notification.classList.add("show");

  setTimeout(() => {
    notification.classList.remove("show");
  }, 3000);
}

function zoomIn() {
  zoomLevel += 10;
  document.body.style.zoom = zoomLevel + '%';
}

function zoomOut() {
  zoomLevel -= 10;
  document.body.style.zoom = zoomLevel + '%';
}

function colorear(filaNumero) {
    const tabla = document.getElementById("tablaTuring");
    const filas = tabla.getElementsByTagName("tr");

    filaNumero += 2;

    // Validar si el número está dentro del rango
    if (filaNumero < 0 || filaNumero >= filas.length) {
      console.warn("Número de fila fuera de rango.");
      return;
    }
    //console.log('filas.length',filas.length);
    // Limpiar colores anteriores
    for (let fila=0;fila<filas.length-2;fila++) {
      const columnas = filas[fila+2].getElementsByTagName("td");
      columnas[1].style.backgroundColor = "";
      columnas[2].style.backgroundColor = "";
      columnas[3].style.backgroundColor = "";
      columnas[4].style.backgroundColor = "";
      columnas[5].style.backgroundColor = "";
      columnas[6].style.backgroundColor = "";
    }

    // Colorear solo la fila deseada
    const columnas = filas[filaNumero].getElementsByTagName("td");
    let elem = document.getElementsByClassName("tape-head")[0].innerHTML;
    //console.log('elem ',elem);

    if (elem==0){
        columnas[1].style.backgroundColor = "#add8e6";
        columnas[2].style.backgroundColor = "#add8e6";
        columnas[3].style.backgroundColor = "#add8e6";
    }
    else{
      columnas[4].style.backgroundColor = "#add8e6";
        columnas[5].style.backgroundColor = "#add8e6";
        columnas[6].style.backgroundColor = "#add8e6";
    }
  }

function obtener_estado() {
  const contenidocinta = tapeContainer.children;
  
  let txt = "";
  let pos = 0;
  let posicion = 0;
  for (let elem of contenidocinta){
    txt += elem.innerText;
    if (elem.classList.contains('tape-head'))
      posicion = pos;   
    pos++;
  }
  return [txt,posicion];
}



