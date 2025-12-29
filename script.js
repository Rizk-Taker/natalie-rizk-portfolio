// Project data - maps folder names to their images
const projects = {
    'dearborn': [
        'Rizk_Chinman_Night_Scene.png',
        'Rizk_Chinman_Isometric.gif',
        'Rizk_Chinman_Interior.png',
        'Rizk_Chinman_Roof_Garden.png',
        'Rizk_Chinman_Section.png',
        'Ground plan.png',
        'Axon.jpg',
        'roofplan.png',
        'Rizk_Chinman_Plan_Ground.gif',
        'Rizk_Chinman_Plan_Roof.gif'
    ],
    'geiod': [
        'DRAWING FINAL-01.png',
        'DRAWING FINAL-07.png',
        'DRAWING FINAL-08.png',
        'DRAWING FINAL-09.png',
        'DRAWING FINAL-10.png',
        'DRAWING FINAL-13.png',
        'DRAWING FINAL-14.png',
        'DRAWING FINAL-15.png',
        'DRAWING FINAL-16.png',
        '5 (1).jpeg'
    ],
    'Re-Tidal': [
        'Exterior_Cam 1.png',
        'Exterior_Cam18 rida.png',
        'Interior_cam5.png',
        'Interior_cam6.png',
        'Exploded Iso Final White background-01.png',
        'Site Plan Final.png',
        'Final Plan Drawings-paths-01.png',
        'Inflatables and patterning FINALv2.png',
        'Inflatable Clustering Diagram FINAL.png',
        'Rockpool Colors and Texture fixed.png',
        'Solo render1.png',
        'Arduino hookup.png',
        'DSC02159.png',
        'DSC02163.png',
        'DSC02170.png'
    ]
};

// DOM Elements
const projectsList = document.getElementById('projects-list');
const projectPage = document.getElementById('project-page');
const heroImage = projectPage.querySelector('.hero-image');
const projectTitle = projectPage.querySelector('.project-title');
const projectNavTitle = projectPage.querySelector('.project-nav-title');
const projectGallery = projectPage.querySelector('.project-gallery');
const backBtn = projectPage.querySelector('.back-btn');
const mainHeader = document.querySelector('.main-header');

// Initialize projects list
function initProjects() {
    Object.keys(projects).forEach(projectName => {
        const images = projects[projectName];
        const thumbnailImage = images[0];

        const item = document.createElement('article');
        item.className = 'project-item';
        item.setAttribute('data-project', projectName);

        item.innerHTML = `
            <div class="project-item-image-wrapper">
                <img
                    class="project-item-image"
                    src="projects/${projectName}/${thumbnailImage}"
                    alt="${formatProjectName(projectName)}"
                    loading="lazy"
                >
                <div class="project-item-overlay">
                    <h2 class="project-item-title">${formatProjectName(projectName)}</h2>
                </div>
            </div>
        `;

        item.addEventListener('click', () => openProject(projectName));
        projectsList.appendChild(item);
    });
}

// Format project name for display
function formatProjectName(name) {
    return name.replace(/-/g, ' ').replace(/_/g, ' ');
}

// Open project page
function openProject(projectName) {
    const images = projects[projectName];
    const formattedName = formatProjectName(projectName);

    // Set hero image
    heroImage.src = `projects/${projectName}/${images[0]}`;
    heroImage.alt = formattedName;

    // Set titles
    projectTitle.textContent = formattedName;
    projectNavTitle.textContent = formattedName;

    // Build gallery (skip first image as it's the hero)
    projectGallery.innerHTML = '';
    images.slice(1).forEach(imageName => {
        const img = document.createElement('img');
        img.src = `projects/${projectName}/${imageName}`;
        img.alt = `${formattedName} - ${imageName}`;
        img.loading = 'lazy';
        projectGallery.appendChild(img);
    });

    // Show project page and hide main sidebar
    projectPage.classList.add('active');
    document.body.style.overflow = 'hidden';
    if (mainHeader) mainHeader.style.display = 'none';

    // Scroll to top of project page
    projectPage.scrollTop = 0;

    // Update URL
    history.pushState({ project: projectName }, '', `#${projectName}`);
}

// Close project page
function closeProject() {
    projectPage.classList.remove('active');
    document.body.style.overflow = '';
    if (mainHeader) mainHeader.style.display = '';
    history.pushState({}, '', window.location.pathname);
}

// Event listeners
backBtn.addEventListener('click', closeProject);

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectPage.classList.contains('active')) {
        closeProject();
    }
});

// Handle browser back/forward
window.addEventListener('popstate', (e) => {
    if (e.state && e.state.project) {
        openProject(e.state.project);
    } else {
        projectPage.classList.remove('active');
        document.body.style.overflow = '';
        if (mainHeader) mainHeader.style.display = '';
    }
});

// Check URL on load
function checkUrlForProject() {
    const hash = window.location.hash.slice(1);
    if (hash && projects[hash]) {
        openProject(hash);
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initProjects();
    checkUrlForProject();
});
