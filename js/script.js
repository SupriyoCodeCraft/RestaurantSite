// Mobile Menu Toggle
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

burger.addEventListener('click', () => {
    // Toggle Nav
    nav.classList.toggle('active');
    
    // Animate Links
    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });

    // Burger Animation
    burger.classList.toggle('toggle');
});

// Image Slider
const slider = document.querySelector('.slider');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const dots = document.querySelectorAll('.dot');
let slideIndex = 0;

if (slider) {
    const slides = document.querySelectorAll('.slide');
    const slideWidth = slides[0].clientWidth;
    
    function updateSlider() {
        slider.style.transform = `translateX(${-slideIndex * 100}%)`;
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === slideIndex);
        });
    }

    function nextSlide() {
        slideIndex = (slideIndex + 1) % slides.length;
        updateSlider();
    }

    function prevSlide() {
        slideIndex = (slideIndex - 1 + slides.length) % slides.length;
        updateSlider();
    }

    // Event Listeners for Slider
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            slideIndex = index;
            updateSlider();
        });
    });

    // Auto slide every 5 seconds
    setInterval(nextSlide, 5000);
}

// Form Validation
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;
        const errorMessages = form.querySelectorAll('.error-message');
        errorMessages.forEach(msg => msg.textContent = '');

        // Validate Name
        const nameInput = form.querySelector('[name="name"]');
        if (nameInput && !nameInput.value.trim()) {
            showError(nameInput, 'Name is required');
            isValid = false;
        }

        // Validate Email
        const emailInput = form.querySelector('[name="email"]');
        if (emailInput) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailInput.value.trim()) {
                showError(emailInput, 'Email is required');
                isValid = false;
            } else if (!emailRegex.test(emailInput.value)) {
                showError(emailInput, 'Please enter a valid email address');
                isValid = false;
            }
        }

        // Validate Date and Time (for reservation form)
        const dateInput = form.querySelector('[name="date"]');
        if (dateInput) {
            const today = new Date().toISOString().split('T')[0];
            if (!dateInput.value) {
                showError(dateInput, 'Date is required');
                isValid = false;
            } else if (dateInput.value < today) {
                showError(dateInput, 'Please select a future date');
                isValid = false;
            }
        }

        const timeInput = form.querySelector('[name="time"]');
        if (timeInput && !timeInput.value) {
            showError(timeInput, 'Time is required');
            isValid = false;
        }

        // Validate Guests (for reservation form)
        const guestsInput = form.querySelector('[name="guests"]');
        if (guestsInput && !guestsInput.value) {
            showError(guestsInput, 'Please select number of guests');
            isValid = false;
        }

        // Validate Subject (for contact form)
        const subjectInput = form.querySelector('[name="subject"]');
        if (subjectInput && !subjectInput.value.trim()) {
            showError(subjectInput, 'Subject is required');
            isValid = false;
        }

        // Validate Message (for contact form)
        const messageInput = form.querySelector('[name="message"]');
        if (messageInput && !messageInput.value.trim()) {
            showError(messageInput, 'Message is required');
            isValid = false;
        }

        if (isValid) {
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.textContent = formId === 'reservationForm' 
                ? 'Reservation submitted successfully! We will contact you shortly.'
                : 'Message sent successfully! We will get back to you soon.';
            
            form.insertBefore(successMessage, form.firstChild);
            form.reset();

            // Remove success message after 5 seconds
            setTimeout(() => {
                successMessage.remove();
            }, 5000);
        }
    });
}

function showError(input, message) {
    const errorElement = input.parentElement.querySelector('.error-message');
    if (errorElement) {
        errorElement.textContent = message;
    }
}

// Initialize form validation
validateForm('reservationForm');
validateForm('contactForm');

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
}); 