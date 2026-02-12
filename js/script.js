document.addEventListener('DOMContentLoaded', () => {
    
    const heroImage = document.querySelector('.hero-image');
    const menuToggle = document.querySelector('.menu-toggle');

    // 1. Hamburger Interaction
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
    });

    // 2. Scroll Animation Logic
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;

        // Progress turns into a decimal from 0 to 1 as you scroll the first 100vh
        let progress = scrollY / windowHeight;
        
        // Lock boundaries
        if (progress > 1) progress = 1;
        if (progress < 0) progress = 0;

        /**
         * MATH BREAKDOWN:
         * Scale: Start at 4. At progress 1, we want it to be 1. (4 - (1 * 3) = 1)
         * Translate: Start at 50%. At progress 1, we want it at 0%. (50 - (1 * 50) = 0)
         */
        const scaleVal = 4 - (progress * 3);
        const yVal = 50 - (progress * 50);

        heroImage.style.transform = `scale(${scaleVal}) translateY(${yVal}%)`;
    });
});
