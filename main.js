const fs = require('fs');
const iterator = require("./iterator.js");

function readCSVFile(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf-8', (error, data) => {
            if (error) {
                reject(error);
                return;
            }
            const rows = data.split('\n');
            const parsedData = rows.map(row => row.split(',').map(cell => cell.trim()));
            resolve(parsedData);
        });
    });
}

const filePath = 'data.csv';
const rows_or_columns = "rows";
readCSVFile(filePath)
    .then(data => {
        console.log('CSV Data:', data);
        data = do_operation(data, rows_or_columns, to_html_table, []);
        console.log('Swapped Data:', data);
    })
    .catch(error => {
        console.error('Error reading CSV:', error);
    });

const delete_entry = (data, n) => {
    data.splice(n, 1)
    return data
}

const insert_entry = (data, n, array_to_insert) => {
    data.splice(n, 0, array_to_insert)
    return data
}

const swap = (data, n, m) => {
    // Se realiza un intercambio facil de "filas" (o columnas previamente transpuestas)
    [data[n], data[m]] = [data[m], data[n]];  
    return data;
}

// do_operation recibe un parametro que determina si la operación es para filas o columnas
const do_operation = (data, rows_or_columns, operation, paramaters) => {
    switch(rows_or_columns) {
        //Caso filas: Ejecutar operación
        case "rows":
            return operation(data, ...paramaters);
        //Caso columnas: Convertir a filas
            case "columns":
            return operate_on_columns(data, operation, paramaters);
    }
}

const operate_on_columns = (data, operation, paramaters) => {
    // Para operar en columnas, se puede transponer, utilizar la operación por filas y transponer de nuevo.
    return transpose(
            operation(
                transpose(data), ...paramaters
            )
    );
}

const to_html_table = (data) => {
    // Generate table rows and cells using map
    const tableRows = data.map(row => {
        // Generate cells for each row using map
        const cells = row.map(cell => {
            return `    <td>${cell}</td>\n`;
        }).join('');
        
        // Return the row with its cells
        return `  <tr>\n${cells}  </tr>\n`;
    }).join('');
    
    // Return the complete HTML table
    return `\n<table>\n${tableRows}</table>`;
}

// Funcion que convierte filas en columnas y viceversa
function transpose(data) {
    // Funcion reduce que crea un array vacio y lo llena iterativamente
    // Prev es el array previo, next es el siguiente elemento
    return data.reduce((prev, next) => 
        // Se utiliza un .map() bidimensional para poder acceder al segundo indice de data (las columnas)
        next.map((item, i) =>
        //Se concatenan todos los valores de una columna en un array
        (prev[i] || []).concat(next[i])
    ), []);
}