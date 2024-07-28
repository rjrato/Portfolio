// Toggle Carousel Item Active
$(".custom-carousel").owlCarousel({
    autoWidth: true,
    loop: true
});

$(document).ready(function () {
    $(".custom-carousel .item").hover(
        function () {
            $(this).addClass("active");
        },
        function () {
            $(this).removeClass("active");
        }
    );

    $(".custom-carousel .item").click(function () {
        $(".custom-carousel .item").not($(this)).removeClass("active");
        $(this).addClass("active");
    });
});

// navbar navigation
document.querySelectorAll('.nav-link').forEach(item => {
    item.addEventListener('click', event => {
        event.preventDefault();
        document.getElementById('hamburger').checked = false;
        setTimeout(() => window.location.hash = item.getAttribute('href'), 50);
    });
});

document.getElementById('contactForm').addEventListener('submit', function(event) {

    var formData = new FormData(this);
    var feedbackMessage = document.getElementById("feedbackMessage");

    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/contact", true)
    xhttp.setRequestHeader("Accept", "application/json");

    xhttp.onload = function () {

        var response = JSON.parse(xhttp.responseText);

        if (xhttp.status === 200 && response.status === "success") {
            feedbackMessage.innerText = response.message;
            feedbackMessage.classList.add("show");
            document.getElementById("contactForm").reset();

            // Remove the class after the animation ends to allow re-triggering
            setTimeout(function() {
                feedbackMessage.classList.remove("show");
                feedbackMessage.innerText = "";
            }, 6000); // Match the duration of the animation

        } else {
            feedbackMessage.innerText = response.message;
            feedbackMessage.style.color = "red";
            feedbackMessage.classList.add("show");

            // Remove the class after the animation ends to allow re-triggering
            setTimeout(function() {
                feedbackMessage.classList.remove("show");
                feedbackMessage.innerText = "";
            }, 6000); // Match the duration of the animation
        }
    };

    xhttp.send(formData);
});

