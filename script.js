document.addEventListener('DOMContentLoaded', function () {
    // Fetch and display details of Chelsea (team ID: 61)
    fetchTeamDetails('61'); // Replace '61' with the actual team ID
});

const API_BASE_URL = 'https://api.football-data.org/v4';

function fetchTeamDetails(teamId) {
    fetch(`${API_BASE_URL}/teams/${teamId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => displayTeamDetails(data))
        .catch(error => console.error('Error fetching team details:', error));
}

function displayTeamDetails(team) {
    const teamSection = document.getElementById('latest-news');

    // Clear previous content
    teamSection.innerHTML = '';

    const teamInfo = document.createElement('article');
    teamInfo.innerHTML = `
        <h3>${team.name}</h3>
        <img src="${team.crest}" alt="${team.name} Crest" style="max-width: 200px;">
        <p><strong>Short Name:</strong> ${team.shortName}</p>
        <p><strong>Founded:</strong> ${team.founded}</p>
        <p><strong>Venue:</strong> ${team.venue}</p>
        <p><strong>Website:</strong> <a href="${team.website}" target="_blank">${team.website}</a></p>
        <p><strong>Club Colors:</strong> ${team.clubColors}</p>
        <h4>Current Competitions:</h4>
    `;

    if (team.runningCompetitions.length > 0) {
        team.runningCompetitions.forEach(competition => {
            teamInfo.innerHTML += `<p>${competition.name} (${competition.code})</p>`;
        });
    } else {
        teamInfo.innerHTML += `<p>No active competitions.</p>`;
    }

    teamSection.appendChild(teamInfo);
}
