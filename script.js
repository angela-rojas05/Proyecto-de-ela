const mensaje = document.getElementById('mensaje');
const charCount = document.querySelector('.char-count');
const matrizMensaje = document.getElementById('matrizMensaje');
const k11 = document.getElementById('k11');
const k12 = document.getElementById('k12');
const k21 = document.getElementById('k21');
const k22 = document.getElementById('k22');
const btnEncriptar = document.getElementById('encriptar');
const btnDesencriptar = document.getElementById('desencriptar');
const resultado = document.getElementById('resultado');


// Actualizar contador de caracteres
mensaje.addEventListener('input', () => {
    const len = mensaje.value.length;
    charCount.textContent = `${len}/30`;
    mostrarMatrizMensaje();
});


// Mostrar matriz del mensaje
function mostrarMatrizMensaje() {
    const texto = mensaje.value.toUpperCase().replace(/[^A-Z]/g, '');
    
    if (texto.length === 0) {
        matrizMensaje.textContent = 'Escribe un mensaje primero...';
        return;
    }
    
    const valores = texto.split('').map(char => char.charCodeAt(0) - 65);
    
    // Agrupar en pares
    let matriz = '[';
    for (let i = 0; i < valores.length; i += 2) {
        if (i > 0) matriz += ' ';
        matriz += '[' + valores[i];
        if (i + 1 < valores.length) {
            matriz += ', ' + valores[i + 1];
        } else {
            matriz += ', 23'; // Padding con X = 23
        }
        matriz += ']';
    }
    matriz += ']';
    
    matrizMensaje.textContent = matriz;
}


// Encriptar
btnEncriptar.addEventListener('click', () => {

    // Validar inputs
    const key = [
        [parseInt(k11.value) || 0, parseInt(k12.value) || 0],
        [parseInt(k21.value) || 0, parseInt(k22.value) || 0]
    ];
    
    if (key[0][0] === 0 && key[0][1] === 0 && key[1][0] === 0 && key[1][1] === 0) {
        resultado.textContent = 'Error: Ingresa una matriz clave válida';
        resultado.classList.add('error');
        return;
    }
    
    const texto = mensaje.value.toUpperCase().replace(/[^A-Z]/g, '');
    
    if (texto.length === 0) {
        resultado.textContent = 'Error: Ingresa un mensaje';
        resultado.classList.add('error');
        return;
    }
    
    // Calcular determinante
    const det = (key[0][0] * key[1][1] - key[0][1] * key[1][0]) % 26;
    
    if (det === 0) {
        resultado.textContent = 'Error: La matriz no es invertible (cuya determinante sea  = 0)';
        resultado.classList.add('error');
        return;
    }
    
    // Convertir texto a números
    let numeros = texto.split('').map(char => char.charCodeAt(0) - 65);
    
    // Padding
    if (numeros.length % 2 !== 0) {
        numeros.push(23); // X
    }
    
    // Encriptar
    let encriptado = '';
    for (let i = 0; i < numeros.length; i += 2) {
        const v1 = numeros[i];
        const v2 = numeros[i + 1];
        
        const c1 = (key[0][0] * v1 + key[0][1] * v2) % 26;
        const c2 = (key[1][0] * v1 + key[1][1] * v2) % 26;
        
        encriptado += String.fromCharCode(65 + c1);
        encriptado += String.fromCharCode(65 + c2);
    }
    
    resultado.classList.remove('error');
    resultado.textContent = encriptado;
});



// DESENCRIPTAR
function desencriptarMensaje() {
    const key = [
        [parseInt(k11.value) || 0, parseInt(k12.value) || 0],
        [parseInt(k21.value) || 0, parseInt(k22.value) || 0]
    ];

    if (key[0][0] === 0 && key[0][1] === 0 && key[1][0] === 0 && key[1][1] === 0) {
        resultado.textContent = 'Error: Ingresa una matriz con una clave válida';
        resultado.classList.add('error');
        return;
    }

    // El mensaje a desencriptar será el contenido actual del resultado
    const texto = resultado.textContent.toUpperCase().replace(/[^A-Z]/g, '');

    if (texto.length === 0) {
        resultado.textContent = 'Error: No existe un mensaje encriptado';
        resultado.classList.add('error');
        return;
    }

    // Determinante
    let det = (key[0][0] * key[1][1] - key[0][1] * key[1][0]) % 26;
    if (det < 0) det += 26;

    const inversos = {
        1:1, 3:9, 5:21, 7:15, 9:3, 11:19, 15:7,
        17:23, 19:11, 21:5, 23:17, 25:25
    };

    if (!inversos[det]) {
        resultado.textContent = 'Error: La matriz no es invertible al módulo 26';
        resultado.classList.add('error');
        return;
    }

    const detInv = inversos[det];

    // Inversa de la matriz clave
    const invKey = [
        [( key[1][1] * detInv) % 26, (-key[0][1] * detInv) % 26],
        [(-key[1][0] * detInv) % 26, ( key[0][0] * detInv) % 26]
    ];

    for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 2; j++) {
            if (invKey[i][j] < 0) invKey[i][j] += 26;
        }
    }

    let numeros = texto.split('').map(char => char.charCodeAt(0) - 65);

    if (numeros.length % 2 !== 0) {
        resultado.textContent = 'Error: El mensaje debe tener una longitud de forma par';
        resultado.classList.add('error');
        return;
    }

    let desencriptado = '';
    for (let i = 0; i < numeros.length; i += 2) {
        const c1 = numeros[i];
        const c2 = numeros[i + 1];

        const p1 = (invKey[0][0] * c1 + invKey[0][1] * c2) % 26;
        const p2 = (invKey[1][0] * c1 + invKey[1][1] * c2) % 26;

        desencriptado += String.fromCharCode(65 + p1);
        desencriptado += String.fromCharCode(65 + p2);
    }

    resultado.classList.remove('error');
    resultado.textContent = desencriptado;
}

btnDesencriptar.addEventListener('click', desencriptarMensaje);
