document.getElementById("jobForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const job = {
        title: jobTitle.value,
        company: company.value,
        location: location.value,
        description: description.value
    };

    let jobs = JSON.parse(localStorage.getItem("jobs")) || [];
    jobs.push(job);
    localStorage.setItem("jobs", JSON.stringify(jobs));

    alert("Job Posted Successfully!");
    this.reset();
});

document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("loggedInUser");
    window.location.href = "index.html";
});