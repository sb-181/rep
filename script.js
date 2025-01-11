document.addEventListener('DOMContentLoaded', function() {
    // Fetch and display details of Chelsea (team ID: 61)
    fetchTeamDetails('61'); // Replace '61' with the actual team ID you are interested in
});

const API_BASE_URL = 'https://api.football-data.org/v4';
const API_KEY = '8fc6acf19bed4a1bac2bd830f153b66c'; // Replace with your actual API key

function fetchTeamDetails(teamId) {
    fetch(`${API_BASE_URL}/teams/${teamId}`, {
        headers: { 'X-Auth-Token': 8fc6acf19bed4a1bac2bd830f153b66c } // Remove this line if the API is public and does not require a key
    })
    .then(response => response.json())
    .then(data => displayTeamDetails(data))
    .catch(error => console.error('Error fetching team details:', error));
}

function displayTeamDetails(team) {
    const teamSection = document.getElementById('latest-news'); // Change this ID to the section you want to display team details in

    // Clear previous content
    teamSection.innerHTML = '';

    const teamInfo = document.createElement('article');
    teamInfo.innerHTML = `
        <h3>${team.name}</h3>
        <img src="${team.crest}" alt="${team.name} Crest">
        <p>Short Name: ${team.shortName}</p>
        <p>Founded: ${team.founded}</p>
        <p>Venue: ${team.venue}</p>
        <p>Website: <a href="${team.website}" target="_blank">${team.website}</a></p>
        <p>Club Colors: ${team.clubColors}</p>
        <h4>Current Competitions:</h4>
    `;

    team.runningCompetitions.forEach(competition => {
        teamInfo.innerHTML += `<p>${competition.name} (${competition.code})</p>`;
    });

    teamSection.appendChild(teamInfo);

    // You can also display squad, staff, and other details by iterating over the respective arrays in the team data
}
