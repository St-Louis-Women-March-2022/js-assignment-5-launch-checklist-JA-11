// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
   // Here is the HTML formatting for our mission target div.
   /*
                <h2>Mission Destination</h2>
                <ol>
                    <li>Name: </li>
                    <li>Diameter: </li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth: </li>
                    <li>Number of Moons: </li>
                </ol>
                <img src="">
   */
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
    form.addEventListener("submit", function(event) {
        pilot = document.querySelector("input[name=pilotName]");
        copilot = document.querySelector("input[name=copilotName]");
        fuelLevel = document.querySelector("input[name=fuelLevel]");
        cargoLevel = document.querySelector("input[name=cargoMass]");

        list = document.getElementById("faultyItems");
        list.style.visibility = "hidden";
        let pilotStatus = document.getElementById("pilotStatus");
        let copilotStatus = document.getElementById("copilotStatus");
        let fuelStatus = document.getElementById("fuelStatus");
        let launchStatus = document.getElementById("launchStatus");
        let cargoStatus = document.getElementById("cargoStatus");

        if (pilot.value === "" || copilot.value === "" || fuelLevel.value === "" || cargoLevel.value === "") {
            alert("All fields are required!");
            event.preventDefault();
        } else if (validateInput(pilot.value) !== "Not a Number" || validateInput(copilot.value) !== "Not a Number") {
            alert("Please enter a valid name for the pilot, co-pilot, or both.");
            event.preventDefault();
        } else if (validateInput(fuelLevel.value) !== "Is a number" || validateInput(cargoLevel.value) !== "Is a number") {
            alert("Please enter a valid number for the fuel level, cargo mass, or both.");
            event.preventDefault();
        } else {
            pilotStatus.innerHTML = `Pilot ${pilot.value} is ready for launch`;
            copilotStatus.innerHTML = `Co-pilot ${copilot.value} is ready for launch`;

            if (fuelLevel.value < 10000 && cargoLevel.value > 10000) {  //fuel too low & cargo mass too high
                list.style.visibility = "visible";
                fuelStatus.innerHTML = "Fuel level too low for launch";
                cargoStatus.innerHTML = "Cargo mass too high for launch";
                launchStatus.innerHTML = "Shuttle Not Ready For Launch";
                launchStatus.style.color = "red";
            } else if (fuelLevel.value < 10000 && cargoLevel.value <= 10000) {  //fuel too low, but cargo mass okay
                list.style.visibility = "visible";
                fuelStatus.innerHTML = "Fuel level too low for launch";
                cargoStatus.innerHTML = "Cargo mass low enough for launch";
                launchStatus.innerHTML = "Shuttle Not Ready For Launch";
                launchStatus.style.color = "red";
            } else if (fuelLevel.value >= 10000 && cargoLevel.value > 10000) {  //fuel okay, but cargo mass too high
                list.style.visibility = "visible";
                fuelStatus.innerHTML = "Fuel level high enough for launch";
                cargoStatus.innerHTML = "Cargo mass too high for launch";
                launchStatus.innerHTML = "Shuttle Not Ready For Launch";
                launchStatus.style.color = "red";
            } else if (fuelLevel.value >= 10000 && cargoLevel.value <= 10000) {  //fuel okay & cargo mass okay
                list.style.visibility = "visible";
                fuelStatus.innerHTML = "Fuel level high enough for launch";
                cargoStatus.innerHTML = "Cargo mass low enough for launch";
                launchStatus.innerHTML = "Shuttle Ready for Launch!";
                launchStatus.style.color = "green";
            }
            event.preventDefault();
        }
    });
}

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch().then( function(response) {
        });

    return planetsReturned;
}

function pickPlanet(planets) {
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
