/* Scroll reveal animations and mobile nav toggle */
document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile navigation menu toggle
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-item');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
        
        // Close menu when clicking links
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }
    
    // 2. Intersection Observer for Scroll Reveals
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // If it's a progress bar container, animate the progress fills inside it
                const progressFills = entry.target.querySelectorAll('.skill-bar-fill');
                progressFills.forEach(fill => {
                    const width = fill.getAttribute('data-width');
                    if (width) {
                        fill.style.width = width;
                    }
                });
                
                // Once animated, we can unobserve if we want it to animate only once
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px' // Trigger slightly before the item enters full view
    });
    
    revealElements.forEach(el => {
        revealObserver.observe(el);
    });
});
