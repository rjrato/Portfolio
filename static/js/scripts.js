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

function showFeedbackMessage() {
    var message = document.getElementById('feedbackMessage');
    message.classList.add('show');

    // Remove the class after the animation ends to allow re-triggering
    setTimeout(function() {
        message.classList.remove('show');
    }, 6000); // Match the duration of the animation
}

// Example: Call this function when the form is submitted
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent actual form submission for demo purposes
    showFeedbackMessage();
});

