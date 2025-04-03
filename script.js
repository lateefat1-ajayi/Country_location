const search = document.getElementById("search");
const searchBttn = document.getElementById("searchBttn");
const countryContainer = document.getElementById("countryContainer");


function fetchLocation() {
    countryContainer.innerHTML = " ";
    fetch("https://restcountries.com/v3.1/all")
        .then((res) => res.json())
        .then((data) => showLocation(data));
}

function showLocation(data) {
    countryContainer.innerHTML = "";

    data.forEach((country) => {
        
        let divContainer = document.createElement("div");
        divContainer.classList.add("divContainer");
        
        divContainer.innerHTML = `
            <img src=${country.flags.png} alt="flag">
            <h3>Name: ${country.name.common}</h3>
            <h3>Region: ${country.region}</h3>
            <p>Population: ${country.population.toLocaleString()}</p>
        `;
        
        const borders = country.borders || [];
        const neighborsBtn = document.createElement("button");
        neighborsBtn.classList.add("neighbors-btn");
        
        if (borders.length > 0) {
            neighborsBtn.textContent = `View ${borders.length} Neighbors`;
            neighborsBtn.addEventListener("click", () => {
                fetchNeighbors(borders, country.name.common);
            });
        } else {
            neighborsBtn.textContent = "No Neighbors";
            neighborsBtn.disabled = true;
            neighborsBtn.classList.add("no-neighbors");
        }
        
        divContainer.appendChild(neighborsBtn);
        countryContainer.appendChild(divContainer);
    });
}

function fetchNeighbors(borderCodes) {
    countryContainer.innerHTML = `<p>Loading...</p>`;
    
    fetch(`https://restcountries.com/v3.1/alpha?codes=${borderCodes}`)
        .then((res) => res.json())
        .then((neighbors) => {
            
            neighbors.forEach((neighbor) => {
                let divContainer = document.createElement("div");
                divContainer.classList.add("divContainer");
                
                divContainer.innerHTML = `
                    <img src=${neighbor.flags.png} alt="flag">
                    <h3>Name: ${neighbor.name.common}</h3>
                    <h3>Region: ${neighbor.region}</h3>
                    <p>Population: ${neighbor.population.toLocaleString()}</p>
                `;
                
                countryContainer.appendChild(divContainer);
            });
        })
}

searchBttn.addEventListener("click", function() {
    const searchText = search.value.trim().toLowerCase();
    
    fetch("https://restcountries.com/v3.1/all")
        .then((res) => res.json())
        .then((data) => {
            const filteredCountries = data.filter((country) => 
                country.name.common.toLowerCase().includes(searchText)
            );
            
            if (filteredCountries.length === 0) {
                countryContainer.innerHTML = "<p>No matching countries found</p>";
            } else {
                showLocation(filteredCountries);
            }
        });
});