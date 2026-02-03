const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

const revealItems = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

revealItems.forEach((item) => revealObserver.observe(item));

if (!prefersReducedMotion) {
  const parallaxItems = Array.from(document.querySelectorAll("[data-parallax]"));

  const updateParallax = () => {
    const viewHeight = window.innerHeight;
    parallaxItems.forEach((item) => {
      const speed = parseFloat(item.dataset.parallax) || 0.1;
      const rect = item.getBoundingClientRect();
      const offset = rect.top + rect.height / 2 - viewHeight / 2;
      const translate = offset * speed * -0.25;
      item.style.setProperty("--parallax", `${translate.toFixed(2)}px`);
    });
  };

  let ticking = false;
  const onScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateParallax();
        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", updateParallax);
  updateParallax();
}
