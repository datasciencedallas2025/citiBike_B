// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function() {
    console.log("Home Page Loaded");

    // Display welcome message
    const section = document.querySelector('.section');
    section.innerHTML += `
        <div class="welcome-message">
            <h2>Data-Driven Insights</h2>
            <p>Explore the latest bike trip data through interactive maps and visualizations.</p>
        </div>
    `;

    // Add event listeners to navigation links
    document.querySelectorAll('.navbar a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = e.target.getAttribute('href');
            window.location.href = target;
        });
    });
});
