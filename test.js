

function printSpiralMatrix(n) {
    if (n <= 0) {
        console.log("Please enter a positive number.");
        return;
    }
    var a;
    if(n<10){
        a=3;
    }
    else if(n<5){
        a=2;
    }
    else if(n<2){
        a=1;
    }
    // Initialize matrix with zeros
    let matrix = new Array(a);
    for (let i = 0; i < a; i++) {
        matrix[i] = new Array(a).fill(0);
    }

    let num = 1;
    let rowStart = 0,
        rowEnd = a - 1,
        colStart = 0,
        colEnd = a - 1;

    while (num <= n) {
        // Traverse right
        for (let i = colStart; i <= colEnd; i++) {
            matrix[rowStart][i] = num++;
        }
        rowStart++;

        // Traverse down
        for (let i = rowStart; i <= rowEnd; i++) {
            matrix[i][colEnd] = num++;
        }
        colEnd--;

        // Traverse left
        for (let i = colEnd; i >= colStart; i--) {
            matrix[rowEnd][i] = num++;
        }
        rowEnd--;

        // Traverse up
        for (let i = rowEnd; i >= rowStart; i--) {
            matrix[i][colStart] = num++;
        }
        colStart++;
    }

    // Print matrix
    for (let i = 0; i < n; i++) {
        if(matrix !== undefined){
        console.log(matrix[i].join(" "));
        }
    }
}

const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout
});

readline.question("Enter a number: ", (number) => {
    printSpiralMatrix(parseInt(number));
    readline.close();
});
