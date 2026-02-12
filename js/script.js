document.addEventListener('DOMContentLoaded', () => {
    
    const heroImage = document.querySelector('.hero-image');
    const pinContainer = document.querySelector('.pin-container');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        // Total scrollable distance of the pinned section
        const maxScroll = pinContainer.offsetHeight - window.innerHeight;
        
        // Calculate progress (0 to 1)
        let progress = scrollY / maxScroll;
        
        // Ensure it stops at 1 (100% finished)
        if (progress > 1) progress = 1;
        if (progress < 0) progress = 0;

        // Apply transformations
        // Zoom: 4 -> 1
        const scaleVal = 4 - (progress * 3);
        // Position: 50% -> 0%
        const yVal = 50 - (progress * 50);

        heroImage.style.transform = `scale(${scaleVal}) translateY(${yVal}%)`;
    });

    // Simple Hamburger Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    menuToggle.addEventListener('click', () => menuToggle.classList.toggle('active'));
});
