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
readCSVFile(filePath)
    .then(data => {
        console.log('CSV Data:', data);
        data = do_operation(data, "rows", to_html_table, []);
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
    // Se realiza un intercambio facil de "filas"
    [data[n], data[m]] = [data[m], data[n]];  
    return data;
}

const do_operation = (data, rows_or_columns, operation, paramaters) => {
    switch(rows_or_columns) {
        case "rows":
            return operation(data, ...paramaters);
        case "columns":
            return operate_on_columns(data, operation, paramaters);
    }
}

const operate_on_columns = (data, operation, paramaters) => {
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

function transpose(data) {
    return data.reduce((prev, next) => next.map((item, i) =>
      (prev[i] || []).concat(next[i])
    ), []);
}