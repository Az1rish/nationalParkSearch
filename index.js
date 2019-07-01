'use strict';

const apiKey = "xjbEIaolcbFLDqlhBl7t9r7JZiZzbmGTvNtunPc9";
const searchURL = 'https://developer.nps.gov/api/v1/parks';

function formatQueryParams(params) {
    const queryItems = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
}

function displayResults(responseJson) {
    console.log(responseJson);
    $('#results-list').empty();

    // iterate through the items here
    if (responseJson.data.length === 0) {
        $('#results-list').append(
            `<h3>Nothing to see here. Are you sure that's a state?</h3>`
        );
    }
    for (let i = 0; i < responseJson.data.length; i++) {
        $('#results-list').append(
            `<li><h3>${responseJson.data[i].fullName}</h3>
            <p>${responseJson.data[i].description}</p>
            <p>Directions: ${responseJson.data[i].directionsInfo}</p>
            <a href="${responseJson.data[i].url}" alt="Web Address" target="_blank">Visit the website</a>
            </li>`
        )
    };
    // remove the hidden class
    $('#results').removeClass('hidden');
};

function getParkInfo(query, maxResults=10) {
    const params = {
        stateCode: query,
        limit: maxResults,
        api_key: apiKey
    };

    const queryString = formatQueryParams(params);
    const url = searchURL + '?' + queryString;

    console.log(url);

    fetch(url)
        .then(response => {
            if(response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayResults(responseJson))
        .catch(err => {
            $('#js-error-message').text(`Something went wrong: ${err.message}`);
        });
}

function watchForm() {
    console.log("Let's find some parks!");

    $('form').submit(e => {
        e.preventDefault();
        const searchTerm = $('#js-search').val();
        const maxResults = $('#js-max-results').val();
        getParkInfo(searchTerm, maxResults);
    });
}

$(watchForm);