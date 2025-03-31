const readline = require('readline');
const {
    readCSVFile,
    writeCSVFile,
    delete_entry,
    insert_entry,
    swap,
    transpose,
    to_html_table,
    operate_on_columns,
    do_operation,
} = require('./data_functions.js');
const { write } = require('fs');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const filePath = "data.csv" 

rl.question(`Seleccione el operador que desea aplicar al .csv:\n
    1) Filas a columnas
    2)Columnas a filas
    3)Swap de columnas(requiere índices n y m)
    4)Eliminar fila (requiere índice)
    5)Eliminar columna (requiere índice)
    6)Insertar fila (después del índice n)
    7) Insertar columna (después del índice n)
    8)Generar tabla html\n Ingrese la opción: `, function(option) {
    readCSVFile(filePath)
        .then(data => {
            switch(option) {
                case "1":
                    // Filas a columnas (sin input adicional)
                    data =transpose(data.splice(1))   // Esto sirve aplicado acá, pero hay que ver el resto, para eliminar la fila de índices (name, age, city)
                    console.log("Operación Filas a Columnas:", data);
                    writeCSVFile(filePath.replace(".csv", "_modified.csv"), data);
                    rl.close();
                    break;

                case "2":
                    // Columnas a filas (sin input adicional)
                    data = transpose(data.splice(1));
                    console.log("Operación Columnas a Filas:", data);
                    writeCSVFile(filePath.replace(".csv", "_modified.csv"), data);
                    rl.close();
                    break;

                case "3":
                    // Swap de columnas: se piden dos índices
                    rl.question("Ingrese los índices n y m separados por coma (ej: 1,2): ", function(indices) {
                        const [n, m] = indices.split(',').map(Number);
                        data = swap(data.splice(1), n, m); // o data solo, revisar porfa
                        console.log("Swap realizado:", data);
                        writeCSVFile(filePath.replace(".csv", "_modified.csv"), data);
                        rl.close();
                    });
                    break;

                case "4":
                    // Eliminar fila: se pide el índice
                    rl.question("Ingrese el índice de la fila a eliminar: ", function(n) {
                        data = delete_entry(data, Number(n));
                        console.log("Fila eliminada:", data);
                        writeCSVFile(filePath.replace(".csv", "_modified.csv"), data);
                        rl.close();
                    });
                    break;

                case "5": //Revisar
                    // Eliminar columna: la idea aca es trasponer, eliminar y volver a trasponer
                    rl.question("Ingrese el índice de la columna a eliminar: ", function(n) {
                        data = operate_on_columns(data, delete_entry, [Number(n)]);
                        console.log("Columna eliminada:", data);
                        writeCSVFile(filePath.replace(".csv", "_modified.csv"), data);
                        rl.close();
                    });
                    break;
                case "6":// Revisar
                    // Insertar fila:  pide el índice y luego la nueva fila (en formato separado por comas), Revisar el tema de índices
                    rl.question("Ingrese el índice después del cual insertar la nueva fila: ", function(n) {
                        rl.question("Ingrese los valores de la nueva fila separados por coma (ej: Valor1, Valor2, Valor3): ", function(newRow) {
                            const newRowArray = newRow.split(',').map(cell => cell.trim());
                            data = insert_entry(data, Number(n) + 1, newRowArray);
                            console.log("Fila insertada:", data);
                            writeCSVFile(filePath.replace(".csv", "_modified.csv"), data);
                            rl.close();
                        });
                    });
                    break;
                case "7":
                    // Insertar columna: se pide el índice y luego la nueva columna (para cada fila)
                    // Nota: se asume que se inserta el mismo valor en cada fila o se podría solicitar un valor distinto para cada una.
                    rl.question("Ingrese el índice después del cual insertar la nueva columna: ", function(n) {
                        rl.question("Ingrese el valor para la nueva columna (se insertará en cada fila): ", function(newValue) {
                            // Primero transponemos para operar como filas
                            let transposed = transpose(data);
                            // Se inserta la nueva 'fila' que corresponde a la columna, en cada fila transpuesta
                            // Aquí se inserta el valor en cada fila transpuesta
                            transposed = transposed.map(row => {
                                const index = Number(n) + 1;
                                row.splice(index, 0, newValue);
                                return row;
                            });
                            // Se vuelve a transponer para obtener el resultado final
                            data = transpose(transposed);
                            console.log("Columna insertada:", data);
                            writeCSVFile(filePath.replace(".csv", "_modified.csv"), data);
                            rl.close();
                        });
                    });
                    break;

                case "8":
                    // Llamada a la función to_html_table
                    const htmlTable = to_html_table(data);
                    console.log("Tabla HTML generada:\n", htmlTable);
                    rl.close();
                    break;

                    
                default:
                    console.log("Opción no válida, seleccione un número del 1 al 8");
                    rl.close();
            }
        })
        .catch(error => {
            console.error("Error al leer el CSV:", error);
            rl.close();
        });
});