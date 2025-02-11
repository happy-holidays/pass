document.addEventListener("DOMContentLoaded", function () {
    function generateIDCard() {
        let rawData = localStorage.getItem("smartpassData");
        if (!rawData) {
            alert("No data found. Please complete the setup process.");
            return;
        }

        let data = JSON.parse(rawData);
        let uploadedPhoto = localStorage.getItem("uploadedPhoto");

        if (!uploadedPhoto) {
            alert("No profile picture uploaded. Please complete the setup process.");
            return;
        }

        let barcodeURL = `https://barcode.tec-it.com/barcode.ashx?data=${data.custom_id}&code=Code128&dpi=150&translate-esc=off&width=164&height=70`;

        document.documentElement.innerHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-title" content="SmartPass">
    <meta name="theme-color" content="#001832">

    <title>SmartPass</title>
    
    <link rel="stylesheet" href="smartpass.css">
</head>
<body>
    <div class="overlay-main-wrapper">
        <div class="header-bar">
            <span class="done-button" onclick="showDisabledScreen()">Done</span>
        </div>
        <div class="id-container">
            <app-id-card>
                <div class="id-card-main-wrapper">
                    <div class="id-card-wrapper flip-box">
                        <div class="flip-box-inner" id="flip-box-inner">
                            <div class="flip-box-front">
                                <div class="top" style="background: rgb(255, 95, 0);">
                                    <div class="details-wrapper">
                                        <div class="school-name-wrapper">
                                            <p class="school-name">${data.school_name}</p>
                                            <p class="year">2025 - 26</p>
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
                                    <div class="stickers-wrapper-w-barcode">
                                        <div class="sticker-icon" style="background: rgb(110, 118, 137);">
                                            <img alt="" class="sticker-img" src="img/FFFFFF.png">
                                        </div>
                                        <div class="sticker-icon" style="background: rgb(110, 118, 137);">
                                            <img alt="" class="sticker-img" src="img/IMG_9457.jpeg">
                                        </div
                                    </div>
                                    <img class="barcode-img" src="${barcodeURL}" width="164" height="70">
                                    <p class="id-number">${data.custom_id}</p>
                                </div>
                            </div>
                        </div>
                        <div class="design">
                                <div class="scrolling-wrapper"></div>
                            </div>
                    </div>
                    <div class="button flip-btn">
                        <button onclick="toggleFlip()">
                            <div class="content-wrapper">Flip to back</div>
                                <img class="flip-icon" src="img/Undo.svg" alt="Undo">
                        </button>
                    </div>

                </div>
            </app-id-card>
        </div>
        
    </div>
                <div class="fullscreen-bg"></div>
</body>
</html>`;
    }
    // Prevent default scrolling and touch gestures
document.addEventListener("touchmove", function(event) {
    event.preventDefault();
}, { passive: false });

document.addEventListener("wheel", function(event) {
    event.preventDefault();
}, { passive: false });

document.addEventListener("keydown", function(event) {
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Space"].includes(event.key)) {
        event.preventDefault();
    }
});

    function showDisabledScreen() {
        document.querySelector(".overlay-main-wrapper").style.display = "none"; // Hide the main ID screen
        document.body.innerHTML = `
            <app-mobile-restriction class="ng-star-inserted">
                <div class="wrapper">
                    <div class="disablewrapper">
                        <div class="disableinner">
                            <div class="ds-flex-start-center">
                                <img alt="" src="img/no_phone.svg">
                            </div>
                            <div class="description">
                                <h3>Your school has disabled <br> SmartPass on phones</h3>
                                <p>Please use SmartPass on a computer</p>
                            </div>
                        </div>
                        <div class="btn-signout">
                            <a href="/sign-out">Sign out</a>
                        </div>
                    </div>
                </div>
                <div class="id-card ng-star-inserted" onclick="generateIDCard()">
                    <div class="wrapper">
                        <img width="18px" alt="" src="./img/Digital ID Card (White).svg">
                        <div class="title">ID</div>
                    </div>
                </div>
            </app-mobile-restriction>
            <div class="fullscreen-bg"></div>
        `;
    }
    

    function toggleFlip() {
        let flipBox = document.getElementById("flip-box-inner");
        flipBox.style.transform = flipBox.style.transform === "rotateY(180deg)" ? "rotateY(0deg)" : "rotateY(180deg)";
    }
    let generateButton = document.getElementById("generate-id");
    if (generateButton) {
        generateButton.addEventListener("click", function (event) {
            event.preventDefault();
            generateIDCard();
        });
    }

    window.generateIDCard = generateIDCard;
    window.showDisabledScreen = showDisabledScreen;
    window.toggleFlip = toggleFlip;
});
