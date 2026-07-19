/* Lottie animation loader */
document.addEventListener('DOMContentLoaded', () => {
    // Check if lottie player library is loaded
    if (typeof lottie === 'undefined') {
        console.error('Lottie library not found. Animations could not be loaded.');
        return;
    }

    // 1. Hero Animation - Developer at Computer
    const heroContainer = document.getElementById('hero-lottie');
    if (heroContainer) {
        lottie.loadAnimation({
            container: heroContainer,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: 'https://assets5.lottiefiles.com/packages/lf20_ygiu5cty.json' // Stable developer animation
        });
    }

    // 2. Skills Animation - Tech Stack / Design
    const skillsContainer = document.getElementById('skills-lottie');
    if (skillsContainer) {
        lottie.loadAnimation({
            container: skillsContainer,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: 'https://assets5.lottiefiles.com/packages/lf20_qpwb7t.json' // Stable tech workflow animation
        });
    }

    // 3. Contact Animation - Mailbox / Message
    const contactContainer = document.getElementById('contact-lottie');
    if (contactContainer) {
        lottie.loadAnimation({
            container: contactContainer,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: 'https://assets3.lottiefiles.com/packages/lf20_u25cckyh.json' // Stable email/contact animation
        });
    }
});
