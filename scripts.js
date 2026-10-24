/*Header*/

fetch("./header.html")
    .then(response => {
        if (!response.ok) {
            throw new Error("Failed to load header.html");
        }

        return response.text();
    })
    .then(data => {
        document.body.insertAdjacentHTML("afterbegin", data);

        const socialsButton = document.querySelector(".socials-toggle");

        if (socialsButton) {
            socialsButton.addEventListener("click", () => {
                const socialsLinks = socialsButton.nextElementSibling;
                const isOpen = socialsLinks.classList.toggle("open");

                socialsButton.setAttribute("aria-expanded", isOpen);
            });
}

        const header = document.querySelector("header");
        const menuToggle = header.querySelector(".menu-toggle");
        const mobileMenu = header.querySelector(".mobile-menu");

        // Navbar scroll effect
        function updateHeader() {
            header.classList.toggle("scrolled", window.scrollY > 50);
        }

        window.addEventListener("scroll", updateHeader, {
            passive: true
        });

        updateHeader();

        // Mobile menu toggle
        if (menuToggle && mobileMenu) {
            menuToggle.addEventListener("click", event => {
                event.stopPropagation();

                const isOpen = mobileMenu.classList.toggle("active");

                menuToggle.textContent = isOpen ? "✕" : "☰";
                menuToggle.setAttribute("aria-expanded", String(isOpen));
                menuToggle.setAttribute(
                    "aria-label",
                    isOpen ? "Close navigation menu" : "Open navigation menu"
                );
            });

            // Close menu when a link is clicked
            mobileMenu.querySelectorAll("a").forEach(link => {
                link.addEventListener("click", () => {
                    mobileMenu.classList.remove("active");
                    menuToggle.textContent = "☰";
                    menuToggle.setAttribute("aria-expanded", "false");
                    menuToggle.setAttribute("aria-label", "Open navigation menu");
                });
            });

            // Close menu when clicking outside
            document.addEventListener("click", event => {
                if (!header.contains(event.target)) {
                    mobileMenu.classList.remove("active");
                    menuToggle.textContent = "☰";
                    menuToggle.setAttribute("aria-expanded", "false");
                    menuToggle.setAttribute("aria-label", "Open navigation menu");
                }
            });
        } else {
            console.error("Mobile menu button or menu not found in header.html");
        }
    })
    .catch(error => console.error("Navbar error:", error));


/*Footer*/

fetch("footer.html")
    .then(response => response.text())
    .then(data => {document.body.insertAdjacentHTML("beforeend", data)});

    
/* Enlarge a project image when clicked */

document.querySelectorAll(".carousel-track img").forEach((img) => {
    img.addEventListener("click", () => {
        const carousel = img.closest(".carousel");
        const track = carousel.querySelector(".carousel-track");

        // Pause this carousel
        track.style.animationPlayState = "paused";

        // Create image overlay
        const overlay = document.createElement("div");
        overlay.className = "image-overlay active";

        const largeImage = document.createElement("img");
        largeImage.src = img.src;
        largeImage.alt = img.alt;

        const closeButton = document.createElement("button");
        closeButton.className = "image-overlay-close";
        closeButton.textContent = "×";
        closeButton.setAttribute("aria-label", "Close enlarged image");

        overlay.append(closeButton, largeImage);
        document.body.appendChild(overlay);

        function closeOverlay() {
            overlay.remove();
            track.style.animationPlayState = "";
        }

        closeButton.addEventListener("click", closeOverlay);

        overlay.addEventListener("click", (event) => {
            if (event.target === overlay) {
                closeOverlay();
            }
        });

        document.addEventListener("keydown", function handleEscape(event) {
            if (event.key === "Escape") {
                closeOverlay();
                document.removeEventListener("keydown", handleEscape);
            }
        });
    });
});


const aboutSection = document.querySelector(".about-section");

if (aboutSection) {
    const aboutObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                aboutSection.classList.add("visible");
                aboutObserver.unobserve(aboutSection);
            }
        });
    }, {
        threshold: 0.2
    });

    aboutObserver.observe(aboutSection);
}
