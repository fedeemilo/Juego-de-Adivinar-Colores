

var numDeCuadrados = 6;
var colors = [];
var colorElegido;
//SELECTORS
var cuadrados = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var mensajeDisplay = document.querySelector("#mensaje");
var h1 = document.querySelector("h1");
var botonReset = document.getElementById("reset");
var modoBotones = document.querySelectorAll(".modo");

//TODO LO QUE DEBE CORRER CUANDO LA PÁGINA CARGUE
init();

function init() {
    //LISTENERS DE BOTONES PARA LOS MODOS FÁCIL Y DIFÍCIL
    setUpBotonesModo();

    //LISTENERS PARA MANIPULACIÓN DE TODOS LOS CUADRADOS
    setUpCuadrados();
    reset();
}

function setUpCuadrados() {
    for (var i = 0; i < cuadrados.length; i++){
        //agregar click listeners a los cuadrados
        cuadrados[i].addEventListener("click", function(){
            //tomar color del cuadrado clickeado
            var colorClickeado = this.style.backgroundColor;
            //y luego comparar el color con colorElegido
            if (colorClickeado === colorElegido){
                mensajeDisplay.textContent = "¡Correcto!";
                botonReset.textContent = "Jugar de nuevo";
                cambiarColores(colorClickeado);
                h1.style.backgroundColor = colorClickeado;
            } else {
                this.style.backgroundColor = "#232323";
                mensajeDisplay.textContent = "¡Vuelve a intentarlo!";
            }
        });
    }
}

function setUpBotonesModo() {
    for (var i = 0; i < modoBotones.length; i++) {
        modoBotones[i].addEventListener("click", function(){
            modoBotones[0].classList.remove("seleccionado");
            modoBotones[1].classList.remove("seleccionado");
            this.classList.add("seleccionado");
            this.textContent === "Fácil" ? numDeCuadrados = 3: numDeCuadrados = 6;
            reset();
        });
    }
}

function reset() {
    //generar colores nuevos
    colors = generarColoresAlAzar(numDeCuadrados);
    //elegir un nuevo color al azar de nuestro arreglo
    colorElegido = elegirColor();
    //cambiar colorDisplay para que coincida con colorElegido
    colorDisplay.textContent = colorElegido;
    //cambiar los colores de los cuadrados
    for (var i = 0; i < cuadrados.length; i++){
        if (colors[i]) {
            cuadrados[i].style.display = "block";
            cuadrados[i].style.background = colors[i];
        } else {
            cuadrados[i].style.display = "none";
        }     
    }
    h1.style.backgroundColor = "steelblue";
    botonReset.textContent = "Colores Nuevos";
    mensajeDisplay.textContent = "";
}

//BOTÓN PARA GENERAR COLORES NUEVOS O REINICIAR EL JUEGO
botonReset.addEventListener("click", function(){
    reset();    
});

function cambiarColores(color) {
    //hacer un loop por todos los cuadrados
    for (var i = 0; i < cuadrados.length; i++){
        //cambiar cada color para que sea igual al color a elegir
        cuadrados[i].style.background = color;
    }
}

//SE ELIGE UN COLOR AL AZAR PARA ADIVINAR
function elegirColor() {
    //Método para elegir un número al azar en JS
    //Math.floor quita los decimales
    var azar = Math.floor(Math.random() * colors.length);
    return colors[azar];
}

//SE GENERAN COLORES AL AZAR; NUM ES EL NUMERO DE COLORES A GENERAR
function generarColoresAlAzar(num) {
    //hacer un arreglo
    var arr = [];
    //repetir num de veces
    for (var i = 0; i < num; i++) {
        arr.push(colorAlAzar());
        //obtener color al azar y agregarlo al arreglo
    }
    //devolver el arreglo
    return arr;
}

function colorAlAzar() {
    //R = elegir "rojo" de 0 - 255
    var r =  Math.floor(Math.random() * 256);
    //G = elegir "verde" de 0 - 255
    var g =  Math.floor(Math.random() * 256);
    //B = elegir "azul" de 0 - 255
    var b =  Math.floor(Math.random() * 256);
    return "rgb(" + r + ", " + g + ", " + b + ")";
}

