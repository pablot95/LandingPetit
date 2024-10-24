/*const scroll = new LocomotiveScroll({
    el: document.querySelector('*'),
    smooth: true,
    inertia: 0.5
});*/

const animatedElements = document.querySelectorAll('.animate__animated');


const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            
            entry.target.classList.add('animate__fadeInUp');
            observer.unobserve(entry.target); 
        }
    });
}, { threshold: 0.000001 });


animatedElements.forEach(element => {
    observer.observe(element);
});






const counters = document.querySelectorAll('.counter');

const countUp = (element) => {
    const target = +element.getAttribute('data-target'); // Obtiene el valor objetivo
    let count = 0; // Comienza desde 0
    const speed = Math.floor(target / 60); // Velocidad de incremento (ajusta según necesites)

    const interval = setInterval(() => {
        count += speed; // Incrementa el contador

        // Asegúrate de que no sobrepase el objetivo
        if (count >= target) {
            count = target;
            clearInterval(interval); // Detiene el contador
        }
        
        element.textContent = `+${count}`; // Actualiza el contenido del elemento
    }, 50); // Intervalo de actualización
};

// Función para manejar la aparición del contador en pantalla
const observer2 = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            countUp(entry.target); // Inicia el contador
            observer2.unobserve(entry.target); // Deja de observar el elemento
        }
    });
});

// Observa todos los elementos con la clase 'counter'
counters.forEach(counter => {
    observer2.observe(counter); // Empieza a observar el contador
});