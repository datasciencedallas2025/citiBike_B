// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function() {
    console.log("About Page Loaded");

    const section = document.querySelector('.section');

    // Dynamic content for the About page
    const teamMembers = [
        { name: "Roman Lubarsky", role: "Bachelor of Science in CS, UTD" }
        
    ];

    let teamContent = `
        <h2>About Me</h2>
        <ul class="team-list">
    `;

    teamMembers.forEach(member => {
        teamContent += `
            <li>
                <strong>${member.name}</strong> - ${member.role}
            </li>
        `;
    });

    teamContent += `</ul>`;

    section.innerHTML = teamContent;
});
