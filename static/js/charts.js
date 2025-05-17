// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function() {
    console.log("Charts Page Loaded");

    const chartContainer = document.getElementById("chart-container");
    const chartFilter = document.getElementById("chart-filter");
    const userMapDataPath = "static/data/bike_user_and_map.json";

    // Load data and render chart
    fetch(userMapDataPath)
        .then(response => response.json())
        .then(data => {
            renderPieChart(data, "userType");

            // Update chart on dropdown change
            chartFilter.addEventListener("change", function() {
                const selectedValue = this.value;
                renderPieChart(data, selectedValue);
            });
        })
        .catch(error => console.log("Error loading data:", error));

    // Render Pie Chart
    function renderPieChart(data, category) {
        let dataCounts = {};

        data.forEach(item => {
            let key = item[category];

            // Map gender values to 'Male' and 'Female'
            if (category === "gender") {
                if (key === "1" || key === 1) key = "Male";
                else if (key === "2" || key === 2) key = "Female";
                else key = "Unknown";
            }

            if (key) {
                dataCounts[key] = (dataCounts[key] || 0) + 1;
            }
        });

        // If filtering by birthYear, only show top 5 years
        if (category === "birthYear") {
            const sortedYears = Object.entries(dataCounts).sort((a, b) => b[1] - a[1]);
            const top5 = sortedYears.slice(0, 5);
            dataCounts = Object.fromEntries(top5);
        }

        // Verify the data structure
        console.log("Data Counts:", dataCounts);

        // Create Plotly Pie Chart
        const trace = {
            labels: Object.keys(dataCounts),
            values: Object.values(dataCounts),
            type: 'pie',
            textinfo: 'label+percent',
            hoverinfo: 'label+value',
            marker: {
                colors: ['#FF5733', '#3498DB', '#FFC300', '#C70039', '#8E44AD']
            }
        };

        const layout = {
            title: `Distribution by ${category.charAt(0).toUpperCase() + category.slice(1)}`,
            height: 500,
            width: 700
        };

        Plotly.newPlot(chartContainer, [trace], layout);
    }
});
