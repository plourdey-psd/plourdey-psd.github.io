
const params = new URLSearchParams(window.location.search);
const projectId = params.get("id");

const project = projects.find((item) => item.id === projectId);

if (project) {
    document.title = project.title;

    document.getElementById("project-title").textContent =
        project.title;

    document.getElementById("project-category").textContent =
        project.category;

    document.getElementById("project-description").textContent =
        project.description;

    const gallery = document.getElementById("project-gallery");

    // If the project has titled sections, display those
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

                grid.appendChild(image);
            });

            gallery.appendChild(grid);
        });
    } else {
        // Existing projects without sections work as before
        project.images.forEach((src, index) => {
            const image = document.createElement("img");

            image.src = src;
            image.alt = `${project.title} — Image ${index + 1}`;
            image.loading = "lazy";

            gallery.appendChild(image);
        });
    }

} else {
    document.getElementById("project-title").textContent =
        "Project not found";

    document.getElementById("project-description").textContent =
        "This project could not be found.";

    document.getElementById("project-gallery").remove();
}
