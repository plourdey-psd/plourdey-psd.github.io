
const params = new URLSearchParams(window.location.search);
const projectId = params.get("id");

const project = projects.find((item) => item.id === projectId);

const gallery = document.getElementById("project-gallery");

// Create the image overlay automatically
const overlay = document.createElement("div");
overlay.className = "image-overlay";

const closeButton = document.createElement("button");
closeButton.className = "close-overlay";
closeButton.textContent = "×";
closeButton.setAttribute("aria-label", "Close image");

const overlayImage = document.createElement("img");
overlayImage.alt = "";

overlay.appendChild(closeButton);
overlay.appendChild(overlayImage);
document.body.appendChild(overlay);

// Open an image when clicked
function addImageViewer(image) {
    image.style.cursor = "pointer";

    image.addEventListener("click", () => {
        overlayImage.src = image.src;
        overlayImage.alt = image.alt;
        overlay.classList.add("active");
    });
}

// Close using the X
closeButton.addEventListener("click", () => {
    overlay.classList.remove("active");
});

// Close by clicking the dark background
overlay.addEventListener("click", (event) => {
    if (event.target === overlay) {
        overlay.classList.remove("active");
    }
});

// Close with Escape
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        overlay.classList.remove("active");
    }
});

if (project) {
    document.title = project.title;

    document.getElementById("project-title").textContent =
        project.title;

    document.getElementById("project-category").textContent =
        project.category;

    document.getElementById("project-description").textContent =
        project.description;

    // Projects with titled sections
    if (project.sections) {
        project.sections.forEach((section) => {
            const heading = document.createElement("h2");
            heading.className = "project-section-title";
            heading.textContent = section.title;

            gallery.appendChild(heading);

            const grid = document.createElement("div");
            grid.className = "project-gallery-grid";

            section.images.forEach((src, index) => {
                const image = document.createElement("img");

                image.src = src;
                image.alt = `${section.title} — Image ${index + 1}`;
                image.loading = "lazy";

                addImageViewer(image);
                grid.appendChild(image);
            });

            gallery.appendChild(grid);
        });
    } else {
        // Projects without sections
        project.images.forEach((src, index) => {
            const image = document.createElement("img");

            image.src = src;
            image.alt = `${project.title} — Image ${index + 1}`;
            image.loading = "lazy";

            addImageViewer(image);
            gallery.appendChild(image);
        });
    }
} else {
    document.getElementById("project-title").textContent =
        "Project not found";

    document.getElementById("project-description").textContent =
        "This project could not be found.";

    gallery.remove();
    overlay.remove();
}
