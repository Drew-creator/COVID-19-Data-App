const form = document.querySelector('#stateSearch');
const stateTitle = document.querySelector('#stateTitle');
const test = document.querySelector('#test');
const jumboDiv = document.querySelector('#infoDiv');
const reportedCases = document.querySelector('#reportedCases');
const numberOfCases = document.querySelector('#numberOfCases');
const reportedDeaths = document.querySelector('#reportedDeaths');
const numberOfDeaths = document.querySelector('#numberOfDeaths');
const CDCParagraph = document.querySelector('#CDC')
const CDCLink = document.querySelector('#CDCLink')
const usPopulation = document.querySelector('#totalUSPopulation');
const usCases = document.querySelector('#totalUSCases');
const usDeaths = document.querySelector('#totalUSDeaths');
const usDistributed = document.querySelector('#totalUSDistributed');
const usFullyVaccinated = document.querySelector('#totalUSVaccinations');
const usPartiallyVaccinated = document.querySelector('#partialUSVaccinations');

form.addEventListener('submit', async function (e) {
    try {
        e.preventDefault();
        const searchTerm = form.elements.query.value;
        const res = await axios.get("https://covid-api.mmediagroup.fr/v1/cases?ab=US");
        console.log(res.data[searchTerm]);
        stateTitle.innerHTML = `COVID-19 Data for ${searchTerm}`;
        stateData(res.data[searchTerm]);
        form.elements.query.value = "";
    }
    catch(e) {
        console.log("Error:", e)
    }
})

document.addEventListener('DOMContentLoaded', async function (e) {
    try {
        const resUSTotal = await axios.get("https://covid-api.mmediagroup.fr/v1/cases?ab=US");
        console.log(resUSTotal.data)
        usCaseData(resUSTotal.data.All)
    }
    catch(e) {
        console.log("Error:", e)
    }
})

document.addEventListener('DOMContentLoaded', async function (e) {
    try {
        const resVaccine = await axios.get("https://covid-api.mmediagroup.fr/v1/vaccines");
        console.log(resVaccine.data["United States"].All);
        usVaccineData(resVaccine.data["United States"].All);
    }
    catch(e) {
        console.log("Error:", e)
    }
})

const usCaseData = (US) => {
    usPopulation.innerHTML = `Total Population: ${US.population}`;
    usCases.innerHTML = `Total Cases: ${US.confirmed}`
    usDeaths.innerHTML = `Total Deaths: ${US.deaths}`
}

const usVaccineData = (US) => {
    usDistributed.innerHTML = `Total Vaccines Distributed: ${US.administered}`
    usPartiallyVaccinated.innerHTML = `Partially Vaccinated: ${US.people_partially_vaccinated}`
    usFullyVaccinated.innerHTML = `Fully Vaccinated: ${US.people_vaccinated}`;
}

const stateData = (state) => {
    jumboDiv.className = "jumbotron"
    reportedCases.innerHTML = "Total Reported Cases"
    numberOfCases.innerHTML = state.confirmed;

    reportedDeaths.innerHTML = "Total Reported Deaths"
    numberOfDeaths.innerHTML = state.deaths;

    CDCParagraph.innerHTML = "For more information on COVID-19, visit the CDC website using the link below";
    CDCLink.innerText = "CDC Website"
    CDCLink.className = 'btn btn-primary btn-lg';
} 


//do a US page
//Canada Page
//home page
