const mensaje = document.getElementById('mensaje');
const charCount = document.querySelector('.char-count');
const matrizMensaje = document.getElementById('matrizMensaje');

const k11 = document.getElementById('k11');
const k12 = document.getElementById('k12');
const k21 = document.getElementById('k21');
const k22 = document.getElementById('k22');

const btnEncriptar = document.getElementById('encriptar');
const btnDesencriptar = document.getElementById('desencriptar');

const resultadoEncriptado = document.getElementById('resultadoEncriptado');
const resultadoDesencriptado = document.getElementById('resultadoDesencriptado');


// -----------------------------------------------------
// Contador de caracteres y matriz del mensaje
// -----------------------------------------------------
mensaje.addEventListener("input", () => {
    const len = mensaje.value.length;
    charCount.textContent = `${len}/30`;
    mostrarMatrizMensaje();
});

function mostrarMatrizMensaje() {
    const texto = mensaje.value.toUpperCase().replace(/[^A-Z]/g, '');
    if (texto.length === 0) {
        matrizMensaje.textContent = "Escribe un mensaje primero...";
        return;
    }

    const valores = texto.split('').map(char => char.charCodeAt(0) - 65);

    let matriz = '[';
    for (let i = 0; i < valores.length; i += 2) {
        if (i > 0) matriz += ' ';
        matriz += `[${valores[i]}, ${valores[i + 1] ?? 23}]`;
    }
    matriz += ']';

    matrizMensaje.textContent = matriz;
}



// -----------------------------------------------------
// Inversa de matriz mod 26
// -----------------------------------------------------
function inversaMod26(mat) {
    const det = (mat[0][0] * mat[1][1] - mat[0][1] * mat[1][0]) % 26;
    const detPos = (det + 26) % 26;

    const invMult = [
        0, 1, 0, 9, 0, 21, 0, 15, 0, 3, 0, 19, 0, 0,
        0, 7, 0, 23, 0, 11, 0, 5, 0, 17, 0, 25
    ];

    const invDet = invMult[detPos];
    if (invDet === 0) return null;  // no invertible

    const a = mat[0][0], b = mat[0][1], c = mat[1][0], d = mat[1][1];

    const inv = [
        [(d * invDet) % 26, (-b * invDet) % 26],
        [(-c * invDet) % 26, (a * invDet) % 26]
    ];

    return inv.map(row => row.map(v => (v + 26) % 26));
}



// -----------------------------------------------------
// ENCRIPTAR
// -----------------------------------------------------
btnEncriptar.addEventListener('click', () => {

    resultadoEncriptado.textContent = "";
    resultadoDesencriptado.textContent = "";

    const key = [
        [parseInt(k11.value) || 0, parseInt(k12.value) || 0],
        [parseInt(k21.value) || 0, parseInt(k22.value) || 0]
    ];

    const texto = mensaje.value.toUpperCase().replace(/[^A-Z]/g, '');
    if (texto.length === 0) {
        resultadoEncriptado.textContent = "Error: Ingresa un mensaje.";
        return;
    }

    const det = (key[0][0] * key[1][1] - key[0][1] * key[1][0]) % 26;
    if ((det + 26) % 26 === 0) {
        resultadoEncriptado.textContent = "Error: La matriz NO es invertible.";
        return;
    }

    let nums = texto.split("").map(c => c.charCodeAt(0) - 65);
    if (nums.length % 2 !== 0) nums.push(23);

    let salida = "";

    for (let i = 0; i < nums.length; i += 2) {
        const x = nums[i];
        const y = nums[i + 1];
        const r1 = (key[0][0] * x + key[0][1] * y) % 26;
        const r2 = (key[1][0] * x + key[1][1] * y) % 26;
        salida += String.fromCharCode(r1 + 65);
        salida += String.fromCharCode(r2 + 65);
    }

    resultadoEncriptado.textContent = salida;
});



// -----------------------------------------------------
// DESENCRIPTAR
// -----------------------------------------------------
btnDesencriptar.addEventListener('click', () => {
    const cipherText = resultadoEncriptado.textContent.trim();

    if (!cipherText) {
        resultadoDesencriptado.textContent = "Error: No hay texto encriptado.";
        return;
    }

    const key = [
        [parseInt(k11.value) || 0, parseInt(k12.value) || 0],
        [parseInt(k21.value) || 0, parseInt(k22.value) || 0]
    ];

    const Kinv = inversaMod26(key);
    if (!Kinv) {
        resultadoDesencriptado.textContent = "Error: La matriz clave NO es invertible.";
        return;
    }

    const nums = cipherText.split('').map(ch => ch.charCodeAt(0) - 65);

    let salida = "";
    for (let i = 0; i < nums.length; i += 2) {
        const x = nums[i], y = nums[i + 1];

        const r1 = (Kinv[0][0] * x + Kinv[0][1] * y) % 26;
        const r2 = (Kinv[1][0] * x + Kinv[1][1] * y) % 26;

        salida += String.fromCharCode((r1 + 26) % 26 + 65);
        salida += String.fromCharCode((r2 + 26) % 26 + 65);
    }

    resultadoDesencriptado.textContent = salida;
});