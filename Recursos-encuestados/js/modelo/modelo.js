/*
 * Modelo
 */
var Modelo = function() {
  this.preguntas = [];
  this.ultimoId = 0;

  //inicializacion de eventos
  this.preguntaAgregada = new Evento(this);
  this.preguntaEliminada = new Evento(this);
  this.todoEliminado = new Evento(this);
  this.preguntaEditada = new Evento(this);
  this.votoAgregado = new Evento(this);
  this.cargar()
};

Modelo.prototype = {
  //se obtiene el id más grande asignado a una pregunta
  obtenerUltimoId: function() {
    this.preguntas.forEach((e)=> e.id > this.ultimoId ? this.ultimoId = e.id : this.ultimoId);
    return this.ultimoId;
  },

  //se agrega una pregunta dado un nombre y sus respuestas
  agregarPregunta: function(nombre, respuestas) {
    var id = this.obtenerUltimoId();
    id++;
    var nuevaPregunta = {'textoPregunta': nombre, 'id': id, 'cantidadPorRespuesta': respuestas};
    this.preguntas.push(nuevaPregunta);
    this.guardar();
    this.preguntaAgregada.notificar();
  },
  borrarPregunta: function (id) {
    this.preguntas = this.preguntas.filter(e => e.id != id);
    this.guardar();
    this.preguntaEliminada.notificar();
  },
  borrarTodo: function() {
    this.preguntas = [];
    this.guardar();
    this.todoEliminado.notificar();
  },
  editarPregunta: function(id, nuevaPregunta) {
    /* let nuevaPregunta = prompt("Escriba la nueva pregunta");
    let index = this.preguntas.findIndex(e => e.id == id);
    if (nuevaPregunta == '' || nuevaPregunta == null) {
      alert("Por favor ingrese nueva pregunta")
    } else {
      this.preguntas[index].textoPregunta = nuevaPregunta;
    }
    this.guardar();
    this.preguntaEditada.notificar() */
    var indice_pregunta = this.preguntas.findIndex(e => e.id == id);

    this.preguntas[indice_pregunta].textoPregunta = nuevaPregunta;
    this.guardar();
        this.preguntaEditada.notificar();
  },
  agregarVoto: function(nombrePregunta,respuestaSeleccionada) {
    this.preguntas.forEach(pregunta => {
      if(pregunta.textoPregunta == nombrePregunta){
        pregunta.cantidadPorRespuesta.forEach(respuesta => {
          if(respuesta.textoRespuesta == respuestaSeleccionada)
          respuesta.cantidad++
        })
      }
    });
    this.guardar();
    this.votoAgregado.notificar()
  },

  //se guardan las preguntas
  guardar: function(){
    let preguntasObjetos = JSON.stringify(this.preguntas)
    localStorage.setItem("preguntas", preguntasObjetos)
  },
  cargar: function() {
    if(localStorage.getItem("preguntas") != null)
    this.preguntas = JSON.parse(localStorage.getItem("preguntas"));
  }
};
