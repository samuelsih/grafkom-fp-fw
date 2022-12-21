const tiles = [
    10,11,12,13,15,
    19,20,24,
    28,29,30,32,33,34,
    37,38,39,40,41,42,43,
    46,47,48,49,50,51,52,
    55,56
]

export function randomArr(amount) {
    let randomArray = [];
    let n = amount;

    while(n > 0) {
        let randomNumber = tiles[Math.floor(Math.random() * tiles.length)]
        if (!randomArray.includes(randomNumber)) {
            randomArray.push(randomNumber);
            n--;
        }
    }
    return randomArray;
}
