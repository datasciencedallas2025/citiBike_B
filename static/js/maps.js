// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function() {
    console.log("Maps Page Loaded");

    const mapContainer = document.getElementById("map-container");
    const dataFilter = document.getElementById("data-filter");

    const userMapDataPath = "static/data/bike_user_and_map.json";
    const timeDataPath = "static/data/bike_time.json";

    let map;
    let heatLayer;

    // Initialize map centered on New York City
    initializeMap();

    // Load data and apply filter
    Promise.all([
        fetch(userMapDataPath).then(response => response.json()),
        fetch(timeDataPath).then(response => response.json())
    ])
    .then(([userData, timeData]) => {
        renderHeatmap(userData, timeData, "all");

        dataFilter.addEventListener("change", function() {
            renderHeatmap(userData, timeData, this.value);
        });
    })
    .catch(error => console.log("Error loading data:", error));

    function initializeMap() {
        map = L.map(mapContainer).setView([40.730610, -73.935242], 12);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 18,
            attribution: '© OpenStreetMap'
        }).addTo(map);
    }

    function renderHeatmap(userData, timeData, filter) {
        const heatArray = [];

        userData.forEach((item, index) => {
            const startLat = parseFloat(item.startStationLatitude);
            const startLng = parseFloat(item.startStationLongitude);

            const timeRecord = timeData[index];
            const tripDuration = timeRecord ? timeRecord.tripDuration : null;

            let includePoint = true;

            // Apply unified filter logic
            switch (filter) {
                case "userType":
                    includePoint = item.userType === "Subscriber";
                    break;

                case "birthYear":
                    includePoint = item.birthYear >= 1980 && item.birthYear <= 1990;
                    break;

                case "gender":
                    includePoint = item.gender === "1" || item.gender === 1;
                    break;

                case "tripDuration":
                    includePoint = tripDuration && tripDuration >= 600 && tripDuration <= 1200;
                    break;
            }

            if (includePoint && !isNaN(startLat) && !isNaN(startLng)) {
                heatArray.push([startLat, startLng, 0.5]);
            }
        });

        console.log("Filtered Heat Array:", heatArray.slice(0, 10));

        if (heatLayer) map.removeLayer(heatLayer);

        heatLayer = L.heatLayer(heatArray, {
            radius: 20,
            blur: 30,
            maxZoom: 18,
            gradient: {
                0.2: '#3498DB',
                0.5: '#1E90FF',
                0.7: '#FFC300',
                1.0: '#FF5733'
            }
        }).addTo(map);
    }
});
