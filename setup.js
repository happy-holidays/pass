document.addEventListener("DOMContentLoaded", function () {
    // Handle Clever login button click
    document.getElementById("login-btn").addEventListener("click", function () {
        // Open Clever login in a new tab
        window.open("https://clever.com/oauth/authorize?response_type=code&redirect_uri=https%3A%2F%2Fapp.smartpass.app%2F&client_id=f4260ade643c042482a3&district_id=562e72b34c795e01000002e1&state=undefined", "_blank");
        
        // Move to the next page
        setTimeout(showNextPage, 1000); // Give it a slight delay to ensure transition
    });

    // Handle pasting data from clipboard
    document.getElementById("paste-data").addEventListener("click", async () => {
        try {
            const text = await navigator.clipboard.readText();
            document.getElementById("smartpass-data").value = text;
            document.getElementById("user-first-name").textContent = JSON.parse(text).first_name;
            localStorage.setItem("smartpassData", text); // Store data for ID generation
            showNextPage();
        } catch (error) {
            alert("Failed to paste data. Please copy it manually.");
        }
    });

    // Handle viewing photo
    document.getElementById("view-photo").addEventListener("click", () => {
        const rawData = document.getElementById("smartpass-data").value;
        const data = JSON.parse(rawData);
        window.open(data.profile_picture, "_blank");
    });

    // Handle file upload (photo attachment)
    document.getElementById("upload-photo").addEventListener("change", function (event) {
        const reader = new FileReader();
        reader.onload = function () {
            localStorage.setItem("uploadedPhoto", reader.result);
            showNextPage();
        };
        reader.readAsDataURL(event.target.files[0]);
    });
    
    // Handle Generate ID button click
    document.getElementById("generate-id-btn").addEventListener("click", function () {
        window.location.href = "smartpass.html"; // Redirect to generate ID page
    });

    function showNextPage() {
        const current = document.querySelector(".container:not(.hidden)");
        if (current) {
            current.classList.add("hidden");
            if (current.nextElementSibling) {
                current.nextElementSibling.classList.remove("hidden");
            }
        }
    }
});
