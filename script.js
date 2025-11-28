document.addEventListener('DOMContentLoaded', () => {
    // Age Verification Modal Logic
    const modal = document.getElementById('age-modal');
    const btnYes = document.getElementById('btn-yes');
    const btnNo = document.getElementById('btn-no');
    const mainContent = document.getElementById('main-content');
    const body = document.body;

    // Check if user has already verified (optional, but good UX - removed per strict prompt "on load")
    // For strict compliance with prompt "A full-screen modal popup on load", we show it every time.
    // However, to prevent annoyance during development/testing, I'll leave it always showing on refresh.
    
    // Show modal
    modal.style.display = 'flex';
    mainContent.classList.add('blur-background');
    body.style.overflow = 'hidden'; // Prevent scrolling

    btnYes.addEventListener('click', () => {
        modal.style.display = 'none';
        mainContent.classList.remove('blur-background');
        body.style.overflow = 'auto'; // Restore scrolling
    });

    btnNo.addEventListener('click', () => {
        window.location.href = "https://www.google.com";
    });

    // Mobile Menu Logic
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links li a').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    }));

    // Smooth Scrolling for Anchor Links (Polyfill-like behavior if CSS smooth-scroll fails)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                // Offset for fixed header
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // Scroll Animations (Intersection Observer)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
});
