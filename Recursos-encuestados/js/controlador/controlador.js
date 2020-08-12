/*
 * Controlador
 */
var Controlador = function(modelo) {
  this.modelo = modelo;
};

Controlador.prototype = {
  agregarPregunta: function(pregunta, respuestas) {
      this.modelo.agregarPregunta(pregunta, respuestas);
  },
  borrarPregunta: function (id){
    this.modelo.borrarPregunta(id)
  },
  borrarTodo: function() {
    this.modelo.borrarTodo()
  },
  existeIdPregunta: function(id) {
    let arrPregunta = this.modelo.preguntas;
    let indice = arrPregunta.findIndex(e => e.id == id)
    return arrPregunta.includes(arrPregunta[indice])
  },
  editarPregunta: function(id) {
    console.log(this.existeIdPregunta(id))
    if (this.existeIdPregunta(id)) {
      var nuevaPregunta = prompt("Ingresar nueva pregunta");
      if (nuevaPregunta === null || nuevaPregunta == "") {
        alert("¡No ingreso la pregunta!");
      } else {
        this.modelo.editarPregunta(id, nuevaPregunta);
      }
    } else {
      alert("La pregunta no existe")
    }
  }, 
  agregarVoto: function(nombrePregunta,respuestaSeleccionada) {
    this.modelo.agregarVoto(nombrePregunta,respuestaSeleccionada)
  }
};
