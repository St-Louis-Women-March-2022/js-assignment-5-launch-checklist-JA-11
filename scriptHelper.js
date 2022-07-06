// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    const missionTarget = document.getElementById("missionTarget");
    missionTarget.innerHTML = `
                <h2>Mission Destination</h2>
                <ol>
                    <li>Name: ${name}</li>
                    <li>Diameter: ${diameter}</li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth: ${distance}</li>
                    <li>Number of Moons: ${moons}</li>
                </ol>
                <img src="${imageUrl}">
            `;
}

function validateInput(testInput) {
    if (testInput === "") {
        return "Empty";
    } else if (isNaN(testInput)) {
        return "Not a Number";
    } else if (!isNaN(testInput)) {
        return "Is a number";
    }
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    let form = document.querySelector("form");
    form.addEventListener("submit", function (event) {
        pilot = document.querySelector("input[name=pilotName]");
        copilot = document.querySelector("input[name=copilotName]");
        fuelLevel = document.querySelector("input[name=fuelLevel]");
        cargoLevel = document.querySelector("input[name=cargoMass]");
        list = document.getElementById("faultyItems");
        let pilotStatus = document.getElementById("pilotStatus");
        let copilotStatus = document.getElementById("copilotStatus");
        let fuelStatus = document.getElementById("fuelStatus");
        let launchStatus = document.getElementById("launchStatus");
        let cargoStatus = document.getElementById("cargoStatus");

        if (pilot.value === "" || copilot.value === "" || fuelLevel.value === "" || cargoLevel.value === "") {
            alert("All fields are required!");
            launchStatus.innerHTML = "Awaiting Information Before Launch";
            launchStatus.style.color = "";
            list.style.visibility = "hidden";
            event.preventDefault();
        } else if (validateInput(pilot.value) === "Is a number" || validateInput(copilot.value) === "Is a number") {
            alert("Please enter a valid name for the pilot, co-pilot, or both.");
            launchStatus.innerHTML = "Awaiting Information Before Launch";
            launchStatus.style.color = "";
            list.style.visibility = "hidden";
            event.preventDefault();
        } else if (validateInput(fuelLevel.value) === "Not a Number" || validateInput(cargoLevel.value) === "Not a Number") {
            alert("Please enter a valid number for the fuel level, cargo mass, or both.");
            launchStatus.innerHTML = "Awaiting Information Before Launch";
            launchStatus.style.color = "";
            list.style.visibility = "hidden";
            event.preventDefault();
        } else {
            pilotStatus.innerHTML = `Pilot ${pilot.value} is ready for launch`;
            copilotStatus.innerHTML = `Co-pilot ${copilot.value} is ready for launch`;

            if (fuelLevel.value < 10000 && cargoLevel.value > 10000) {  //fuel too low & cargo mass too heavy
                list.style.visibility = "visible";
                fuelStatus.innerHTML = "Fuel level too low for launch";
                cargoStatus.innerHTML = "Cargo mass too heavy for launch";
                launchStatus.innerHTML = "Shuttle Not Ready For Launch";
                launchStatus.style.color = "red";
            } else if (fuelLevel.value < 10000 && cargoLevel.value <= 10000) {  //fuel too low, but cargo mass okay
                list.style.visibility = "visible";
                fuelStatus.innerHTML = "Fuel level too low for launch";
                cargoStatus.innerHTML = "Cargo mass low enough for launch";
                launchStatus.innerHTML = "Shuttle Not Ready For Launch";
                launchStatus.style.color = "red";
            } else if (fuelLevel.value >= 10000 && cargoLevel.value > 10000) {  //fuel okay, but cargo mass too heavy
                list.style.visibility = "visible";
                fuelStatus.innerHTML = "Fuel level high enough for launch";
                cargoStatus.innerHTML = "Cargo mass too heavy for launch";
                launchStatus.innerHTML = "Shuttle Not Ready For Launch";
                launchStatus.style.color = "red";
            } else if (fuelLevel.value >= 10000 && cargoLevel.value <= 10000) {  //fuel okay & cargo mass okay
                list.style.visibility = "visible";
                fuelStatus.innerHTML = "Fuel level high enough for launch";
                cargoStatus.innerHTML = "Cargo mass low enough for launch";
                launchStatus.innerHTML = "Shuttle Ready For Launch!";
                launchStatus.style.color = "green";
            }
            event.preventDefault();
        }
    });
}

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then(function (response) {
        return response.json();
    });

    return planetsReturned;
}


//pickPlanet() takes in one argument: a list of planets. Using Math.random(), return one planet from the list with a randomly-selected index.
function pickPlanet(planets) {
    return planets[Math.floor(Math.random() * planets.length)];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet;
module.exports.myFetch = myFetch;
