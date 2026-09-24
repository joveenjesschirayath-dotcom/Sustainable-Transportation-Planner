function findEcoRoute() {

    const source = document.getElementById("source").value;
    const destination = document.getElementById("destination").value;
    const vehicle = document.getElementById("vehicle").value;

    if (source === "" || destination === "") {
        document.getElementById("route-result").innerHTML =
            "<p>Please enter both starting point and destination.</p>";
        return;
    }

    // Sample prototype route data
    const routes = [
        {
            name: "Route A",
            distance: 12,
            time: 35,
            traffic: "High"
        },
        {
            name: "Route B",
            distance: 14,
            time: 30,
            traffic: "Medium"
        },
        {
            name: "Route C",
            distance: 16,
            time: 32,
            traffic: "Low"
        }
    ];

    // Vehicle fuel efficiency in km/L
    let efficiency;

    if (vehicle === "petrol") {
        efficiency = 15;
    } else if (vehicle === "diesel") {
        efficiency = 18;
    } else {
        efficiency = 40;
    }

    // Calculate fuel consumption
    routes.forEach(route => {
        route.fuel = route.distance / efficiency;
    });

    let emissionFactor;

    if (vehicle === "petrol") {
    emissionFactor = 2.35;
}
else if (vehicle === "diesel") {
    emissionFactor = 2.69;
}
else {
    emissionFactor = 2.35;
}

routes.forEach(route => {
    route.co2 = route.fuel * emissionFactor;
});

    // Assign traffic scores
    routes.forEach(route => {

        if (route.traffic === "Low") {
            route.trafficScore = 100;
        } 
        else if (route.traffic === "Medium") {
            route.trafficScore = 60;
        } 
        else {
            route.trafficScore = 25;
        }
    });

    // Find minimum values
    const minTime = Math.min(...routes.map(route => route.time));
    const minDistance = Math.min(...routes.map(route => route.distance));
    const minFuel = Math.min(...routes.map(route => route.fuel));

    // Calculate Eco-Score
    routes.forEach(route => {

        const timeScore = (minTime / route.time) * 100;
        const distanceScore = (minDistance / route.distance) * 100;
        const fuelScore = (minFuel / route.fuel) * 100;

        route.ecoScore =
            (timeScore * 0.25) +
            (distanceScore * 0.15) +
            (route.trafficScore * 0.25) +
            (fuelScore * 0.35);
    });

    // Find the route with the highest Eco-Score
    const bestRoute = routes.reduce((best, route) =>
        route.ecoScore > best.ecoScore ? route : best
    );

    // Create route comparison section
    let result = `
        <h2>Route Options</h2>

        <p>
            <strong>${source}</strong> → <strong>${destination}</strong>
        </p>

        <div class="route-container">
    `;

    // Create a card for each route
    routes.forEach(route => {

        result += `
            <div class="route-card">

                <h3>${route.name}</h3>

                <p>
                    <strong>Distance:</strong>
                    ${route.distance} km
                </p>

                <p>
                    <strong>Travel Time:</strong>
                    ${route.time} minutes
                </p>

                <p>
                    <strong>Traffic:</strong>
                    ${route.traffic}
                </p>

                <p>
                    <strong>Estimated Fuel:</strong>
                    ${route.fuel.toFixed(2)} L
                </p>

                <p>
                    <strong>Estimated CO₂:</strong>
                    ${route.co2.toFixed(2)} kg
                </p>

                <div class="eco-score">
                    <strong>Eco-Score</strong>
                    <span>${route.ecoScore.toFixed(1)}/100</span>
                </div>

            </div>
        `;
    });

    result += `
        </div>

        <div class="recommended-route">

            <h2>★ Recommended Eco-Route: ${bestRoute.name}</h2>

            <p>
                ${bestRoute.name} provides the best balance of
                travel efficiency and environmental performance
                among the available routes.
            </p>

            <p>
                <strong>Eco-Score:</strong>
                ${bestRoute.ecoScore.toFixed(1)}/100
            </p>

        </div>

        <p class="prototype-note">
            Note: Route information shown is sample prototype data
            and does not represent live traffic or navigation data.
        </p>
    `;

    // Display the results
    document.getElementById("route-result").innerHTML = result;
}

function compareRoutes() {

    const vehicle = document.getElementById("compare-vehicle").value;

    const routes = [
        {
            name: "Route A",
            distance: 12,
            time: 35,
            traffic: "High"
        },
        {
            name: "Route B",
            distance: 14,
            time: 30,
            traffic: "Medium"
        },
        {
            name: "Route C",
            distance: 16,
            time: 32,
            traffic: "Low"
        }
    ];

    let efficiency;

    if (vehicle === "petrol") {
        efficiency = 15;
    }
    else if (vehicle === "diesel") {
        efficiency = 18;
    }
    else {
        efficiency = 40;
    }


    // Calculate fuel consumption

    routes.forEach(route => {
        route.fuel = route.distance / efficiency;
    });


    // Calculate estimated CO2

    let emissionFactor;

    if (vehicle === "petrol") {
        emissionFactor = 2.35;
    }
    else if (vehicle === "diesel") {
        emissionFactor = 2.69;
    }
    else {
        emissionFactor = 2.35;
    }

    routes.forEach(route => {
        route.co2 = route.fuel * emissionFactor;
    });


    // Traffic scores

    routes.forEach(route => {

        if (route.traffic === "Low") {
            route.trafficScore = 100;
        }
        else if (route.traffic === "Medium") {
            route.trafficScore = 60;
        }
        else {
            route.trafficScore = 25;
        }

    });


    // Find minimum values

    const minTime =
        Math.min(...routes.map(route => route.time));

    const minDistance =
        Math.min(...routes.map(route => route.distance));

    const minFuel =
        Math.min(...routes.map(route => route.fuel));


    // Calculate Eco-Score

    routes.forEach(route => {

        const timeScore =
            (minTime / route.time) * 100;

        const distanceScore =
            (minDistance / route.distance) * 100;

        const fuelScore =
            (minFuel / route.fuel) * 100;

        route.ecoScore =
            (timeScore * 0.25) +
            (distanceScore * 0.15) +
            (route.trafficScore * 0.25) +
            (fuelScore * 0.35);

    });


    // Find recommended route

    const bestRoute = routes.reduce((best, route) =>
        route.ecoScore > best.ecoScore
            ? route
            : best
    );


    // Create comparison table

    let result = `

        <h2>Route Comparison</h2>

        <div class="comparison-table-container">

            <table class="comparison-table">

                <tr>
                    <th>Factor</th>
                    <th>Route A</th>
                    <th>Route B</th>
                    <th>Route C</th>
                </tr>

                <tr>
                    <td>Distance</td>
                    <td>${routes[0].distance} km</td>
                    <td>${routes[1].distance} km</td>
                    <td>${routes[2].distance} km</td>
                </tr>

                <tr>
                    <td>Travel Time</td>
                    <td>${routes[0].time} min</td>
                    <td>${routes[1].time} min</td>
                    <td>${routes[2].time} min</td>
                </tr>

                <tr>
                    <td>Traffic</td>
                    <td>${routes[0].traffic}</td>
                    <td>${routes[1].traffic}</td>
                    <td>${routes[2].traffic}</td>
                </tr>

                <tr>
                    <td>Estimated Fuel</td>
                    <td>${routes[0].fuel.toFixed(2)} L</td>
                    <td>${routes[1].fuel.toFixed(2)} L</td>
                    <td>${routes[2].fuel.toFixed(2)} L</td>
                </tr>

                <tr>
                    <td>Estimated CO₂</td>
                    <td>${routes[0].co2.toFixed(2)} kg</td>
                    <td>${routes[1].co2.toFixed(2)} kg</td>
                    <td>${routes[2].co2.toFixed(2)} kg</td>
                </tr>

                <tr>
                    <td>Eco-Score</td>
                    <td>${routes[0].ecoScore.toFixed(1)}</td>
                    <td>${routes[1].ecoScore.toFixed(1)}</td>
                    <td>${routes[2].ecoScore.toFixed(1)}</td>
                </tr>

            </table>

        </div>


        <div class="comparison-recommendation">

            <h2>
                ★ Recommended Eco-Route:
                ${bestRoute.name}
            </h2>

            <p>
                ${bestRoute.name} provides the best overall
                balance between travel efficiency and
                environmental performance.
            </p>

        </div>

    `;


    document.getElementById("comparison-result").innerHTML = result;
}

function calculateEmission() {

    const distance =
        parseFloat(document.getElementById("distance").value);

    const vehicle =
        document.getElementById("calculator-vehicle").value;


    // Check whether distance is valid

    if (isNaN(distance) || distance <= 0) {

        document.getElementById("emission-result").innerHTML =
            "<p>Please enter a valid distance.</p>";

        return;
    }


    // Vehicle fuel efficiency in km/L

    let efficiency;

    if (vehicle === "petrol") {
        efficiency = 15;
    }
    else if (vehicle === "diesel") {
        efficiency = 18;
    }
    else {
        efficiency = 40;
    }


    // Emission factor in kg CO2 per litre

    let emissionFactor;

    if (vehicle === "petrol") {
        emissionFactor = 2.35;
    }
    else if (vehicle === "diesel") {
        emissionFactor = 2.69;
    }
    else {
        emissionFactor = 2.35;
    }


    // Calculate fuel consumption

    const fuelConsumed =
        distance / efficiency;


    // Calculate CO2 emissions

    const co2Emission =
        fuelConsumed * emissionFactor;


    // Display result

    document.getElementById("emission-result").innerHTML = `

        <div class="emission-result-card">

            <h2>Estimated Emissions</h2>

            <p>
                <strong>Distance:</strong>
                ${distance} km
            </p>

            <p>
                <strong>Estimated Fuel Consumption:</strong>
                ${fuelConsumed.toFixed(2)} L
            </p>

            <p>
                <strong>Estimated CO₂ Emission:</strong>
                ${co2Emission.toFixed(2)} kg
            </p>

        </div>

    `;
}
