document.addEventListener('DOMContentLoaded', () => {
  function aleatorio(min, maxi) {
    return Math.floor(Math.random()*(maxi - min + 1)) + min
  }
  
  const cuadrados = document.querySelectorAll('.grid div')
  const puntosSPAN = document.querySelector('#puntos')
  const botonComenzar = document.querySelector('#boton')
  const botonArriba = document.querySelector('#arriba')
  const botonAbajo = document.querySelector('#abajo')
  const botonIzquierda = document.querySelector('#izquierda')
  const botonDerecha = document.querySelector('#derecha')
  const ancho = 10

  let indiceActual = 0
  let indiceSerpiente = [3,4,5]
  let direccion = 1
  let puntos = 0
  // let velocidad = 0.9
  let tiempoIntervalo = 0
  let intervalo = 0

  function empezar() {
    cuadrados.forEach((cuadrado) => {
      cuadrado.classList.remove("snake")
      cuadrado.classList.remove("apple")
      cuadrado.classList.remove("head")
    })
    clearInterval(intervalo)
    puntos = 0
    direccion = -1
    puntosSPAN.innerHTML = puntos
    tiempoIntervalo = 500
    indiceSerpiente = [3,4,5]
    indiceActual = 0
    indiceSerpiente.forEach(indice => cuadrados[indice].classList.add("snake"))
    cuadrados[indiceSerpiente[0]].classList.remove("snake")
    cuadrados[indiceSerpiente[0]].classList.add("head")
    manzanaAleatoria()
    intervalo = setInterval(movimiento, tiempoIntervalo)
  }

  function manzanaAleatoria() {
    const posicion = aleatorio(0,ancho*ancho - 1)
    cuadrados[posicion].classList.add("apple")
  }

  function movimiento() {
    const cabeza = indiceSerpiente[0]
    const nuevaCabeza = cabeza + direccion
    const pegaAbajo = (nuevaCabeza >= ancho*ancho) && (direccion === ancho)
    const pegaArriba = (cabeza + -ancho < 0) && (direccion === -ancho)
    const pegaIzquierda = (cabeza % ancho === 0) && (direccion === -1)
    const pegaDerecha = (cabeza % ancho === ancho-1) && (direccion === 1)
    const autoPega = cuadrados[nuevaCabeza] && cuadrados[nuevaCabeza].classList.contains("snake")
    if(pegaAbajo|| pegaArriba|| pegaIzquierda|| pegaDerecha|| autoPega){
      clearInterval(intervalo)
      if (puntos <= 3) {
        alert("huevo podrido")
      }else{
      alert("perdiste")
      }
      return
    }

    indiceSerpiente.unshift(nuevaCabeza)
    cuadrados[nuevaCabeza].classList.add("head")
    cuadrados[cabeza].classList.add("snake")
    cuadrados[cabeza].classList.remove("head")
    
    if (cuadrados[nuevaCabeza].classList.contains("apple") ) {
      cuadrados[nuevaCabeza].classList.remove("apple")
      puntosSPAN.innerHTML = ++puntos
      manzanaAleatoria()
      return
    }
    const cola = indiceSerpiente.pop()
    cuadrados[cola].classList.remove("snake")
  }

  function control(evento){
    cuadrados[indiceActual].classList.remove("snake")

    if (evento.keyCode === 39) {
      direccion = 1 //derecha
    }
    if (evento.keyCode === 38) {
      direccion = -ancho //ariba
    } 
    if (evento.keyCode ===40) {
      direccion = ancho //abajo
    }
    if (evento.keyCode === 37) {
      direccion = -1 //izquierda
    }   
  }
  document.addEventListener('keyup', control)
  botonComenzar.addEventListener("click", empezar)
  botonArriba.addEventListener("click", ()=> {
    control({keyCode: 38})
  })
  botonAbajo.addEventListener("click", ()=> {
    control({keyCode: 40})
  })
  botonIzquierda.addEventListener("click", ()=> {
    control({keyCode: 37})
  })
  botonDerecha.addEventListener("click", ()=> {
    control({keyCode: 39})
  })
})