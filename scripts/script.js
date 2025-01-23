function retournerMessageScore(score, nbMotsProposes) {
    let spanScore = document.querySelector(".zoneScore span");
    spanScore.innerHTML = `${score} / ${nbMotsProposes}`;

    // console.log("Votre score est de " + score + " sur " + nbMotsProposes)
}

function afficherProposition(proposition) {
    let zoneProposition = document.querySelector(".zoneProposition")
    zoneProposition.innerText = proposition;
}

/**
 * Cette fonction construit et affiche l'email.
 * @param {string} nom : le nom du joueur
 * @param {string} email : l'email de la personne avec qui il veut partager son score
 * @param {string} score : le score.
 */
function afficherEmail(nom, email, score) {
    let mailto = `mailto:${email}?subject=Partage du score Azertype&body=Salut, je suis ${nom} et je viens de réaliser le score ${score} sur le site d'Azertype !`
    location.href = mailto
}

function validerNom(nom) {
    if (nom.length >= 2) {
        return true;
    }
    return false;
}

function validerMail(mail) {
    let emailRegExp = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+");
    if (emailRegExp.test(mail)) {
        return true;
    }
    return false;
}

/**
 * Cette fonction affiche le message d'erreur passé en paramètre.
 * Si le span existe déjà, alors il est réutilisé pour ne pas multiplier
 * les messages d'erreurs.
 * @param {string} message
 */
function afficherMessageErreur(message) {

    let spanErreurMessage = document.getElementById("erreurMessage")

    if (!spanErreurMessage) {
        let popup = document.querySelector(".popup")
        spanErreurMessage = document.createElement("span")
        spanErreurMessage.id = "erreurMessage"

        popup.append(spanErreurMessage)
    }

    spanErreurMessage.innerText = message
}

/**
 * Cette fonction permet de récupérer les informations dans le formulaire
 * de la popup de partage et d'appeler l'affichage de l'email avec les bons paramètres.
 * @param {string} scoreEmail
 */
function gererFormulaire(scoreEmail) {
    try {
        let baliseNom = document.getElementById("nom")
        let nom = baliseNom.value
        validerNom(nom)

        let baliseEmail = document.getElementById("email")
        let email = baliseEmail.value
        validerMail(email)
        afficherMessageErreur("")
        afficherEmail(nom, email, scoreEmail)

    } catch (erreur) {
        afficherMessageErreur(erreur.message)
    }

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

    let form = document.querySelector("form");

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        let scoreEmail = `${score} /${i}`;
        gererFormulaire(scoreEmail)


    })

    retournerMessageScore(score, i);
}

