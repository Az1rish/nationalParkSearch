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
    // remove the hidden class
}

function getParkInfo(query, maxResults=10) {
    const params = {
        // required parameters
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
    $('form').submit(e => {
        e.preventDefault();
        const searchTerm = $('#js-search').val();
        const maxResults = $('#js-max-results').val();
        getParkInfo(searchTerm, maxResults);
    });
}

$(watchForm);