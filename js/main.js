document.addEventListener("DOMContentLoaded", function () {
    loadLayout();
    highlightCurrentPage();
});

function loadLayout() {
    // 1. Define the Sidebar HTML
    const sidebarHTML = `
        <div class="sidebar-heading">
            <img src="assets/logo.jpeg" alt="Logo" class="logo-img">
            AL SIDRA
        </div>
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
        </div>
    `;

    // 2. Define the Header HTML
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

    // 3. Define Footer HTML
    const footerHTML = `
        <div class="container-fluid">
            <p class="mb-0">&copy; 2025 Vision X Digital Pvt. Ltd. | Al Sidra Admin Panel</p>
        </div>
    `;

    // 4. Inject HTML into the placeholders
    document.getElementById("sidebar-wrapper").innerHTML = sidebarHTML;
    document.getElementById("header-container").innerHTML = headerHTML;
    document.getElementById("footer-container").innerHTML = footerHTML;

    // 5. Initialize Sidebar Toggle functionality
    const toggleBtn = document.getElementById("menu-toggle");
    if(toggleBtn){
        toggleBtn.addEventListener('click', function(e) {
            e.preventDefault();
            document.body.classList.toggle("toggled");
        });
    }
}

function highlightCurrentPage() {
    // Get current file name (e.g., "quran.html")
    const currentPage = window.location.pathname.split("/").pop();
    
    // Find the link that points to this page and add 'active' class
    const links = document.querySelectorAll('.list-group-item');
    links.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}