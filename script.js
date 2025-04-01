const search = document.getElementById("search");
const searchBttn = document.getElementById("searchBttn");

const countryContainer = document.getElementById("countryContainer");

function fetchLocation() {
    fetch("https://restcountries.com/v3.1/all")
    .then((res) => res.json())
    .then((data) => {showLocation(data)})
    
}

function showLocation(data) {
    countryContainer.innerHTML = "";

    data.forEach((item) =>{
        let divContainer = document.createElement("div");
        
        divContainer.classList.add("divContainer");
        
        divContainer.innerHTML = `
        <img src=${item.flags.png} alt="flag">
        <h3>Name: ${item.name.common}</h3>
        <h3>Region: ${item.region}</h3>
        <p> population: ${item.population}</p>
        `
        countryContainer.appendChild(divContainer)
    });

    
}

searchBttn.addEventListener("click" , function () {
    const searchText = search.value.trim().toLowerCase();
    fetch("https://restcountries.com/v3.1/all")
    .then((res) => res.json())
    .then((data) => {
        const country = data.filter((term) => {
        return    term.region.toLowerCase().includes(searchText) 
        })
        showLocation(country);
    });
})

fetchLocation()