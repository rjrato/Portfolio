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
    event.preventDefault(); // Prevent actual form submission

    var formData = new FormData(this);
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/contact', true);
    xhr.setRequestHeader('Accept', 'application/json');

    xhr.onload = function () {
        if (xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            if (response.status === "success") {
                var message = document.getElementById('feedbackMessage');
                message.classList.add('show');

                // Remove the class after the animation ends to allow re-triggering
                setTimeout(function() {
                    message.classList.remove('show');
                }, 6000); // Match the duration of the animation
            } else {
                alert('There was an error sending your message. Please try again later.');
            }
        } else {
            alert('There was an error sending your message. Please try again later.');
        }
    };

    xhr.send(formData);
});

