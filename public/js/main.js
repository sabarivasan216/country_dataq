async function searchCountry() {
    const countryInput = document.getElementById('countryInput').value.trim();
    const resultDiv = document.getElementById('result');
    
    if (!countryInput) {
        alert('Please enter a country name');
        return;
    }

    try {
        const response = await fetch(`/api/countries?name=${encodeURIComponent(countryInput)}`);
        const data = await response.json();

        if (response.ok) {
            // Filter for exact or close matches
            const exactMatch = data.find(country => 
                country.name.common.toLowerCase() === countryInput.toLowerCase() ||
                country.name.official.toLowerCase() === countryInput.toLowerCase()
            );

            const country = exactMatch || data[0];
            resultDiv.innerHTML = `
                <h2>${country.name.common}</h2>
                <p>Capital: ${country.capital || 'N/A'}</p>
                <p>Population: ${country.population.toLocaleString()}</p>
                <p>Region: ${country.region}</p>
                <p>Languages: ${Object.values(country.languages || {}).join(', ')}</p>
                <img src="${country.flags.png}" alt="${country.name.common} flag" width="200">
            `;
            resultDiv.style.display = 'block';
        } else {
            resultDiv.innerHTML = '<p class="error">Country not found</p>';
            resultDiv.style.display = 'block';
        }
    } catch (error) {
        resultDiv.innerHTML = '<p class="error">Error fetching country data</p>';
        resultDiv.style.display = 'block';
    }
}