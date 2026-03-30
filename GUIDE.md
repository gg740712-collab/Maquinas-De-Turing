# Máquina de Turing Retro

Máquina de copiar:

+-------+--------+--------+--------+--------+--------+--------+
|       |        Si lee un 0       |        Si lee un 1       |
+ Estado+--------+--------+--------+--------+--------+--------+
|       |Imprime | Dirige | Estado |Imprime | Dirige | Estado |
+-------+--------+--------+--------+--------+--------+--------+
| q0    |   0    |   R    |  q0    |   0    |   R    |  q1    |
| q1    |   0    |   R    |  q2    |   1    |   R    |  q1    |
| q2    |   1    |   L    |  q3    |   1    |   R    |  q2    |
| q3    |   0    |   L    |  q4    |   1    |   L    |  q3    |
| q4    |   1    |   R    |  Fin   |   1    |   L    |  q5    |
| q5    |   1    |   R    |  q0    |   1    |   L    |  q5    |
+-------+--------+--------+--------+--------+--------+--------+

## Descripción:
En la tabla cada fila representa un estado de la máquina (q0, q1, q2, etc.), y cada conjunto de columnas describe qué hacer cuando la máquina lee un símbolo de la cinta (0 o 1).
• 	Imp (Imprimir): qué símbolo se escribe en la celda actual de la cinta (puede ser 0, 1 ).
• 	Dir (Dirección): hacia dónde se mueve la “cabeza lectora” después de escribir:
 	 R = derecha
 	 I = izquierda
• 	Estado: a qué estado pasa la máquina después de esa acción. Puede ser otro estado (q0, q1, etc.) o un estado final (Fin).

En resumen:
• 	La máquina lee un símbolo (0 o 1).
• 	Según el estado en que está y el símbolo leído, la tabla le dice:
   1.	 Qué escribir en la cinta.
   2.  Hacia dónde moverse.
   3.  A qué estado ir.

Así, la tabla es el programa de la máquina de Turing: define todas las reglas que guían su comportamiento paso a paso.

## Funcionamiento

La máquina de copiar simplemente copia una tira de unos consecutivos en la cinta.
Con el botón derecho del mouse coloque los unos en la cinta. Con el botón izquierdo coloque el cabezal de la cinta a la izquierda de la tira de unos, y pulse el botón ejecutar. La máquina imprimirá otra tira de unos igual a la primera.

## Reiniciar y paso a paso

El botón reiniciar le permite vaciar la cinta, volver a resetear la máquina y dejarla lista para una próxima ejecución.
También puede ejecutar las instrucciones paso a paso y en el editor puede ver cual es el estado actual en cada momento.

## Y esto para qué sirve ?
Las máquinas de Turing pueden computar todo lo computable. 
Cargue la máquina de multiplicar. Coloque una tira de unos, deje un espacio y luego otra tira de unos, coloque el cabezal a la izquierda de todo y dele a ejecutar y verá como imprime una tercera tira con el producto de ambas. 
Si observa con atención descubrirá la máquina de copiar incrustada dentro de la máquina de multiplicar.

## Cómo se sigue ?
También tiene la máquina cuadrado que imprime el cuadrado de un número. Como se imaginará usa la máquina de multiplicar. 
Y así puede seguir componendo funciones hasta computar todo lo computable.

## Castores Trabajadores
El “Busy Beaver” es un concepto de la teoría de la computación que muestra los límites de lo que las máquinas pueden calcular: se trata de encontrar la máquina de Turing más pequeña posible que produzca la mayor cantidad de salida o ejecute el mayor número de pasos antes de detenerse. Es importante porque demuestra que existen problemas que ningún algoritmo puede resolver de manera general.

### ¿Qué es el Busy Beaver?
• 	Definición: El juego del Busy Beaver fue introducido en 1962 por Tibor Radó. Consiste en diseñar una máquina de Turing con un número fijo de estados () que:
• 	Es terminante (eventualmente se detiene).
• 	Produce la máxima cantidad de unos en la cinta, o ejecuta el máximo número de pasos antes de detenerse.
• 	Función Busy Beaver (): Para cada número de estados , se define el valor máximo de pasos o símbolos que puede generar una máquina de Turing con  estados antes de detenerse.

### Importancia en computación
1. 	Explora los límites de la computabilidad:
• 	La función Busy Beaver crece más rápido que cualquier función computable conocida.
• 	Esto significa que no existe un algoritmo general que pueda calcular  para todo .
2. 	Relación con el problema de la parada:
• 	Determinar si una máquina de Turing se detendrá es equivalente al famoso problema de la parada, que es indecidible.
• 	El Busy Beaver está directamente conectado a este límite: para calcular  habría que resolver instancias del problema de la parada.
3. 	Aplicaciones conceptuales:
• 	Sirve como ejemplo extremo de funciones no computables.
• 	Ayuda a entender la frontera entre lo que las computadoras pueden y no pueden hacer.
• 	Es una herramienta pedagógica para mostrar que incluso con reglas simples, el comportamiento puede ser impredecible.

### En resumen
• 	El Busy Beaver es un ejemplo paradigmático de los límites de la computación.
• 	Aunque se puede calcular para valores pequeños de estados, rápidamente se vuelve imposible de determinar.
• 	Es importante porque demuestra que no todo problema tiene solución algorítmica, incluso en un modelo tan básico como la máquina de Turing.
