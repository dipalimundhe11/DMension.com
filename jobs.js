document.addEventListener("DOMContentLoaded", () => {

    const postJobForm = document.getElementById("postJobForm");
    const adminJobList = document.getElementById("adminJobList");

    function getJobs() {
        return JSON.parse(localStorage.getItem("jobs")) || [];
    }

    function saveJobs(jobs) {
        localStorage.setItem("jobs", JSON.stringify(jobs));
    }

    function loadAdminJobs() {
        if (!adminJobList) return;

        const jobs = getJobs();
        adminJobList.innerHTML = "";

        if (jobs.length === 0) {
            adminJobList.innerHTML = `
                <tr>
                    <td colspan="5" class="text-center text-muted">
                        No jobs posted yet
                    </td>
                </tr>
            `;
            return;
        }

        jobs.forEach((job, index) => {
            adminJobList.innerHTML += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${job.title}</td>
                    <td>${job.company}</td>
                    <td>${job.location}</td>
                    <td>
                        <button class="btn btn-danger btn-sm"
                            onclick="deleteJob(${index})">
                            Delete
                        </button>
                    </td>
                </tr>
            `;
        });
    }

    window.deleteJob = function(index) {
        const jobs = getJobs();
        jobs.splice(index, 1);
        saveJobs(jobs);
        loadAdminJobs();
    };

    if (postJobForm) {
        postJobForm.addEventListener("submit", function(e) {
            e.preventDefault();

            const job = {
                title: document.getElementById("jobTitle").value.trim(),
                company: document.getElementById("companyName").value.trim(),
                location: document.getElementById("jobLocation").value.trim(),
                description: document.getElementById("jobDescription").value.trim()
            };

            if (!job.title || !job.company || !job.location || !job.description) {
                alert("Fill all fields");
                return;
            }

            const jobs = getJobs();
            jobs.push(job);
            saveJobs(jobs);

            alert("Job Posted Successfully");
            postJobForm.reset();
            loadAdminJobs(); // 🔥 THIS WAS MISSING
        });
    }

    loadAdminJobs();
});