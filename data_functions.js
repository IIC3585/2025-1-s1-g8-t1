const fs = require('fs');
const readline = require('readline');

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

function writeCSVFile(filePath, data) {
    return new Promise((resolve, reject) => {
        const rows = data.map(row => row.join(',')).join('\n');
        fs.writeFile(filePath, rows, 'utf-8', (error) => {
            if (error) {
                reject(error);
                return;
            }
            resolve();
        });
    });
}

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

// Funcion que convierte filas en columnas y viceversa, extraida de https://stackoverflow.com/a/41772644
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

module.exports = {
    readCSVFile,
    writeCSVFile,
    delete_entry,
    insert_entry,
    swap,
    operate_on_columns,
    transpose,
    to_html_table
};