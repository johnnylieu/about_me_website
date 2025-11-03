document.addEventListener("DOMContentLoaded", () => {
    // 1. Fade in the page
    const container = document.querySelector(".fade-transition");
    if (container) {
        // Trigger the fade in by adding the "loaded" class
        requestAnimationFrame(() => {
            container.classList.add("loaded");
        });
    }

    // 2. Intercept link clicks to fade out before navigation
    document.querySelectorAll("a").forEach((link) => {
        // Make sure we only fade out for internal links
        if (link.hostname === window.location.hostname) {
            link.addEventListener("click", (e) => {
                e.preventDefault();
                const targetUrl = link.href;

                // Add a fade-out class
                if (container) {
                    container.classList.remove("loaded");
                    container.classList.add("fade-out");
                }

                // Wait for the fade-out animation to finish, then navigate
                setTimeout(() => {
                    window.location.href = targetUrl;
                }, 500); // matches the 0.5s transition in CSS
            });
        }
    });
});
