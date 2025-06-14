const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const navActions = document.querySelector('.nav-actions');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    navActions.classList.toggle('open');
    navToggle.classList.toggle('open');
});

const sections = document.querySelectorAll('main section[id]');
const navItems = document.querySelectorAll('.nav-links a');

const NAVBAR_HEIGHT = 80;

function activateNavLink() {
    let scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - NAVBAR_HEIGHT;
        const sectionId = current.getAttribute('id');

        if (
            scrollY >= sectionTop &&
            scrollY < sectionTop + sectionHeight
        ) {
            navItems.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Llama al activar scroll y al cargar
window.addEventListener('scroll', activateNavLink);
window.addEventListener('DOMContentLoaded', activateNavLink);

// Scroll suave y cierre de menú en mobile
navItems.forEach(link => {
    link.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href').slice(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            e.preventDefault();
            const y = targetSection.getBoundingClientRect().top + window.pageYOffset - NAVBAR_HEIGHT;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
        navLinks.classList.remove('open');
        navActions.classList.remove('open');
        navToggle.classList.remove('open');
    });
});