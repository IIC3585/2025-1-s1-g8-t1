# Diseño Avanzado de Aplicaciones Web - Tarea 1: JavaScript Funcional

**Integrantes: Agustín Pini, Bruno Tike, Rafael Fodor**
**Sección 1, Grupo 8**

Este proyecto consiste en un modificador sencillo de archivos .csv creado mediante el paradigma de programación funcional en el lenguaje JavaScript y controlado por la terminal.

Este programa es capaz de agregar y eliminar filas y columnas. Además de cambiar el orden de dos filas o columnas, cambiar columnas a filas y viceversa, y convertir la tabla a formato HTML.

El approach consiste en el hecho de que las operaciones solo estan definidas para filas, sin embargo se pueden modificar columnas al transponer los datos, modificar las columnas como filas y luego transponer de nuevo, reduciendo el número de funciones definidas. El programa luego devuelve un archivo .csv con los cambios realizados.

Se utilizan elementos funcionales como los métodos map() y reduce(). Además de las estrategias de compose y el uso correcto de funciones asíncronas.

Este programa hace uso de las librerías readline para el manejo desde la terminal y fs para procesar archivos.

Para iniciar, escribir en terminal el comando:
```
node .\prompts.js
```