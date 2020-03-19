console.log("HEY YOU, I LOVE YOU SO MUCH");


const form = document.querySelector('form');
const input = document.querySelector('input');
const locationField = document.querySelector("#location");
const summaryField = document.querySelector("#summary");
const dataField = document.querySelector("#data");
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const value = input.value;
    locationField.textContent = "";
    summaryField.textContent = "";
    dataField.textContent = "";

    fetch('/weather?location=' + value).then((response) => {
        response.json().then((data) => {
            if(data.error || value === '')  locationField.textContent = data.error;
            else {
                locationField.textContent = data.location;
                summaryField.textContent = data.summary;
                dataField.textContent = "Il fait " + data.temperature + "°C et il y'a " + data.precipProbability + " % de chance de précipitation.";
            }
        })
    }).catch( (error) => {
        locationField.textContent = error;
    })
});
