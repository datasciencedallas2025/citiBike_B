// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function() {
    console.log("Info Page Loaded");

    const section = document.querySelector('.section');

    // Path to data files
    const timeDataPath = "static/data/bike_time.json";
    const userMapDataPath = "static/data/bike_user_and_map.json";

    // Fetch and display dataset information
    Promise.all([
        fetch(timeDataPath).then(response => response.json()),
        fetch(userMapDataPath).then(response => response.json())
    ])
    .then(([timeData, userMapData]) => {
        displayDataInfo(timeData, userMapData);
    })
    .catch(error => console.log("Error loading data:", error));

    // Display dataset information
    function displayDataInfo(timeData, userMapData) {
        let infoContent = `
            <h2>Dataset Overview</h2>
            <div class="data-summary">
                <h3>Time Data:</h3>
                <p>Total Records: ${timeData.length}</p>
                <h3>User and Map Data:</h3>
                <p>Total Records: ${userMapData.length}</p>
            </div>
        `;

        // Display sample data
        infoContent += `
            <h2>Data Samples</h2>
            <div class="data-sample">
                <h3>Time Data Sample:</h3>
                <pre>${JSON.stringify(timeData.slice(0, 2), null, 2)}</pre>
                <h3>User and Map Data Sample:</h3>
                <pre>${JSON.stringify(userMapData.slice(0, 2), null, 2)}</pre>
            </div>
        `;

        section.innerHTML = infoContent;
    }
});
