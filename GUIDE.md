# Máquina de Turing Retro

Máquina de copiar:

| Estado | Imprime (0) | Dirige (0) | Estado (0) | Imprime (1) | Dirige (1) | Estado (1) |
|--------|-------------|------------|------------|-------------|------------|------------|
| q0     | 0           | R          | q0         | 0           | R          | q1         |
| q1     | 0           | R          | q2         | 1           | R          | q1         |
| q2     | 1           | L          | q3         | 1           | R          | q2         |
| q3     | 0           | L          | q4         | 1           | L          | q3         |
| q4     | 1           | R          | Fin        | 1           | L          | q5         |
| q5     | 1           | R          | q0         | 1           | L          | q5         |

## Descripción:
En la tabla cada fila representa un estado de la máquina (q0, q1, q2, etc.), y cada conjunto de columnas describe qué hacer cuando la máquina lee un símbolo de la cinta (0 o 1).

1. **Imprimir:** qué símbolo se escribe en la celda actual de la cinta (puede ser 0 o 1).  
2. **Dirección:** hacia dónde se mueve la “cabeza lectora” después de escribir:  
   - **R** = derecha  
   - **L** = izquierda  
3. **Estado:** a qué estado pasa la máquina después de esa acción. Puede ser otro estado (q0, q1, etc.) o un estado final (Fin).  


En resumen:
1. La máquina lee un símbolo (0 o 1).  
2. Según el estado en que está y el símbolo leído, la tabla le dice:  
   - Qué escribir en la cinta.  
   - Hacia dónde moverse.  
   - A qué estado ir.
3. La cinta no se muestra en una sola linea, sino como una grilla de varias filas, el cabezal al llegar al fin de la linea a la derecha continua en la linea siguiente, y cuando retrocede hace lo inverso es decir si llega al comienzo de la linea en la izquierda continua en la linea anterior.   

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
[Ver el video en YouTube](https://www.youtube.com/watch?v=L6AWdsPNWMU)

## Cómo se sigue ?
También tiene la máquina cuadrado que imprime el cuadrado de un número. Como se imaginará usa la máquina de multiplicar. 
Y así puede seguir componendo funciones hasta computar todo lo computable.

## Castores Trabajadores
El “Busy Beaver” es un concepto de la teoría de la computación que muestra los límites de lo que las máquinas pueden calcular: se trata de encontrar la máquina de Turing más pequeña posible que produzca la mayor cantidad de salida o ejecute el mayor número de pasos antes de detenerse. Es importante porque demuestra que existen problemas que ningún algoritmo puede resolver de manera general.

### ¿Qué es el Busy Beaver?
Definición: El juego del Busy Beaver fue introducido en 1962 por Tibor Radó. Consiste en diseñar una máquina de Turing con un número fijo de estados (n) que:  

- Es terminante (eventualmente se detiene).  
- Produce la máxima cantidad de unos en la cinta, o ejecuta el máximo número de pasos antes de detenerse.      
- Función Busy Beaver(n): Para cada número de estados , se define el valor máximo de pasos o símbolos que puede generar una máquina de Turing con n estados antes de detenerse.  

### Importancia en computación
- Explora los límites de la computabilidad:  
  - La función Busy Beaver crece más rápido que cualquier función computable conocida.  
  - Esto significa que no existe un algoritmo general que pueda calcular  para todo .  
- Relación con el problema de la parada:  
  - Determinar si una máquina de Turing se detendrá es equivalente al famoso problema de la parada, que es indecidible.  
  - El Busy Beaver está directamente conectado a este límite: para calcular  habría que resolver instancias del problema de la parada.  
- Aplicaciones conceptuales:  
  - Sirve como ejemplo extremo de funciones no computables.  
  - Ayuda a entender la frontera entre lo que las computadoras pueden y no pueden hacer.  
  - Es una herramienta pedagógica para mostrar que incluso con reglas simples, el comportamiento puede ser impredecible.  

### En resumen
- El Busy Beaver es un ejemplo paradigmático de los límites de la computación.  
- Aunque se puede calcular para valores pequeños de estados, rápidamente se vuelve imposible de determinar.  
- Es importante porque demuestra que no todo problema tiene solución algorítmica, incluso en un modelo tan básico como la máquina de Turing.

## Busy Beaver conocidos

Los busy beaver que imprime la mayor cantidad de "1" conocidos son:

- 1 estado: Imprime 1 solo "1" antes de detenerse.  
- 2 estados: Imprime 4 símbolos "1".  
- 3 estados: Imprime 6 símbolos "1".  
- 4 estados: Imprime 13 símbolos "1".  
- 5 estados: Recientemente se ha demostrado que el valor máximo es 4098 símbolos "1".  
- 6 estados: No se conoce el valor exacto, pero se sabe que es mayor a  1.29 x 10**895  

# Máquinas disponibles en esta aplicación:

- copiar.json Copia una tira de "1" consecutivos  
- multiplicar.json multiplica dos tiras de unos separadas por un espacio  
- ncuadrado.json eleva al cuadrado una tira de unos
- busyBeaver-2.json Imprime 4 símbolos "1".  
- busyBeaver-3.json: Imprime 6 símbolos "1".  
- busyBeaver-4.json: Imprime 13 símbolos "1".  
- bb501.json: imprime 501 "1", (no es el maximo conocido de 4098)
 