function retournerMessageScore(score, nbMotsProposes) {
    let spanScore = document.querySelector(".zoneScore span");
    spanScore.innerHTML = `${score} / ${nbMotsProposes}`;

    // console.log("Votre score est de " + score + " sur " + nbMotsProposes)
}

function afficherProposition(proposition) {
    let zoneProposition = document.querySelector(".zoneProposition")
    zoneProposition.innerText = proposition;
}

function lancerJeu() {
    initAddEventListenerPopup()
    let score = 0;
    let i = 0;
    let listeProposition = listeMots;


    let btnValiderMot = document.getElementById("btnValiderMot");
    let inputEcriture = document.getElementById("inputEcriture");

    afficherProposition(listeProposition[i]);

    btnValiderMot.addEventListener("click", (event) => {
        if (inputEcriture.value === listeProposition[i]) {
            score++;
        }
        i++;
        retournerMessageScore(score, i);

        inputEcriture.value = '';

        if (listeProposition[i] === undefined) {
            afficherProposition("Le jeu est fini");
            btnValiderMot.disabled = true;
        } else {
            afficherProposition(listeProposition[i]);
        }
    })

    let baliseChoix = document.querySelectorAll('.optionSource input')
    for (let i = 0; i < baliseChoix.length; i++) {
        baliseChoix[i].addEventListener('change', event => {
            if (event.target.value === "1") {
                listeProposition = listeMots;
            } else {
                listeProposition = listePhrases;
            }
            afficherProposition(listeProposition[i]);

        })
    }

    retournerMessageScore(score, i);
}

