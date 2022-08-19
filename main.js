let displayHistorial = document.getElementById('historial_operaciones');
let displayResultado = document.getElementById('resultado');
let displayAcumulador = document.getElementById('acumulador');
let displayOperacion = document.getElementById('operacion');
let numeros = document.querySelectorAll('#numero');
let operadores = document.querySelectorAll('#operador');
let botonBorrar = document.querySelector('#borrar');
let botonBorrarTodo = document.querySelector('#borrarTodo');
let botonIgual = document.querySelector('#igualdad');
let popup = document.getElementById('popup');
let botonPopup = document.getElementById('boton-popup');
let navToggle = document.querySelector(".nav-toggle");
let navMenu = document.querySelector(".nav-menu");

function obtenerHistorial() {
    return displayHistorial.value;
}

function imprimirHistorial(num) {
    displayHistorial.value = num;
}

function obtenerResultado() {
    return displayResultado.value;
}

function imprimirResultado(num) {
    displayResultado.value = num;
}

function obtenerAcumulador() {
    return displayAcumulador.value;
}

function imprimirAcumulador(num) {
    displayAcumulador.value = num;
}

function obtenerOperacion() {
    return displayOperacion.value;
}

function imprimirOperacion(operador) {
    displayOperacion.value = operador;
}

function borrarTodo(){
    imprimirHistorial("");
    imprimirResultado("");
    imprimirAcumulador("");
    imprimirOperacion("");
}

function abrirPopup(){
    popup.classList.add('open-popup');
}

function cerrarPopup(){
    popup.classList.remove('open-popup');
}

function identificarTipoNumero(num){
    let pregunta1 = isNaN(num);
    let pregunta2;
    let respuesta;
    if(pregunta1){
        respuesta = "";
    } else{
        if(num % 1 == 0){
            respuesta = num;
        } else {
            respuesta = num.toFixed(2);
        }
    }
    return respuesta;
}

function operar(x, y, operador){
    let num1 = parseFloat(x);
    let num2 = parseFloat(y);
    let resultado;
    let acumulador;
    if(operador == "+"){
        resultado = num1 + num2;
    } else if(operador == "-"){
        resultado = num1 - num2;
    } else if(operador == "*"){
        resultado = num1 * num2;
    } else if(operador == "/"){
        resultado = num1 / num2;

    }
    return identificarTipoNumero(resultado);
}

function raizCuadrada(x){
    let num = parseFloat(x);
    let resultado = num ** 0.5;
    return identificarTipoNumero(resultado);
}

window.addEventListener("load", function(){

    for(let i=0; i<numeros.length; i++){
        numeros[i].onclick = function(){
            let display = obtenerHistorial();
            let resultado_anterior = obtenerResultado();
            let acumulador = obtenerAcumulador();
            let operacion = obtenerOperacion();
            let ultimo_caracter = display[display.length-1];
            let salida;
            let resultado;
            console.log(ultimo_caracter)
            if(acumulador == "" && operacion == "" && resultado_anterior == "" && this.value == "."){
                borrarTodo();
                abrirPopup();
                salida = "";
            } else if(acumulador == "" && operacion == "" && resultado_anterior == ""){
                salida = display + this.value;
            } else if(this.value == "." && (ultimo_caracter == "+" || ultimo_caracter == "-" || ultimo_caracter == "*" || ultimo_caracter == "/")){
                borrarTodo();
                abrirPopup();
                salida = "";
            } else if(acumulador != "" && operacion != "" ){
                salida = display + this.value;
            } else if(display == "-"){
                imprimirOperacion("");
                salida = display + this.value;
            } else if(this.value == "." && resultado_anterior != ""  && display == ""){
                borrarTodo();
                abrirPopup();
                salida = "";
            } 
            imprimirHistorial(salida);
        }
    }

    for(let i=0; i<operadores.length; i++){
        operadores[i].onclick = function(){
            let display = obtenerHistorial();
            let resultado_anterior = obtenerResultado();
            let acumulador = obtenerAcumulador();
            let operacion = obtenerOperacion();
            let ultimo_caracter = display[display.length-1];
            let salida;
            let operador;
            let x;//primer valor de la operación
            let y;//segundo valor de la operación
            let resultado;
            if(resultado_anterior == "" && acumulador == "" && operacion == ""){
                salida = display + this.value;
                operador = this.value;
                imprimirAcumulador(display);
                imprimirOperacion(operador);
            } else if(resultado_anterior == "" && acumulador != "" && operacion != ""){
                salida = display + this.value;
            } else if(acumulador != "" && operacion != "" &&(ultimo_caracter == "0" || ultimo_caracter == "1" || ultimo_caracter == "2" || ultimo_caracter == "3" || ultimo_caracter == "4" || ultimo_caracter == "5" || ultimo_caracter == "6" || ultimo_caracter == "7" || ultimo_caracter == "8" || ultimo_caracter == "9")){
                let indice_para_cortar = display.indexOf(operacion) + 1;
                y = display.slice(indice_para_cortar, display.length);
                x = acumulador;
                operador = operacion;
                resultado = operar(x, y, operador);
                if(resultado == undefined){
                    borrarTodo();
                    abrirPopup();
                    salida = "";
                } else {
                    salida = resultado + this.value;
                    imprimirOperacion(this.value);
                    imprimirResultado(resultado);
                    imprimirAcumulador(resultado);
                }
            } else if((resultado_anterior != "") && (acumulador == "") && (operacion == "") && (display == "")){
                salida = resultado_anterior + this.value;
                operador = this.value;
                imprimirOperacion(operador);
                imprimirAcumulador(resultado_anterior);
            } else if (display == "+" || display == "-" || display == "*" || display == "/" && operacion != ""){
                borrarTodo();
                abrirPopup();
                salida = "";
            }
            imprimirHistorial(salida);
        }
    }

    botonBorrarTodo.onclick = function(){
        borrarTodo();
    }

    botonBorrar.onclick = function(){
        let display = obtenerHistorial();
        let ultimo_caracter = display[display.length-1];
        let salida; 
        if(display.length == 1){
            borrarTodo();
        } else if(ultimo_caracter == "+" || ultimo_caracter == "-" || ultimo_caracter == "*" || ultimo_caracter == "/"){
            salida = display.slice(0,-1);
            imprimirHistorial(salida);
            imprimirOperacion("");
            imprimirAcumulador("");
        } else {
            salida = display.slice(0,-1);
            imprimirHistorial(salida);
            imprimirResultado("");
        }  
    }

    botonIgual.onclick = function(){
        let display = obtenerHistorial();
        let acumulador = obtenerAcumulador();
        let operacion = obtenerOperacion();
        let resultado_anterior = obtenerResultado();
        let ultimo_caracter = display[display.length-1];
        let salida;
        let operador;
        let x;//primer valor de la operación
        let y;//segundo valor de la operación
        let resultado;
        if((ultimo_caracter == "0" || ultimo_caracter == "1" || ultimo_caracter == "2" || ultimo_caracter == "3" || ultimo_caracter == "4" || ultimo_caracter == "5" || ultimo_caracter == "6" || ultimo_caracter == "7" || ultimo_caracter == "8" || ultimo_caracter == "9") && (operacion == "")){
            salida = display;
            imprimirOperacion("");
            imprimirResultado(salida);
            imprimirAcumulador("");
        } else if ((ultimo_caracter == "+" || ultimo_caracter == "-" || ultimo_caracter == "/" || ultimo_caracter == "*" || ultimo_caracter == ".") && (resultado_anterior == "")){
            borrarTodo();
            abrirPopup();
        } else if(ultimo_caracter == "0" || ultimo_caracter == "1" || ultimo_caracter == "2" || ultimo_caracter == "3" || ultimo_caracter == "4" || ultimo_caracter == "5" || ultimo_caracter == "6" || ultimo_caracter == "7" || ultimo_caracter == "8" || ultimo_caracter == "9"){
            let indice_para_cortar = display.indexOf(operacion) + 1;
            x = acumulador;
            y = display.slice(indice_para_cortar, display.length);
            operador = operacion;
            resultado = operar(x, y, operador);
            console.log(resultado)
            if(resultado != ""){
                imprimirOperacion("");
                imprimirResultado(resultado);
                imprimirAcumulador("");  
            } else {
                borrarTodo();
                abrirPopup();
            }    
        }
        imprimirHistorial("");
    }

    botonPopup.onclick = function(){
        cerrarPopup();
    }

    navToggle.onclick = function() {
        navMenu.classList.toggle("nav-menu_visible");
    
        if (navMenu.classList.contains("nav-menu_visible")) {
            navToggle.setAttribute("aria-label", "Cerrar menú");
        } else {
            navToggle.setAttribute("aria-label", "Abrir menú");
        }
    };
})