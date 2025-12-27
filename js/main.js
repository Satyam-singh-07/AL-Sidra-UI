document.addEventListener("DOMContentLoaded", function () {
    loadLayout();
    highlightCurrentPage();
});

function loadLayout() {
    const sidebarHTML = `
    <div class="sidebar-heading">
        <img src="assets/logo.jpeg" alt="Logo" class="logo-img">
        AL SIDRA
    </div>
    <div class="sidebar-content">
        <div class="list-group list-group-flush">
            <a href="index.html" class="list-group-item list-group-item-action">
                <i class="fas fa-tachometer-alt"></i> Dashboard
            </a>
            <a href="quran.html" class="list-group-item list-group-item-action">
                <i class="fas fa-book-open"></i> Quran PDF
            </a>
            <a href="namaz.html" class="list-group-item list-group-item-action">
                <i class="fas fa-praying-hands"></i> Namaz Content
            </a>
            <a href="masjid.html" class="list-group-item list-group-item-action">
                <i class="fas fa-mosque"></i> Masjid Listing
            </a>
            <a href="imams.html" class="list-group-item list-group-item-action">
                <i class="fas fa-user-check"></i> Imam Approvals
            </a>
            <a href="member-categories.html" class="list-group-item list-group-item-action">
                <i class="fas fa-users-cog"></i> Member Categories
            </a>
            <a href="communities.html" class="list-group-item list-group-item-action">
                <i class="fas fa-sitemap"></i> Communities
            </a>
            <a href="users.html" class="list-group-item list-group-item-action">
                <i class="fas fa-users"></i> Users
            </a>
            <a href="hot-topics.html" class="list-group-item list-group-item-action">
                <i class="fas fa-fire"></i> Hot Topics
            </a>
            <a href="ongoing-work.html" class="list-group-item list-group-item-action">
                <i class="fas fa-hard-hat"></i> Ongoing Work
            </a>
            <a href="banners.html" class="list-group-item list-group-item-action">
                <i class="fas fa-image"></i> Banners
            </a>
            <a href="videos.html" class="list-group-item list-group-item-action">
                <i class="fas fa-video"></i> Video Management
            </a>
            <a href="religion-info.html" class="list-group-item list-group-item-action">
                <i class="fas fa-info-circle"></i> Religion Info
            </a>
            <!-- Additional menu items if needed -->
            <a href="#" class="list-group-item list-group-item-action">
                <i class="fas fa-cog"></i> Settings
            </a>
            <a href="#" class="list-group-item list-group-item-action">
                <i class="fas fa-question-circle"></i> Help & Support
            </a>
            <a href="#" class="list-group-item list-group-item-action">
                <i class="fas fa-bell"></i> Notifications
            </a>
        </div>
    </div>
`;

    const headerHTML = `
        <nav class="navbar navbar-expand-lg navbar-custom px-3">
            <button class="btn btn-outline-success" id="menu-toggle">
                <i class="fas fa-bars"></i>
            </button>
            <div class="ms-auto d-flex align-items-center">
                <div class="dropdown">
                    <a href="#" class="d-flex align-items-center text-decoration-none text-dark dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                        <div class="bg-success text-white rounded-circle d-flex justify-content-center align-items-center me-2" style="width: 35px; height: 35px;">A</div>
                        <strong>Admin</strong>
                    </a>
                    <ul class="dropdown-menu dropdown-menu-end text-small shadow" aria-labelledby="dropdownUser1">
                        <li><a class="dropdown-item" href="#">Settings</a></li>
                        <li><a class="dropdown-item" href="#">Profile</a></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item text-danger" href="#">Sign out</a></li>
                    </ul>
                </div>
            </div>
        </nav>
    `;

    const footerHTML = `
        <div class="container-fluid">
            <p class="mb-0">&copy; 2025 Vision X Digital Pvt. Ltd. | Al Sidra Admin Panel</p>
        </div>
    `;

    document.getElementById("sidebar-wrapper").innerHTML = sidebarHTML;
    document.getElementById("header-container").innerHTML = headerHTML;
    document.getElementById("footer-container").innerHTML = footerHTML;

    const toggleBtn = document.getElementById("menu-toggle");
    if(toggleBtn){
        toggleBtn.addEventListener('click', function(e) {
            e.preventDefault();
            document.body.classList.toggle("toggled");
        });
    }
}

function highlightCurrentPage() {
    const currentPage = window.location.pathname.split("/").pop();
    const links = document.querySelectorAll('.list-group-item');
    links.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}