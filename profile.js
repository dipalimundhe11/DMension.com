// ===============================
// CHECK LOGIN
// ===============================
let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

if (!loggedInUser || loggedInUser.role !== "candidate") {
    alert("Please login as Job Seeker");
    window.location.href = "login.html";
}

// ===============================
// INITIAL SETUP
// ===============================
document.getElementById("email").value = loggedInUser.email;

let profiles = JSON.parse(localStorage.getItem("profiles")) || {};
let userProfile = profiles[loggedInUser.email];

let profileImageBase64 = "";

// ===============================
// LOAD EXISTING PROFILE
// ===============================
if (userProfile) {
    document.getElementById("fullName").value = userProfile.fullName || "";
    document.getElementById("phone").value = userProfile.phone || "";
    document.getElementById("location").value = userProfile.location || "";
    document.getElementById("skills").value = userProfile.skills || "";
    document.getElementById("about").value = userProfile.about || "";

    if (userProfile.resumeName) {
        document.getElementById("resumeName").innerText = userProfile.resumeName;
    }

    if (userProfile.profilePic) {
        document.getElementById("profilePreview").src = userProfile.profilePic;
        profileImageBase64 = userProfile.profilePic;
    }
}

// ===============================
// PROFILE IMAGE UPLOAD + PREVIEW
// ===============================
document.getElementById("profilePic").addEventListener("change", function() {
    let file = this.files[0];
    if (!file) return;

    let reader = new FileReader();
    reader.onload = function() {
        profileImageBase64 = reader.result;
        document.getElementById("profilePreview").src = profileImageBase64;
    };
    reader.readAsDataURL(file);
});

// ===============================
// SAVE PROFILE
// ===============================
document.getElementById("profileForm").addEventListener("submit", function(e) {
    e.preventDefault();

    let resumeFile = document.getElementById("resume").files[0];

    let profileData = {
        fullName: document.getElementById("fullName").value,
        email: loggedInUser.email,
        phone: document.getElementById("phone").value,
        location: document.getElementById("location").value,
        skills: document.getElementById("skills").value,
        about: document.getElementById("about").value,

        resumeName: resumeFile ?
            resumeFile.name :
            (userProfile && userProfile.resumeName ? userProfile.resumeName : ""),

        profilePic: profileImageBase64 ?
            profileImageBase64 :
            (userProfile && userProfile.profilePic ? userProfile.profilePic : "")
    };

    profiles[loggedInUser.email] = profileData;
    localStorage.setItem("profiles", JSON.stringify(profiles));

    alert("Profile saved successfully!");
});