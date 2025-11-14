// ===================================
// LOADER DE PÁGINA
// ===================================
window.addEventListener('load', () => {
    const loader = document.querySelector('.page-loader');
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 1500);
});

// ===================================
// HEADER FLOTANTE CON SCROLL
// ===================================
let lastScroll = 0;
const header = document.querySelector('.floating-header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.classList.remove('hidden');
        return;
    }
    
    if (currentScroll > lastScroll && currentScroll > 80) {
        header.classList.add('hidden');
    } else {
        header.classList.remove('hidden');
    }
    
    lastScroll = currentScroll;
});

// ===================================
// MENÚ MÓVIL TOGGLE
// ===================================
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // Cerrar menú al hacer click en un link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });
}

// ===================================
// SMOOTH SCROLL PARA ENLACES
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = header?.offsetHeight || 80;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// ANIMACIONES CON INTERSECTION OBSERVER
// ===================================
const animatedElements = document.querySelectorAll('.animate__animated');

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate__fadeInUp');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

animatedElements.forEach(element => {
    observer.observe(element);
});

// ===================================
// CONTADOR ANIMADO CON FORMATO
// ===================================
const counters = document.querySelectorAll('.counter');

const formatNumber = (num) => {
    if (num >= 1000) {
        return (num / 1000).toFixed(0) + 'K+';
    }
    return num + '+';
};

const animateCounter = (element) => {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
        current += increment;
        
        if (current < target) {
            element.textContent = formatNumber(Math.ceil(current));
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = formatNumber(target);
        }
    };
    
    updateCounter();
};

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

counters.forEach(counter => {
    counterObserver.observe(counter);
});

// ===================================
// GSAP ANIMATIONS
// ===================================
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Animación del texto principal
    gsap.from('.text-line', {
        scrollTrigger: {
            trigger: '.textoprincipal',
            start: 'top 80%'
        },
        y: 100,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: 'power3.out'
    });

    // Animación de las feature tags
    gsap.from('.feature-tag', {
        scrollTrigger: {
            trigger: '.hero-features',
            start: 'top 80%'
        },
        scale: 0,
        opacity: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: 'back.out(1.7)'
    });

    // Animación de las tarjetas de categorías
    gsap.utils.toArray('.categorias').forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                end: 'top 60%',
                toggleActions: 'play none none reverse'
            },
            y: 100,
            opacity: 0,
            duration: 0.8,
            delay: index * 0.1,
            ease: 'power2.out'
        });
    });

    // Animación de las tarjetas de estadísticas
    gsap.from('.stat-card', {
        scrollTrigger: {
            trigger: '.stats-grid',
            start: 'top 80%'
        },
        y: 80,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power3.out'
    });

    // Parallax en el hero
    gsap.to('.videoperrito', {
        scrollTrigger: {
            trigger: '.section1',
            start: 'top top',
            end: 'bottom top',
            scrub: 1
        },
        scale: 1.2,
        opacity: 0.2
    });

    // Parallax en las formas flotantes
    gsap.to('.shape-1', {
        scrollTrigger: {
            trigger: '.section1',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        },
        y: 200,
        rotation: 360
    });

    gsap.to('.shape-2', {
        scrollTrigger: {
            trigger: '.section1',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        },
        y: -150,
        rotation: -180
    });

    // Animación del teléfono en CTA
    gsap.from('.celu', {
        scrollTrigger: {
            trigger: '.section3',
            start: 'top 70%'
        },
        x: -100,
        opacity: 0,
        rotation: -10,
        duration: 1.2,
        ease: 'power3.out'
    });

    // Animación de los beneficios en CTA
    gsap.from('.benefit-item', {
        scrollTrigger: {
            trigger: '.cta-benefits',
            start: 'top 80%'
        },
        x: -50,
        opacity: 0,
        stagger: 0.15,
        duration: 0.6,
        ease: 'power2.out'
    });

    // Animación de trust indicators
    gsap.from('.trust-item', {
        scrollTrigger: {
            trigger: '.trust-indicators',
            start: 'top 85%'
        },
        scale: 0,
        opacity: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: 'back.out(1.7)'
    });

    // Animación del footer
    gsap.from('.footer-brand, .footer-links, .footer-download', {
        scrollTrigger: {
            trigger: 'footer',
            start: 'top 90%'
        },
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power2.out'
    });
}

// ===================================
// BOTÓN BACK TO TOP
// ===================================
const backToTopButton = document.getElementById('backToTop');

if (backToTopButton) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===================================
// EFECTO DE MOUSE EN CATEGORÍAS
// ===================================
const categorias = document.querySelectorAll('.categorias');

categorias.forEach(categoria => {
    categoria.addEventListener('mousemove', (e) => {
        const rect = categoria.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        const img = categoria.querySelector('img');
        if (img) {
            img.style.transform = `scale(1.2) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        }
    });
    
    categoria.addEventListener('mouseleave', () => {
        const img = categoria.querySelector('img');
        if (img) {
            img.style.transform = 'scale(1) rotateX(0) rotateY(0)';
        }
    });
});

// ===================================
// CURSOR PERSONALIZADO (OPCIONAL)
// ===================================
const createCursor = () => {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        width: 20px;
        height: 20px;
        border: 2px solid var(--primary-orange);
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 10000;
        transition: transform 0.2s;
        display: none;
    `;
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
        cursor.style.display = 'block';
    });
    
    document.addEventListener('mousedown', () => {
        cursor.style.transform = 'scale(0.8)';
    });
    
    document.addEventListener('mouseup', () => {
        cursor.style.transform = 'scale(1)';
    });
    
    // Cambiar cursor en elementos interactivos
    const interactiveElements = document.querySelectorAll('a, button, .categorias');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
            cursor.style.backgroundColor = 'rgba(238, 154, 18, 0.2)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.backgroundColor = 'transparent';
        });
    });
};

// Activar cursor personalizado solo en desktop
if (window.innerWidth > 1024) {
    // createCursor(); // Descomenta esta línea si quieres activar el cursor personalizado
}

// ===================================
// LAZY LOADING DE IMÁGENES
// ===================================
const lazyImages = document.querySelectorAll('img[data-src]');

const lazyLoadObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            lazyLoadObserver.unobserve(img);
        }
    });
});

lazyImages.forEach(img => {
    lazyLoadObserver.observe(img);
});

// ===================================
// PERFORMANCE: REDUCIR ANIMACIONES EN MÓVIL
// ===================================
if (window.innerWidth < 768) {
    document.body.classList.add('mobile');
}

// ===================================
// CONSOLE LOG DE BIENVENIDA
// ===================================
console.log('%c🐾 Pet it - Hecho con ❤️ para nuestros amigos peludos', 
    'font-size: 20px; font-weight: bold; color: #ee9a12;');
console.log('%cDesarrollado con: HTML5, CSS3, JavaScript, GSAP', 
    'font-size: 12px; color: #7f8c8d;');
