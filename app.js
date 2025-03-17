
// Utilisation de APi OpenWeatherMap pour afficher la météo d'une ville
// Fait avec Ajax

const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?q=';
const key = 'dc8c9152e8adaad0ec8bf635818c0d42';


/**
 * Afficher la météo dans le UI
 *
 * */
function meteo(response) {
    let temperature = response.main.temp;
    let ville = response.name;

    document.querySelector('#ville').textContent = ville;
    document.querySelector('#temperature_label').textContent = temperature;
}

/**
 * Evenement sur le bouton Changer
 */
function EvenementBoutonChanger()  {
    let bouton = document.querySelector('#changer');

    bouton.addEventListener('click', function() { 
        // Changer la ville
        let ville = prompt('Quelle ville souhaitez-vous voir ?');
        
        RecevoirTemperature(ville);
    }); 
}

/**
 * Fonction pour recevoir la température
 * 
 * @param {*} ville La ville dont on veut la température
 */
function RecevoirTemperature(ville) {
    // Créer Requête
    let requete = new XMLHttpRequest();

    let url = baseUrl + ville + '&appid=' + key + '&units=metric';

    requete.open('GET', url);
    requete.responseType = 'json';
    requete.send();

    // Attendre la réponse de la requête
    requete.onload = function() { 
        if (requete.readyState === XMLHttpRequest.DONE) {
            if (requete.status === 200) {
                let response = requete.response;
                //console.log(response);
                meteo(response);
            } else {
                alert('Un problème est survenu, merci de revenir plus tard.');
            }
        }
    }
}


// Appel de la fonction du bouton.
EvenementBoutonChanger();



