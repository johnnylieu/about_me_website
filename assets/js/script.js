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
                displayedText + `<span class="cursor">|</span>`; // Ensures cursor stays at the end

            if (letterIndex < text[paragraphIndex].length) {
                letterIndex++;
                setTimeout(typeEffect, 50); // Typing speed
            } else {
                letterIndex = 0;
                paragraphIndex++;
                setTimeout(typeEffect, 500); // Pause before next paragraph
            }
        }
    }

    typeEffect();
});

fetchGitHubActivity();
