module.exports = function solveSudoku(matrix) {
    var initial = matrix;

    var a;
    var b;
    let massProverka = [];
    let arrHorizontal = [];
    let arrVertikal = [];
    let arrSquare = [];
    let massAB;
    let zero = 0;

    function createArrVertikal(b) {
        let q = 0;
        arrVertikal = [];
        while (q < 9) {
            arrVertikal.push(+initial[q].slice(b, b + 1));
            q++;
        };
        return arrVertikal;
    };


    function createArrSquare(a, b) {
        let startSquareA = 0;
        let startSquareB = 0;
        if (a >= 0 && a <= 2) { startSquareA = 0 };
        if (a >= 3 && a <= 5) { startSquareA = 3 };
        if (a >= 6 && a <= 8) { startSquareA = 6 };
        if (b >= 0 && b <= 2) { startSquareB = 0 };
        if (b >= 3 && b <= 5) { startSquareB = 3 };
        if (b >= 6 && b <= 8) { startSquareB = 6 };
        arrSquare = [];
        let d = startSquareB;
        while (d >= startSquareB && d <= startSquareB + 2) {
            let q = startSquareA;
            while (q >= startSquareA && q <= startSquareA + 2) {
                arrSquare.push(+initial[q].slice(d, d + 1));
                q++;
            };
            d++;
        };
        return arrSquare;
    };


    function concatMass() {

        return initial[a].concat(createArrVertikal(b)).concat(createArrSquare(a, b))
    };


    function findMassPodstanovki(a, b) {
        massAB = [];
        massProverka = [];
        massAB = initial[a].concat(createArrVertikal(b)).concat(createArrSquare(a, b));
        for (let i = 1; i <= 9; i++) {
            if (!massAB.includes(i)) { massProverka.push(i) }
        };
        return massProverka;
    }


    function howMachZero() {
        zero = 0;
        let bigArray = initial[0].concat(initial[1]).concat(initial[2]).concat(initial[3]).concat(initial[4]).concat(initial[5]).concat(initial[6]).concat(initial[7]).concat(initial[8])
        bigArray.sort();
        for (let i = 0; i < 81; i++) {
            if (bigArray[i] == 0) { zero++ }
        }
        return zero;
    }


    function oneNumber(a, b) {
        for (a = 0; a < 9; a++) {
            b = initial[a].indexOf(0);
            if (b > -1) {
                findMassPodstanovki(a, b);
                if (massProverka.length == 1) {
                    initial[a].splice(b, 1, +massProverka);
                }
            }
            while (initial[a].indexOf(0, b + 1) > -1 && b < 9) {
                b = initial[a].indexOf(0, b + 1);
                findMassPodstanovki(a, b);
                if (massProverka.length == 1) {
                    initial[a].splice(b, 1, +massProverka);
                };
            }
        }
    };


    function stayAllOneNumbers() {
        let q1 = 1;
        let q2 = 0;
        while (q1 > q2) {
            q1 = howMachZero();
            for (a = 0; a < 9; a++) {
                let mass = [];
                let massIndex = [];
                b = initial[a].indexOf(0);
                if (b > -1) {
                    findMassPodstanovki(a, b);
                    mass = mass.concat(massProverka);
                    for (let i = 0; i < massProverka.length; i++) {
                        massIndex.push(b);
                    }
                };
                while (initial[a].indexOf(0, b + 1) > -1 && b < 9) {
                    b = initial[a].indexOf(0, b + 1);
                    findMassPodstanovki(a, b);
                    mass = mass.concat(massProverka);
                    for (let i = 0; i < massProverka.length; i++) {
                        massIndex.push(b);
                    }
                };
                for (let i = 0; i < mass.length; i++) {
                    let poz = mass.indexOf(mass[i]);
                    let pozNew = mass.indexOf(mass[i], poz + 1);
                    if (pozNew == -1) {
                        b = massIndex[poz];
                        initial[a].splice(b, 1, mass[poz]);
                    }
                }
            }
            q2 = howMachZero();
        }
    };


    function saveCurrentArray() {
        return [initial[0].slice(), initial[1].slice(), initial[2].slice(),
            initial[3].slice(), initial[4].slice(), initial[5].slice(),
            initial[6].slice(), initial[7].slice(), initial[8].slice()
        ];
    };




    oneNumber(a, b);
    howMachZero();

    stayAllOneNumbers();
    howMachZero();


    let arr = [];
    arr.push(saveCurrentArray());

    let qwerty = [];
    let bigQwerty = [];
    let arrA = [];
    let arrB = [];


    function goBackAndChange() {
        if (arr.length > 1) {
            arr.pop();
        }

        if (bigQwerty[bigQwerty.length - 1].length > 1) {
            arr[arr.length] = [arr[arr.length - 1][0].slice(), arr[arr.length - 1][1].slice(), arr[arr.length - 1][2].slice(),
                arr[arr.length - 1][3].slice(), arr[arr.length - 1][4].slice(), arr[arr.length - 1][5].slice(),
                arr[arr.length - 1][6].slice(), arr[arr.length - 1][7].slice(), arr[arr.length - 1][8].slice()
            ]
        };

        initial[0] = arr[arr.length - 1][0];
        initial[1] = arr[arr.length - 1][1];
        initial[2] = arr[arr.length - 1][2];
        initial[3] = arr[arr.length - 1][3];
        initial[4] = arr[arr.length - 1][4];
        initial[5] = arr[arr.length - 1][5];
        initial[6] = arr[arr.length - 1][6];
        initial[7] = arr[arr.length - 1][7];
        initial[8] = arr[arr.length - 1][8];
        if (arr.length == 1) {
            arr.unshift(saveCurrentArray());
        }

        a = arrA[arrA.length - 1];
        b = arrB[arrB.length - 1];
        initial[a][b] = bigQwerty[bigQwerty.length - 1].pop();

        if (bigQwerty[bigQwerty.length - 1].length == 0) {
            arrA.pop();
            arrB.pop();
            bigQwerty.pop();
        }
        howMachZero();
        goToStay456();
    };




    let nullInArray;

    function goToStay456() {
        oneNumber(a, b);
        stayAllOneNumbers();
        let q1 = 1;
        let q2 = 0;

        while (q1 > q2 && zero != 0) {
            oneNumber(a, b);
            stayAllOneNumbers();
            arr[arr.length - 1] = [arr[arr.length - 1][0].slice(), arr[arr.length - 1][1].slice(), arr[arr.length - 1][2].slice(),
                arr[arr.length - 1][3].slice(), arr[arr.length - 1][4].slice(), arr[arr.length - 1][5].slice(),
                arr[arr.length - 1][6].slice(), arr[arr.length - 1][7].slice(), arr[arr.length - 1][8].slice()
            ];
            q1 = howMachZero();

            nullInArray = initial[0].concat(initial[1]).concat(initial[2]).concat(initial[3]).concat(initial[4]).concat(initial[5]).concat(initial[6]).concat(initial[7]).concat(initial[8]).indexOf(0);
            if (nullInArray == -1) { return initial; };
            a = Math.floor(nullInArray / 9);
            b = initial[a].indexOf(0);
            qwerty = findMassPodstanovki(a, b);

            if (qwerty.length > 1) {
                arrA.push(a);
                arrB.push(b);
                initial[a][b] = qwerty.pop();
                bigQwerty.push(qwerty);
                oneNumber(a, b);
                stayAllOneNumbers();
                arr.push(saveCurrentArray());
            };
            oneNumber(a, b);
            stayAllOneNumbers();
            if (qwerty.length == 0) {
                goBackAndChange();
            }

            q2 = howMachZero();
            zero = howMachZero();

        }
        zero = howMachZero();

        if (howMachZero() == 0) { return initial; };

    };



    goToStay456();


    return matrix;

}