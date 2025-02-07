document.addEventListener("DOMContentLoaded", function () {
    // Function to generate the ID card
    function generateIDCard() {
        let rawData = localStorage.getItem("smartpassData"); // Retrieve stored data
        if (!rawData) {
            alert("No data found. Please complete the setup process.");
            return;
        }
        
        let data = JSON.parse(rawData);
        let uploadedPhoto = localStorage.getItem("uploadedPhoto"); // Get uploaded profile photo
        
        if (!uploadedPhoto) {
            alert("No profile picture uploaded. Please complete the setup process.");
            return;
        }
        
        // Generate barcode URL with exact dimensions 164x70px
        let barcodeURL = `https://barcode.tec-it.com/barcode.ashx?data=${data.custom_id}&code=Code128&dpi=150&translate-esc=off&width=164&height=70`;
        
        // Generate the ID card HTML
        document.body.innerHTML = `
    <div class="id-card-main-wrapper">
        <div class="id-card-wrapper flip-box">
            <div class="flip-box-inner">
                <div class="design">
                    <div class="scrolling-wrapper">
                    </div>
                </div>
                <div class="flip-box-front">
                    <div class="top" style="background: rgb(255, 95, 0);">
                        <div class="details-wrapper">
                            <div class="school-name-wrapper">
                                <p class="school-name">${data.school_name}</p>
                                <p class="year">2024 - 25</p>
                            </div>
                            <div class="avatar-info">
                                <div class="avatar">
                                    <img src="${uploadedPhoto}" alt="Profile Picture">
                                </div>
                                <div class="logo">
                                    <img src="img/BHHS-LOGO-RGB-1.png" alt="School Logo">
                                </div>
                            </div>
                            <p class="card-holder-name">${data.display_name}</p>
                            <div class="role-grade">
                                <p>Student</p>
                                <span class="bullet">•</span>
                                <p>Grade ${data.grade_level}</p>
                            </div>
                        </div>
                    </div>
                    <div class="id-detail-wrapper">
                        <img class="barcode-img" src="${barcodeURL}" width="164" height="70">
                        <p class="id-number">${data.custom_id}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
`;

    }
    
    // Call the function to generate the ID card
    generateIDCard();
});
