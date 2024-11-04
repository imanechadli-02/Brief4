//carrousel 

const slides = document.querySelectorAll(".slides img");
let slideIndex = 0;
let intervalId = null;
// initializeSlider()

document.addEventListener("DOMContentLoaded", initializeSlider);

function initializeSlider() {
    if (slides.length > 0) {
        slides[slideIndex].classList.add("displaySlide");
        intervalId = setInterval(next, 3000);

    }
    // console.log(intervalId); 
}

function showSlide(index) {

    if (index >= slides.length) {
        slideIndex = 0;

    }
    else if (index < 0) {
        slideIndex = slides.length - 1;
    }
    slides.forEach(slide => {
        slide.classList.remove("displaySlide");
    })
    slides[slideIndex].classList.add("displaySlide");
}

function prev() {
    clearInterval(intervalId);
    slideIndex--;
    showSlide(slideIndex);

}

function next() {
    slideIndex++;
    showSlide(slideIndex);
}



// nuit and light mode////
// Fonction pour activer/désactiver le mode nuit
function toggleNightMode() {
    // Basculer la classe 'night-mode' sur le body
    document.body.classList.toggle('night-mode');

    // Sauvegarder la préférence dans le localStorage
    if (document.body.classList.contains('night-mode')) {
        localStorage.setItem('theme', 'night');
    } else {
        localStorage.setItem('theme', 'day');
    }
}

// Appliquer le mode stocké dans le localStorage au chargement de la page
function applyStoredTheme() {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'night') {
        document.body.classList.add('night-mode');
    }
}

// Ajouter un écouteur d'événement au bouton pour basculer entre les modes
document.getElementById('switch').addEventListener('click', toggleNightMode);

// Appliquer le thème au chargement de la page
applyStoredTheme();



// recherche en temps reel ///
document.getElementById('search-bar').addEventListener('input', function () {
    const query = this.value.toLowerCase(); // Récupère la valeur de la barre de recherche
    const movies = document.querySelectorAll('#movie-list li'); // Sélectionne tous les films

    movies.forEach(movie => {
        const title = movie.textContent.toLowerCase();

        // Vérifie si le titre du film correspond à la recherche
        if (title.includes(query)) {
            movie.style.display = 'block'; // Affiche le film si correspondance
        } else {
            movie.style.display = 'none'; // Masque le film si pas de correspondance
        }
    });
});



// notation par etoile ///
const stars = document.querySelectorAll('.star');
let check = false;
stars.forEach(star => {
    star.addEventListener('mouseover', selectStars);
    star.addEventListener('mouseleave', unselectStars);
    star.addEventListener('click', activeSelect);
})

function selectStars(e) {
    const data = e.target;
    const etoiles = priviousSiblings(data);
    if (!check) {
        etoiles.forEach(etoile => {
            etoile.classList.add('hover');
        })
    }

}

function unselectStars(e) {
    const data = e.target;
    const etoiles = priviousSiblings(data);
    if (!check) {
        etoiles.forEach(etoile => {
            etoile.classList.remove('hover');
        })
    }
}

function activeSelect(e) {
    if (!check) {
        check = true;
        document.getElementById('.rating-output').innerHTML = 'rating-output ' + e.target.dataset.rating-output;
    }
}

function priviousSiblings(data) {
    let values = [data];
    while (data = data.previousSibling) {
        if (data.nodeName === 'I') {
            values.push(data);
        }
    }
    return values;
}