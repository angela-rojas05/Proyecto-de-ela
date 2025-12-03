# Tecnológico de Softwaare
## Actividad #21: Cifrado Hill
## Alumno: Ángela Yaritzi Rojas Brito
## Asignatura: Fundamentos de álgebra
## Maestro: Jorge Javier Pedroza Romero

---

# Encriptación Hill

## Descripción del Proyecto
Este proyecto es un **encriptador y desencriptador** de mensajes usando el **cifrado de Hill** con matrices 2x2.  
Puedes escribir un mensaje (máximo 30 caracteres) y una clave en forma de matriz 2x2 para encriptarlo y luego desencriptarlo.

---


## ¿Cómo Funciona?

1. Cada letra se convierte a un número: A=0, B=1, C=2 … Z=25.  
2. El mensaje se divide en pares de letras (si hay un número impar de letras, se agrega una X al final).  
3. Cada par se multiplica por la **matriz clave** modulo 26 para encriptarlo.  
4. Para desencriptar, se multiplica por la **matriz inversa** modulo 26 para obtener el mensaje original.

---

## Instrucciones de Uso

1. Abrir `index.html` en cualquier navegador.  
2. Escribir el mensaje que quieres encriptar en el área de texto (máx. 30 caracteres).  
3. Introducir la **matriz clave 2x2** en los campos correspondientes:
4. Hacer clic en **Encriptar** para obtener el mensaje cifrado.  
5. Para desencriptar un mensaje:   
   - Haz clic en **Desencriptar**.  
6. El resultado aparecerá en la sección **Resultado**.  
7. Observa que el sistema valida errores: matriz no invertible, mensaje vacío o longitud impar.

---

