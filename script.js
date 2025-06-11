// script.js

document.addEventListener('DOMContentLoaded', () => {
    // Menú Responsive
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('nav');

    if (burger && nav) {
        burger.addEventListener('click', () => {
            nav.classList.toggle('active');
            burger.classList.toggle('toggle');
        });

        // Cerrar el menú al hacer clic en un enlace (opcional)
        const navLinks = document.querySelectorAll('nav ul li a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                burger.classList.remove('toggle');
            });
        });
    }

    // Animaciones al Desplazarse
    const faders = document.querySelectorAll('.fade-in');
    const sliders = document.querySelectorAll('.slide-in');

    const appearOptions = {
        threshold: 0,
        rootMargin: "0px 0px -100px 0px"
    };

    const appearOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    if (faders.length) {
        faders.forEach(fader => {
            appearOnScroll.observe(fader);
        });
    }

    if (sliders.length) {
        sliders.forEach(slider => {
            appearOnScroll.observe(slider);
        });
    }

    // Barra de Progreso al Desplazarse
    const progressBar = document.getElementById('progressBar');
    if (progressBar) {
        window.addEventListener('scroll', () => {
            const totalHeight = document.body.scrollHeight - window.innerHeight;
            const progressHeight = (window.pageYOffset / totalHeight) * 100;
            progressBar.style.width = `${progressHeight}%`;
        });
    }

    // Funcionalidad para el botón personalizado de Traducción
    const translateButton = document.getElementById('translateButton');
    if (translateButton) {
        translateButton.addEventListener('click', function() {
            // Alternar visibilidad del dropdown personalizado
            const customSelect = document.getElementById('customTranslateSelect');
            if (customSelect) {
                customSelect.classList.toggle('show');
            }
        });
    }

    // Funcionalidad para el dropdown personalizado de Traducción
    const customTranslateSelect = document.getElementById('customTranslateSelect');
    if (customTranslateSelect) {
        customTranslateSelect.addEventListener('change', function() {
            const selectedLang = this.value;
            if (selectedLang) {
                translatePage(selectedLang);
            }
        });
    }
});

// Load blog posts from posts.js
loadBlogPosts();

// Define the loadBlogPosts function
function loadBlogPosts() {
    const blogContainer = document.getElementById('blog-posts');
    if (!blogContainer) return;

    if (!Array.isArray(posts) || posts.length === 0) {
        blogContainer.innerHTML = "<p>No hay publicaciones disponibles en este momento.</p>";
        return;
    }

    posts.forEach(post => {
        const postCard = document.createElement('div');
        postCard.classList.add('blog-card', 'fade-in');

        const postImage = document.createElement('img');
        postImage.src = post.image;
        postImage.alt = post.title;

        const postContent = document.createElement('div');
        postContent.classList.add('blog-content');

        const postTitle = document.createElement('h3');
        postTitle.textContent = post.title;

        const postDate = document.createElement('p');
        postDate.classList.add('post-date');
        postDate.textContent = post.date;

        const postSummary = document.createElement('p');
        postSummary.textContent = post.content;

        if (post.link) {
            const readMoreBtn = document.createElement('a');
            readMoreBtn.href = post.link;
            readMoreBtn.classList.add('btn');
            readMoreBtn.textContent = 'Leer Más';
            readMoreBtn.target = '_blank';
            readMoreBtn.rel = 'noopener noreferrer';
            postContent.appendChild(readMoreBtn);
        }

        postContent.appendChild(postTitle);
        postContent.appendChild(postDate);
        postContent.appendChild(postSummary);

        postCard.appendChild(postImage);
        postCard.appendChild(postContent);

        blogContainer.appendChild(postCard);
    });
}

function googleTranslateElementInit() {
    new google.translate.TranslateElement({
        pageLanguage: 'es',
        includedLanguages: 'en,fr,de', // Idiomas disponibles (puedes añadir más separados por coma)
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE
    }, 'google_translate_element');
}

// JavaScript para el modal y los colapsables
// Obtener elementos
var modal = document.getElementById("tocModal");
var btn = document.getElementById("tocButton");
var span = document.getElementsByClassName("close")[0];

// Abrir el modal al hacer clic en el botón
if (btn && modal && span) {
    btn.onclick = function() {
        modal.style.display = "block";
    }

    // Cerrar el modal al hacer clic en la 'X'
    span.onclick = function() {
        modal.style.display = "none";
    }

    // Cerrar el modal al hacer clic fuera del contenido
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

// Funcionalidad de los colapsables
var collapsibles = document.getElementsByClassName("collapsible");
for (var i = 0; i < collapsibles.length; i++) {
    collapsibles[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.maxHeight && content.style.maxHeight !== "0px") {
            content.style.maxHeight = "0px";
            this.setAttribute("aria-expanded", "false");
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
            this.setAttribute("aria-expanded", "true");
        }
    });
}

// Scrollspy Simple
window.addEventListener('scroll', function() {
    var sections = document.querySelectorAll('main section');
    var navLinks = document.querySelectorAll('nav .nav-links a');

    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 60;
        if (pageYOffset >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});
