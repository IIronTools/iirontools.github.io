document.addEventListener('DOMContentLoaded', function() {
    // Loader
    const loader = document.querySelector('.loader');
    
    // Ukryj loader po załadowaniu strony
    window.addEventListener('load', function() {
        loader.classList.add('loader-hidden');
        
        // Usuń loader z DOM po zakończeniu animacji
        loader.addEventListener('transitionend', function() {
            document.body.removeChild(loader);
        });
    });
    
    // Aktualizuj rok w stopce
    document.getElementById('year').textContent = new Date().getFullYear();
    
    // Nawigacja mobilna
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Zamknij menu po kliknięciu na link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            
            // Aktualizuj aktywny link
            document.querySelectorAll('.nav-link').forEach(item => {
                item.classList.remove('active');
            });
            this.classList.add('active');
        });
    });
    
    // Zmiana tła nagłówka przy scrollowaniu
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Przycisk powrotu do góry
    const backToTopBtn = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });
    
    backToTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Filtrowanie projektów
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Usuń aktywną klasę ze wszystkich przycisków
            filterBtns.forEach(item => {
                item.classList.remove('active');
            });
            
            // Dodaj aktywną klasę do klikniętego przycisku
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            projectItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // Formularz kontaktowy
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            
            // Walidacja pól formularza
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const subject = document.getElementById('subject');
            const message = document.getElementById('message');
            
            // Resetuj komunikaty błędów
            document.querySelectorAll('.form-group').forEach(group => {
                group.classList.remove('error');
            });
            
            // Walidacja imienia i nazwiska
            if (name.value.trim() === '') {
                name.parentElement.classList.add('error');
                isValid = false;
            }
            
            // Walidacja emaila
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.value.trim())) {
                email.parentElement.classList.add('error');
                isValid = false;
            }
            
            // Walidacja tematu
            if (subject.value.trim() === '') {
                subject.parentElement.classList.add('error');
                isValid = false;
            }
            
            // Walidacja wiadomości
            if (message.value.trim() === '') {
                message.parentElement.classList.add('error');
                isValid = false;
            }
            
            // Jeśli formularz jest poprawny, wyślij
            if (isValid) {
                // Tutaj można dodać kod do wysłania formularza (np. fetch)
                // Dla demonstracji pokażemy komunikat sukcesu
                contactForm.style.display = 'none';
                formSuccess.style.display = 'block';
                
                // Resetuj formularz po 5 sekundach
                setTimeout(() => {
                    contactForm.reset();
                    contactForm.style.display = 'block';
                    formSuccess.style.display = 'none';
                }, 5000);
            }
        });
    }
    
    // Animacje przy przewijaniu
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.about-content, .skills-content, .project-item, .contact-content');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Ustaw początkowe style dla animowanych elementów
    document.querySelectorAll('.about-content, .skills-content, .project-item, .contact-content').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Wywołaj animacje przy ładowaniu strony i przewijaniu
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
    
    // Smooth scroll dla linków
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Ustaw aktywny link w nawigacji na podstawie sekcji
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
});