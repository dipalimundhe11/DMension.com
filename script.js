document.addEventListener("DOMContentLoaded", () => {

    const navLinks = document.getElementById("navLinks");
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (!navLinks) return;

    // USER LOGGED IN
    if (loggedInUser) {
        navLinks.innerHTML = `
            <li class="nav-item text-white me-3">
                Hello, ${loggedInUser.name} (${loggedInUser.role})
            </li>
            <li class="nav-item">
                <a class="nav-link btn btn-danger text-white ms-2" href="#" id="logoutBtn">
                    Logout
                </a>
            </li>
        `;

        document.getElementById("logoutBtn").addEventListener("click", () => {
            localStorage.removeItem("loggedInUser");
            window.location.reload();
        });

    }
    // USER NOT LOGGED IN
    else {
        navLinks.innerHTML = `
            <li class="nav-item">
                <a class="nav-link btn btn-light text-primary ms-2" href="login.html">Login</a>
            </li>
            <li class="nav-item">
                <a class="nav-link btn btn-light text-primary ms-2" href="register.html">Register</a>
            </li>
        `;
    }

});