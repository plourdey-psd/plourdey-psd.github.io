const params = new URLSearchParams(window.location.search);
const category = params.get("category");

const gallery = galleryData[category];

const title = document.getElementById("gallery-title");
const subsectionNav = document.getElementById("gallery-subsections");
const galleryContent = document.getElementById("gallery-content");

const overlay = document.getElementById("image-overlay");
const overlayImage = document.getElementById("overlay-image");
const closeOverlay = document.getElementById("close-overlay");

if (!gallery) {
    title.textContent = "Gallery not found";
} else {
    document.title = gallery.title;
    title.textContent = gallery.title;

    gallery.sections.forEach((section) => {
        // Create subsection navigation link
        const link = document.createElement("a");

        link.href = `#${section.id}`;
        link.textContent = section.title;
        link.className = "gallery-section-link";

        subsectionNav.appendChild(link);

        // Create subsection container
        const sectionElement = document.createElement("section");
        sectionElement.className = "gallery-section";
        sectionElement.id = section.id;

        const heading = document.createElement("h2");
        heading.textContent = section.title;

        const description = document.createElement("p");
        description.className = "gallery-description";
        description.textContent = section.description || "";

        const grid = document.createElement("div");
        grid.className = "gallery-grid";

        section.images.forEach((src, index) => {
            const image = document.createElement("img");

            image.src = src;
            image.alt = `${section.title} — Image ${index + 1}`;
            image.loading = "lazy";

            image.addEventListener("click", () => {
                overlayImage.src = src;
                overlayImage.alt = image.alt;
                overlay.classList.add("active");
            });

            grid.appendChild(image);
        });

        sectionElement.append(heading, description, grid);
        galleryContent.appendChild(sectionElement);
    });
}

// Close the image preview
function closeImagePreview() {
    overlay.classList.remove("active");
    overlayImage.src = "";
}

closeOverlay.addEventListener("click", closeImagePreview);

overlay.addEventListener("click", (event) => {
    if (event.target === overlay) {
        closeImagePreview();
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeImagePreview();
    }
});
