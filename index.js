'use strict';

const letterToRune = {
    'A': '&#5829;',
    'a': '&#5829;',
    'B': '&#5842;',
    'b': '&#5842;',
    'C': '&#5812;',
    'c': '&#5812;',
    'D': '&#5841;',
    'd': '&#5841;',
    'E': '&#5821;',
    'e': '&#5821;',
    'F': '&#5792;',
    'f': '&#5792;',
    'G': '&#5813;',
    'g': '&#5813;',
    'H': '&#5820;',
    'h': '&#5820;',
    'I': '&#5825;',
    'i': '&#5825;',
    'J': '&#5825;',
    'j': '&#5825;',
    'K': '&#5812;',
    'k': '&#5812;',
    'L': '&#5850;',
    'l': '&#5850;',
    'M': '&#5848;',
    'm': '&#5848;',
    'N': '&#5822;',
    'n': '&#5822;',
    'O': '&#5805;',
    'o': '&#5805;',
    'P': '&#5844;',
    'p': '&#5844;',
    'Q': '#',
    'q': '#',
    'R': '&#5809;',
    'r': '&#5862;',
    'S': '&#5835;',
    's': '&#5835;',
    'T': '&#5839;',
    't': '&#5839;',
    'U': '&#5794;',
    'u': '&#5794;',
    'V': '&#5792;',
    'v': '&#5792;',
    'W': '#',
    'w': '#',
    'X': '#',
    'x': '#',
    'Y': '&#5796;',
    'y': '&#5796;',
    'Z': '#',
    'z': '#',
    'Å': '&#5800;',
    'å': '&#5800;',
    'Ä': '&#5821;',
    'ä': '&#5821;',
    'Ö': '&#5794;',
    'ö': '&#5794;',
    'th': '&#5798;',
    ' ': ' ',
}

const words = [
    "hej",
    "hon",
    "han",
    "den",
    "det",
    "finns",
    "fisk",
    "kissa",
    "bajsa",
    "mat",
    "äta",
    "sova",
    "gRis",
    "ko",
    "vete",
    "dRicka",
    "vatten",
    "gjorde",
    "Ris",
    "leka",
    "toRka",
    "vila",
    "nappen",
    "blöjoR",
    "Råg",
    "get",
    "fåR",
    "getteR",
    "hus",
    "björn",
    "katt",
    "hund",
    "äpple",
    "banan",
    "päRon",
    "staRk",
    "svag",
    "vinna",
    "föRloRa",
    "ge",
    "få",
    "många",
    "skicka",
    "kön",
    "kyRka",
    "vanhelga",
    "latin",
    "kung",
    "dRottning",
    "pengaR",
    "dRev",
    "svärd",
    "sköld",
    "högaffel",
    "båt",
    "skepp",
    "gRäs",
    "halm",
    "hövding",
    "knä",
    "hand",
    "fot",
    "huvud",
    "oRm",
    "fenRis",
    "vaRg",
    "kRåka",
    "måne",
    "sol",
    "Rustning",
    "kniv",
    "potatis",
    "kött",
    "öRn",
    "lag",
    "gRön",
    "gul",
    "bRun",
    "blå",
    "Röd",
    "Rosa",
    "lila",
    "klocka",
];
const awords = ["pastor"]

function randomInt(max){
    return Math.floor(Math.random()*max);
}

const vowles = [..."aoeuiyåäö"]
function removeDoubleConsonants(word){
    let chars=[...word];
    console.log(vowles);
    for (let i=chars.length-1; i>=0; i --){
        console.log(vowles.indexOf(chars[i]));
        if(i <= chars.length && chars[i] === chars[i-1]){
            if(vowles.indexOf(chars[i])>=0){
                continue;
            } else {
                chars.splice(i,1);
            }
        }

    }
    return chars;
}

function generate(wordlist){
    let word = wordlist[randomInt(wordlist.length)];
    sessionStorage.setItem("word", word);
    word = word.replaceAll("c", "k").replaceAll("v","f").replaceAll("j","i");
    word = removeDoubleConsonants(word);
    console.log(word);
    let runes = [...word].map(c => letterToRune[c]);
    // Remove duplicates in a row
    // for (let i=runes.length-1; i > 0; i--) {
    //     if(i <= runes.length && runes[i] === runes[i - 1]){
    //         runes.splice(i,1);
    //     }
    // }
    document.getElementById("output").innerHTML = runes.join("");
    document.getElementById("inputfield").value = "";
    document.getElementById("rightWrong").innerHTML = "";
    document.getElementById("answer").innerHTML = "";
}

function submit(){
    let answer = document.getElementById("inputfield").value;
    let word = sessionStorage.getItem("word");
    if (answer.toLowerCase() == word.toLowerCase()) {
        document.getElementById("rightWrong").innerHTML = "Rätt!";
        sessionStorage.setItem("score", parseInt(sessionStorage.getItem("score"),10)+1);
    } else {
        document.getElementById("rightWrong").innerHTML = "Fel!";
        sessionStorage.setItem("score", 0);
    }
    document.getElementById("score").innerHTML = sessionStorage.getItem("score");
}

function translate(){
    let letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZÅÄÖ".split('');
    let only_r = "                 r           ".split('');
    let runes = [...letters].map(c => letterToRune[c]);
    let runes2= [...only_r].map(c => letterToRune[c]);

    let rows = [letters, runes, runes2];

    let table = document.createElement("table");
    for (let row in rows){
        let tr = document.createElement("tr");
        for (let col in rows[row]){
            let td = document.createElement("td");
            td.innerHTML = rows[row][col];
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    document.getElementById("translation").appendChild(table);

}
function doGenerate(){generate(words);}

document.getElementById("generate").addEventListener("click", doGenerate);
document.getElementById("submit").addEventListener("click", submit);
document.getElementById("inputfield").addEventListener("keypress", function(event){
    if (event.key =="Enter"){
        event.preventDefault();
        document.getElementById("submit").click();
    }
});

document.getElementById("showAnswer").addEventListener("click", function(){
    document.getElementById("answer").innerHTML = sessionStorage.getItem("word")
});
translate();
doGenerate();
