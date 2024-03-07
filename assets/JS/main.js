//Déclarons nos variable qui vont nous servir dans ce code

let table = [["", "", ""], ["", "", ""], ["", "", ""]];
let tableContainer = document.querySelector("#table")
let lap = 1
let gameOver = false
let score = 0
let cpuMode = true
let lapContainer = document.querySelector("#lap")

// cette fonction fait jouer un IA random qui ne gagne quasi jamais.

function bot() {

    if (lap <= 9) {
        let rand = random(0, 8)
        while (document.querySelectorAll(".cell")[rand].innerHTML != "") {
            rand = random(0, 8)
        }
        document.querySelectorAll('.cell')[rand].click()
    }
}

// ici nous affichons le tableau du morpion

function display() {
    document.querySelector("#replay").classList.add("hide")
    document.querySelector("#draw").classList.remove("hide")
    tableContainer.innerHTML = ""
    draw.innerHTML = ""
    table.forEach((row, indexOne) => {
        let elem = document.createElement("div")
        elem.classList.add("row")
        tableContainer.appendChild(elem)
        row.forEach((cel, indexTwo) => {
            let cell = document.createElement("div")
            cell.classList.add("cell")
            elem.appendChild(cell)
            // la fonction ci dessou sert en cliquant sur une cellule a activé quelque chose
            cell.addEventListener("click", () => {
                displayTicTac(cell, indexOne, indexTwo)
            }, { once: true })
        });
    });
}

// avec cette fonction nous affichons les X ou les O en fonction du lap dans lequel ils sont

function displayTicTac(cell, indexOne, indexTwo) {
    if (gameOver == false) {
        if (lap % 2 == 0) {
            cell.textContent = "O"
            table[indexOne][indexTwo] = "O"
            win()
        } else {
            cell.textContent = "X"
            table[indexOne][indexTwo] = "X"
            win()
            if (cpuMode == true && gameOver == false) {
                lap++
                bot()
                lap++
            }
        }
        if (cpuMode == false) {
            lap++
        }
    }
}

// si un des joueurs gagne c'est cette fonction qui entre en jeu

function win() {
    for (let i = 0; i < 3; i++) {
        if (table[i][0] != "" && table[i][0] == table[i][1] && table[i][1] == table[i][2]) {
            gameOver = true
            score++
            let div = document.createElement("div")
            div.textContent = `GG vous avez gagner ${score}`
            gg.appendChild(div)
            document.querySelector("#replay").classList.remove("hide")
        }
        if (table[0][i] != "" && table[0][i] == table[1][i] && table[1][i] == table[2][i]) {
            console.log("gagné");
            gameOver = true
            score++
            let div = document.createElement("div")
            div.textContent = `GG vous avez gagner ${score}`
            gg.appendChild(div)
            document.querySelector("#replay").classList.remove("hide")
        }
    }
    if (table[0][0] != "" && table[0][0] == table[1][1] && table[1][1] == table[2][2]) {
        console.log("gagné");
        gameOver = true
        score++
        let div = document.createElement("div")
        div.textContent = `GG vous avez gagner ${score}`
        gg.appendChild(div)
        document.querySelector("#replay").classList.remove("hide")
    }
    if (table[2][0] != "" && table[2][0] == table[1][1] && table[1][1] == table[0][2]) {
        console.log("gagné");
        gameOver = true
        score++
        let div = document.createElement("div")
        div.textContent = `GG vous avez gagner ${score}`
        gg.appendChild(div)
        document.querySelector("#replay").classList.remove("hide")
    }
    if (lap > 8 && gameOver == false) {
        document.querySelector("#replay").classList.remove("hide")
        let div = document.createElement("div")
        gameOver = false
        div.textContent = `Il n'y a pas de gagnant!`
        draw.appendChild(div)
    }
}

// cette fonction nous sert a recommencer le jeu

function replay() {
    gg.textContent = ""
    table = [["", "", ""], ["", "", ""], ["", "", ""]];
    lap = 1
    gameOver = false
    display()
}

// fonction randomize bien connu des service de police

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//fonction qui determine si c'est le bot joue

function gameMode(isCpu) {
    cpuMode = isCpu
    display()
}

