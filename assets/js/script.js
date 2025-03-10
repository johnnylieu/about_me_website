async function fetchGitHubActivity() {
    try {
        const response = await fetch(
            "https://raw.githubusercontent.com/johnnylieu/github-activity/main/github-activity.json"
        );
        const data = await response.json();
        const activityDiv = document.getElementById("activity");

        if (data.length === 0) {
            activityDiv.innerHTML =
                "<p>No recent activity found❣️ What should I build❔ 🤔🧑🏽‍💻</p>";
            return;
        }

        activityDiv.innerHTML = data
            .slice(0, 5)
            .map(
                (event) => `
            <div class="event">
                <p><strong>${event.type}</strong> in <a href="${
                    event.url
                }" target="_blank">${event.repo}</a></p>
                <p><small>${new Date(
                    event.created_at
                ).toLocaleString()}</small></p>
            </div>
        `
            )
            .join("");
    } catch (error) {
        document.getElementById("activity").innerHTML =
            "<p>Error loading activity.</p>";
    }
}

fetchGitHubActivity();
