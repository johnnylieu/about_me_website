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

        // 1) Sort by date descending (newest first)
        data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

        // 2) Filter out events from 'johnnylieu/github-activity'
        const filteredEvents = data.filter(
            (event) => event.repo !== "johnnylieu/github-activity"
        );

        // 3) Check if we have any events left
        if (filteredEvents.length === 0) {
            activityDiv.innerHTML =
                "<p>No recent activity found❣️ What should I build❔ 🤔🧑🏽‍💻</p>";
            return;
        }

        // 4) Render up to the first 5 events (now actually the newest 5)
        activityDiv.innerHTML =
            filteredEvents
                .slice(0, 5)
                .map((event) => {
                    const repoUrl = `https://github.com/${event.repo}`;
                    const eventTime = new Date(
                        event.created_at
                    ).toLocaleString();

                    return `
                        <div class="event">
                            <p>
                                <small>${eventTime}</small> - 
                                <strong>${event.type}</strong> in 
                                <a href="${repoUrl}" target="_blank">${event.repo}</a>
                            </p>
                        </div>
                    `;
                })
                .join("") +
            `
            <p class="activity-note">
              <em>These are the 5 most recent updates from my 
                  <a href="https://github.com/johnnylieu">GitHub</a> in real-time.</em>
            </p>
            `;
    } catch (error) {
        document.getElementById("activity").innerHTML =
            "<p>Error loading activity.</p>";
    }
}

document.addEventListener("DOMContentLoaded", function () {
    fetchGitHubActivity();
});

// test
