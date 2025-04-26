// main.js
document.addEventListener('DOMContentLoaded', function() {
    // Menú móvil
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const nav = document.querySelector('nav');
    
    mobileMenuBtn.addEventListener('click', function() {
        nav.classList.toggle('active');
        this.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });
    
    // Cerrar menú al hacer clic en un enlace
    document.querySelectorAll('nav ul li a').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });
    
    // Animaciones al hacer scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        const windowHeight = window.innerHeight;
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementPosition < windowHeight - elementVisible) {
                element.classList.add('animated');
            }
        });
    };
    
    // Efecto sticky para el header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.sticky-header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        animateOnScroll();
    });
    
    // Inicializar animaciones
    animateOnScroll();
});
// Manejo mejorado del formulario de contacto
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const submitBtn = form.querySelector('button[type="submit"]');
    const submitText = form.querySelector('.submit-text');
    const loadingIcon = form.querySelector('.loading-icon');
    
    // Validación en tiempo real
    form.querySelectorAll('input, textarea, select').forEach(input => {
        input.addEventListener('input', function() {
            validateField(this);
        });
        
        input.addEventListener('blur', function() {
            validateField(this);
        });
    });
    
    // Envío del formulario
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Validar todos los campos antes de enviar
        let isValid = true;
        form.querySelectorAll('[required]').forEach(field => {
            if (!validateField(field)) {
                isValid = false;
            }
        });
        
        if (!isValid) return;
        
        // Mostrar estado de carga
        submitBtn.disabled = true;
        submitText.textContent = 'Enviando...';
        loadingIcon.style.display = 'inline-block';
        
        try {
            const formData = new FormData(form);
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                // Mostrar mensaje de éxito
                showFormMessage('success', '¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.');
                form.reset();
            } else {
                throw new Error('Error en el envío');
            }
        } catch (error) {
            console.error('Error:', error);
            showFormMessage('error', 'Hubo un error al enviar el mensaje. Por favor intente nuevamente.');
        } finally {
            // Restaurar estado normal
            submitBtn.disabled = false;
            submitText.textContent = 'Enviar mensaje';
            loadingIcon.style.display = 'none';
        }
    });
    
    // Función para validar campos individuales
    function validateField(field) {
        const errorMsg = field.closest('.form-group').querySelector('.error-message');
        
        if (field.validity.valid) {
            errorMsg.style.display = 'none';
            return true;
        } else {
            if (field.value.trim() === '') {
                errorMsg.textContent = 'Este campo es requerido';
            } else if (field.type === 'email' && !field.validity.valid) {
                errorMsg.textContent = 'Por favor ingrese un email válido';
            } else if (field.type === 'tel' && !field.validity.valid) {
                errorMsg.textContent = 'Formato de teléfono inválido';
            }
            
            errorMsg.style.display = 'block';
            return false;
        }
    }
    
    // Función para mostrar mensajes de estado
    function showFormMessage(type, message) {
        // Eliminar mensajes anteriores
        const oldMsg = document.querySelector('.form-message');
        if (oldMsg) oldMsg.remove();
        
        // Crear nuevo mensaje
        const msg = document.createElement('div');
        msg.className = `form-message ${type}`;
        msg.innerHTML = `
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <p>${message}</p>
        `;
        
        // Insertar antes del formulario
        form.parentNode.insertBefore(msg, form);
        
        // Eliminar después de 5 segundos
        setTimeout(() => {
            msg.style.opacity = '0';
            setTimeout(() => msg.remove(), 300);
        }, 5000);
    }
});
document.addEventListener('DOMContentLoaded', function() {
    // Menú móvil
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const nav = document.querySelector('nav');
    
    mobileMenuBtn.addEventListener('click', function() {
        nav.classList.toggle('active');
        this.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });
    
    // Cerrar menú al hacer clic en un enlace
    document.querySelectorAll('nav ul li a').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });
    
    // Efecto sticky para el header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Animaciones al hacer scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.partner-card, .page-hero h1, .page-hero p');
        const windowHeight = window.innerHeight;
        
        elements.forEach((element, index) => {
            const elementPosition = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementPosition < windowHeight - elementVisible) {
                // Añadir delay progresivo para las tarjetas
                if (element.classList.contains('partner-card')) {
                    element.style.transitionDelay = `${index * 0.1}s`;
                }
                element.classList.add('animated');
            }
        });
    };
    
    // Inicializar animaciones
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
    
    // Efecto hover para las tarjetas de aliados
    document.querySelectorAll('.partner-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
            card.querySelector('.partner-logo img').style.transform = 'scale(1.05)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.querySelector('.partner-logo img').style.transform = 'scale(1)';
        });
    });
});
document.addEventListener('DOMContentLoaded', function() {
    // Marcar elemento activo en el menú
    const currentPage = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('nav ul li a').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    // Animaciones mejoradas
    const animateElements = function() {
        const elements = document.querySelectorAll('.partner-card, .page-hero h1, .page-hero p');
        const windowHeight = window.innerHeight;
        
        elements.forEach((element, index) => {
            const elementPosition = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementPosition < windowHeight - elementVisible) {
                setTimeout(() => {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    };

    // Inicializar animaciones
    animateElements();
    window.addEventListener('scroll', animateElements);

    // Efectos hover mejorados
    document.querySelectorAll('.partner-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
            card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.1)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.05)';
        });
    });
});
document.addEventListener('DOMContentLoaded', function() {
    // Menú móvil
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const nav = document.querySelector('nav');
    
    mobileMenuBtn.addEventListener('click', function() {
        nav.classList.toggle('active');
        this.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });
    
    // Cerrar menú al hacer clic en un enlace
    document.querySelectorAll('nav ul li a').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });
    
    // Marcar elemento activo en el menú
    const currentPage = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('nav ul li a').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
    
    // Animaciones al hacer scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.animate-on-scroll, .service-card, .service-full, .page-hero h1, .page-hero p');
        const windowHeight = window.innerHeight;
        
        elements.forEach((element, index) => {
            const elementPosition = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementPosition < windowHeight - elementVisible) {
                // Añadir delay progresivo para las tarjetas
                if (element.classList.contains('service-card')) {
                    element.style.transitionDelay = `${index * 0.1}s`;
                }
                element.classList.add('animated');
            }
        });
    };
    
    // Efecto hover para las tarjetas de servicios
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
            card.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.1)';
        });
        
        card.addEventListener('mouseleave', () => {
            if (!card.classList.contains('hover-active')) {
                card.style.transform = 'translateY(0)';
                card.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.05)';
            }
        });
    });
    
    // Inicializar animaciones
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
    
    // Activar animación del hero al cargar
    setTimeout(() => {
        document.querySelector('.page-hero').classList.add('animated');
    }, 300);
});
