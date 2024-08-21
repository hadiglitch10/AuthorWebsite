document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const chapterLinks = document.querySelectorAll('.list-example a');
    const offset = 100; // Adjust the offset for your fixed header height if needed

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.getAttribute('id');

                // Update nav links
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${sectionId}`);
                });

                // Update chapter links
                chapterLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${sectionId}`);
                });
            }
        });
    }, { threshold: 0.5 }); // Adjust threshold as needed

    sections.forEach(section => {
        observer.observe(section);
    });

    window.addEventListener("scroll", () => {
        let current = "";

        sections.forEach((section) => {
            const sectionTop = section.offsetTop - offset;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute("id");
            }
        });

        chapterLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href").includes(current)) {
                link.classList.add("active");
            }
        });
    });
});
