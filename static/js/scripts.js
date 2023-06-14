document.querySelectorAll('.nav-link').forEach(item => {
    item.addEventListener('click', event => {
        // Prevent the default action
        event.preventDefault();

        // Get the target href
        const target = item.getAttribute('href');

        // Close the hamburger menu
        document.getElementById('hamburger').checked = false;

        // Navigate to the target section after closing the menu
        setTimeout(() => {
            window.location.hash = target;
        }, 50);
    })
});