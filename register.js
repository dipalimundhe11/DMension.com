document.addEventListener("DOMContentLoaded", () => {

    const registerForm = document.getElementById("registerForm");
    if (!registerForm) return;

    registerForm.addEventListener("submit", function(e) {
        e.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const role = document.getElementById("role").value;

        const users = JSON.parse(localStorage.getItem("users")) || [];

        const exists = users.some(u => u.email === email);
        if (exists) {
            alert("User already exists");
            return;
        }

        const newUser = {
            name,
            email,
            password,
            role
        };

        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));

        alert("Registration successful");
        window.location.href = "login.html";
    });
});