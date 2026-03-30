class NodoEstado {
  constructor (escritura, direccion, proximoEstado) {
    this.escritura = escritura
    this.direccion = direccion
    this.proximoEstado = proximoEstado
  }

  toString () {
    let dir = "Izq"
    if (this.direccion) dir = "Der"
    return "[ " + this.escritura.toString() + " | " + dir + " | " + this.proximoEstado.toString() + " ]"
  }
}

class Estado {
  constructor (nodoEstadoX0, nodoEstadoX1) {
    this.nodoEstadoX0 = nodoEstadoX0
    this.nodoEstadoX1 = nodoEstadoX1
  }

  dameEstado (valor) {
    if (valor === "0") { return this.nodoEstadoX0 } else { return this.nodoEstadoX1 }
  }

  toString (self) {
    return this.nodoEstadoX0.toString() + " " + this.nodoEstadoX1.toString()
  }
}

class Programa {
  constructor () {
    this.instrucciones = []
  }

  agregarEstado (estado) {
    this.instrucciones.push(estado)
  }

  dameEstado (posicionestado) {
    return this.instrucciones[posicionestado]
  }

  toString() {
    let txt = ""
    for (let i = 0; i < this.instrucciones.length; i++) {
      txt += i.toString() + " " + this.instrucciones[i].toString()
      txt += "\n"
    }
    return txt
  }
}

class Cinta {
  constructor () {
    this.cinta = Array(4000).fill("0")
    this.posicion = this.cinta.length / 2
  }

  copiarEstado(estado){
    console.log("************************************");
    this.cinta = estado[0].split('');
    this.posicion = estado[1];
  }

  leer () {
    return this.cinta[this.posicion]
  }

  escribir (elemento) {
    this.cinta[this.posicion] = elemento
  }

  mover (direccion) {
    if (direccion) { this.posicion += 1 } else { this.posicion -= 1 }
  }

  setear_posicion (pos) {
    this.posicion = pos
  }

  toString() {
    let txt = this.cinta.join("").replace(/(^0+|0+$)/g, "")
    if (txt === "") txt = "0"
    return txt
  }
}

class MaquinaTuring {
  constructor (pgm, cinta) {
    this.programa = pgm;
    this.cinta = cinta;
    this.estadoactual = 0;
  }

  ejecutarInstruccion () {
    const valorencinta = this.cinta.leer();
    const lineaestado = this.programa.dameEstado(this.estadoactual);
    const estado = lineaestado.dameEstado(valorencinta);

    this.cinta.escribir(estado.escritura);
    this.cinta.mover(estado.direccion);
    this.estadoactual = estado.proximoEstado;
    
    return {  escritura: estado.escritura,
              direccion: estado.direccion,
              proximoEstado: estado.proximoEstado };
  }

  hayinstrucciones(){
    return (this.estadoactual !== -1);
  }
  toString() {
    return "estado: "  + this.estadoactual + " cinta: " + this.cinta.toString();
  }
}

