document.addEventListener('DOMContentLoaded', () => {
    const heroImage = document.querySelector('.hero-image');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;

        // Progress 0 at top, 1 when you've scrolled one full screen
        let progress = scrollY / windowHeight;
        if (progress > 1) progress = 1;
        if (progress < 0) progress = 0;

        // Zoom: from 4 down to 1
        const scaleValue = 4 - (progress * 3);
        
        // Position: from 50% down to 0% (moving it up into view)
        const translateYValue = 50 - (progress * 50);

        heroImage.style.transform = `scale(${scaleValue}) translateY(${translateYValue}%)`;
    });

    // Logo & Menu logic
    const menuToggle = document.querySelector('.menu-toggle');
    menuToggle.addEventListener('click', () => menuToggle.classList.toggle('active'));
});
