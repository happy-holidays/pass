document.addEventListener("DOMContentLoaded", function () {
    // Function to replace entire document with the generated ID card
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
        
        // Replace the entire document content
        document.documentElement.innerHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    
    <!-- Force Fullscreen on iPhone & Android -->
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-title" content="SmartPass">
    <meta name="theme-color" content="#001832">

    <title>SmartPass</title>
    
    <!-- Link Styles -->
    <link rel="stylesheet" href="smartpass.css">
</head>
<body>
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
                        <div class="stickers-wrapper-w-barcode ng-star-inserted" style="display: flex; justify-content: center;">
                            <div class="sticker-icon ng-star-inserted" style="background: rgb(110, 118, 137); display: flex; justify-content: center; align-items: center;">
                                <img alt="" class="sticker-img" src="img/FFFFFF.png">
                            </div>
                        </div>
                        <img class="barcode-img" src="${barcodeURL}" width="164" height="70">
                        <p class="id-number">${data.custom_id}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>`;
    }
    
    // Attach event listener correctly for Generate ID button
    let generateButton = document.getElementById("generate-id");
    if (generateButton) {
        generateButton.addEventListener("click", function (event) {
            event.preventDefault();
            generateIDCard();
        });
    }

    // Expose the generateIDCard function globally so setup.js can call it
    window.generateIDCard = generateIDCard;
});