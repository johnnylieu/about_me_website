// script.js

// 1) TYPING EFFECT
document.addEventListener("DOMContentLoaded", function () {
    const text = [
        "I'm a computer science student with a passion for building innovative and efficient software solutions.",
    ];
    const typingContainer = document.getElementById("typing-text");
    let paragraphIndex = 0;
    let letterIndex = 0;

    function typeEffect() {
        if (paragraphIndex < text.length) {
            let displayedText = text[paragraphIndex].slice(0, letterIndex);
            typingContainer.innerHTML =
                displayedText + `<span class="cursor">|</span>`;

            if (letterIndex < text[paragraphIndex].length) {
                letterIndex++;
                setTimeout(typeEffect, 50); // typing speed
            } else {
                letterIndex = 0;
                paragraphIndex++;
                setTimeout(typeEffect, 500); // pause before next paragraph
            }
        }
    }
    typeEffect();
});

// 2) GITHUB ACTIVITY
async function fetchGitHubActivity() {
    try {
        const response = await fetch(
            "https://raw.githubusercontent.com/johnnylieu/github-activity/main/github-activity.json"
        );
        const data = await response.json();
        const activityDiv = document.getElementById("activity");

        // Filter out events from 'johnnylieu/github-activity'
        const filteredEvents = data.filter(
            (event) => event.repo !== "johnnylieu/github-activity"
        );

        if (filteredEvents.length === 0) {
            activityDiv.innerHTML =
                "<p>No recent activity found❣️ What should I build❔ 🤔🧑🏽‍💻</p>";
            return;
        }

        activityDiv.innerHTML =
            filteredEvents
                .slice(0, 5)
                .map((event) => {
                    // Build the actual GitHub repo link
                    const repoUrl = `https://github.com/${event.repo}`;
                    return `
              <div class="event">
                <p><strong>${event.type}</strong> in 
                  <a href="${repoUrl}" target="_blank">${event.repo}</a>
                </p>
                <p><small>${new Date(
                    event.created_at
                ).toLocaleString()}</small></p>
              </div>
            `;
                })
                .join("") +
            `
          <p class="activity-note">
            <em>These are the 5 most recent updates from my GitHub, updated in real-time.</em>
          </p>
        `;
    } catch (error) {
        document.getElementById("activity").innerHTML =
            "<p>Error loading activity.</p>";
    }
}

// Make sure fetchGitHubActivity is called
document.addEventListener("DOMContentLoaded", function () {
    fetchGitHubActivity();
});
