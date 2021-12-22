const maxNumeri = 5;
const tempoAttesa = 10000;
let time = (tempoAttesa / 1000);
let numero = [];
fineGioco = false;

for (let i = 0; i < maxNumeri; i++) {
    const max = 50;
    const min = 1;
    let numeriDiversi = true;
    let casuale = Math.floor(Math.random() * max + min);
    for (let j = 0; j < numero.length; j++)
        if (numero[j] == casuale) {
            numeriDiversi = false;
            console.log('fallito', casuale);
        }
    if (numeriDiversi) {
        numero.push(casuale);
        if (i < maxNumeri - 1)
            document.getElementById('numeri').innerHTML += `${numero[numero.length - 1]}, `;
        else {
            document.getElementById('numeri').innerHTML += `${numero[numero.length - 1]}`;
            document.getElementById('time').innerHTML = `HAI ${time} SECONDI PER MEMORIZZARE`;
        }
    } else
        i--;
}

time--;
const contaTempo = setInterval(timer, 1000);

// FUNZIONI FUNZIONI FUNZIONI FUNZIONI FUNZIONI FUNZIONI FUNZIONI 
function timer() {
    document.getElementById('time').innerHTML = ` HAI ${time} SECONDI PER MEMORIZZARE `;
    time--;
    if (time == 0) {
        clearInterval(contaTempo);
        return;
    }
}

setTimeout(function () {
    console.log(numero);
    document.getElementById('contenitore').innerHTML = `
    <span style="font-size: 40px;"> INDOVINALI !! </span> 
    <input id="indovinaNumeri" type="text"></input>
    <p id="errore"></p>`;
    document.getElementById('indovinaNumeri').addEventListener('keyup', function (event) {
        if (!fineGioco) {
            if (event.key == 'Enter') {
                let numeriUtente = estraiNumeriHomeMade(document.getElementById('indovinaNumeri').value);
                console.log(numeriUtente.length);
                if (numeriUtente.length == maxNumeri) {
                    let puntiUtente = punteggio(numeriUtente, numero);
                    document.getElementById('errore').style.color = "green";
                    if (puntiUtente == 0) {
                        document.getElementById('errore').innerHTML = `BUUUUUU NON HAI INDOVINATO NEANCHE UN NUMERO !! `;
                        document.getElementById('errore').style.color = "red";
                    }
                    else if (puntiUtente < maxNumeri / 2)
                        document.getElementById('errore').innerHTML = `BRAVO, HAI INDOVINATO ${puntiUtente} NUMERI !!`;
                    else
                        document.getElementById('errore').innerHTML = `CONGRATULAZIONE, HAI INDOVINATO ${puntiUtente} NUMERI !!`;
                    fineGioco = true;
                    document.getElementById('fine').innerHTML = ` i numeri erano : ${numero}`;
                }
                else
                    document.getElementById('errore').innerHTML = `ATTENZIONE, i numeri sono ${maxNumeri} !!!`;
            }
        }
    });
}, tempoAttesa);

function punteggio(numeriUtente, numeriDaIndovinare) {
    let punti = 0;
    let controllaNumero = numeriDaIndovinare;
    for (let i = 0; i < numeriUtente.length; i++) {
        let arrayTemp = [];
        for (let j = 0; j < controllaNumero.length; j++) {
            console.log('loop1');
            if (numeriUtente[i] == controllaNumero[j])
                punti++;
            else
                arrayTemp.push(controllaNumero[j])
        }
        controllaNumero = arrayTemp;
        console.log(controllaNumero);
        console.log('loop2');
    }
    return punti;
}

function estraiNumeriHomeMade(stringa) {
    let antiloop = 0;
    console.log('passata la stringa : ', stringa);
    let indexStringa = 0;
    let numeri = [];
    let stringaTemp = '';
    let stringaCorretta = false;
    while (indexStringa < stringa.length) {
        stringaTemp = '';
        stringaCorretta = false;
        while (!isNaN(parseInt(stringa[indexStringa]))) {
            stringaCorretta = true;
            console.log('(secondo while) controllo : ', stringa[indexStringa]);
            stringaTemp += stringa[indexStringa];
            indexStringa++;
            if (indexStringa >= stringa.length)
                break;

            antiloop++;
            if (antiloop > 1000) {
                console.log('errore loop while 1');
                return;
            }

        }
        if (stringaCorretta) {
            console.log('(FUORI DAL secondo while) la stringa temporanea : ', stringaTemp);
            numeri.push(parseInt(stringaTemp));
            console.log('(FUORI DAL secondo while) array numeri : ', numeri);
        }
        indexStringa++;

        antiloop++;
        if (antiloop > 1000) {
            console.log('errore loop while 2');
            return;
        }
    }
    return numeri;
}