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


## Detalles Matemáticos

El cifrado Hill se basa en **álgebra lineal y aritmética modular**:

1. **Conversión de letras a números:**  
   Cada letra se transforma según: A=0, B=1, …, Z=25.

2. **Multiplicación por la matriz clave:**  
   Para encriptar, cada par de números `[x1, x2]` se multiplica por la matriz clave `K` módulo 26:

3. **Matriz inversa para desencriptar:**  
   Para obtener el mensaje original, se calcula la matriz inversa `K⁻¹` módulo 26:

4. **Padding:**  
   Si el número de letras es impar, se añade una `X` para completar el último par.

5. **Desencriptación paso a paso:**  
   - Se convierte el mensaje cifrado a números.  
   - Se multiplica por la matriz inversa módulo 26.  
   - Se obtiene el mensaje original convirtiendo los números nuevamente a letras.

---


## Personalización propia

- Gradiente radial de fondo y contenedores con sombra.  
- Botones animados con **hover**, **rebote** y cambio de color.  
- Contador de caracteres dinámico.  
- Pie de página centrado en caja de texto con tu nombre y materia.

---

## Autor 

Ángela Yaritzi Rojas Brito – Fundamentos de Álgebra
