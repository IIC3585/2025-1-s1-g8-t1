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
        execute_modifications(data);
    })
    .catch(error => {
        console.error('Error reading CSV:', error);
    });

const execute_modifications = (data) => {
    let option = 1;

    switch(option){
        case 1:
           let swap_columns = swap_columns_curried(data);
           data = swap_columns(1,2);
        case 2:

        case 3:
            let columns_to_rows = transpose;
            data = columns_to_rows(data);
        case 4:
            let rows_to_columns = transpose;
            data = rows_to_columns(data); 
    }

    console.log("Modified data:", data);
}


const swap_columns_curried = (data) => {
    return (n, m) => {
        // Se cambian columnas por filas para procesamiento más sencillo
        data = transpose(data);
        // Se realiza un intercambio facil de "filas"
        [data[n], data[m]] = [data[m], data[n]];
        // Se revierte el cambio para volver a tener columnas
        data = transpose(data);
        return data;
    }
}

const operate_on_columns = (data, operation) => {
    return transpose(
        operation(
            transpose(data)
        )
    );
}

function transpose(data) {
    return data.reduce((prev, next) => next.map((item, i) =>
      (prev[i] || []).concat(next[i])
    ), []);
}