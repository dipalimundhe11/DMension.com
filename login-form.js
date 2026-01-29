function loginUser() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (email === "admin@jobportal.com" && password === "admin123") {
        localStorage.setItem("loggedInUser", JSON.stringify({
            name: "Admin",
            role: "admin"
        }));
        window.location.href = "admin-dashboard.html";
    } else {
        alert("Invalid login credentials");
    }
}