document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Hamburger Menu Toggle Logic
    const menuToggle = document.querySelector('.menu-toggle');
    
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        // You can add logic here to show/hide a menu overlay later
    });

    // 2. Scroll-Based Hero Zoom Logic
    const heroImage = document.querySelector('.hero-image');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;

        // Progress goes from 0 to 1 over the course of the first 100vh
        let progress = scrollY / windowHeight;
        
        // Cap progress at 1 so it doesn't shrink smaller than its original size
        if (progress > 1) progress = 1;
        if (progress < 0) progress = 0;

        // Calculation: Start at 4, subtract 3 (multiplied by progress) to reach 1.
        const scaleValue = 4 - (progress * 3);
        
        heroImage.style.transform = `scale(${scaleValue})`;
    });

});
