let tabChangeCount = 0;
let tabChangeList = [];

function startQuiz() {
    // Request full-screen mode
    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen();
    }

    document.getElementById('question-container').classList.remove('hide');
    document.getElementById('tab-warning').classList.add('hide');
}

document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Record the tab change with timestamp
        tabChangeCount++;
        const timestamp = new Date().toLocaleTimeString();
        const tabChangeMessage = `Tab Change ${tabChangeCount}: Left at ${timestamp}`;
        
        // Push the new message to the tabChangeList array
        tabChangeList.push(tabChangeMessage);

        // Show warning with updated count
        document.getElementById('tab-warning').classList.remove('hide');
        document.getElementById('tab-warning').innerText = `Warning: You switched tabs ${tabChangeCount} time(s) during the quiz!`;

        // Update the log display
        displayTabChangeList();
    }
});

// Function to display tab changes in the warning section
function displayTabChangeList() {
    const listContainer = document.getElementById('tab-change-log');
    listContainer.innerHTML = '';  // Clear previous list items
    tabChangeList.forEach(change => {
        const listItem = document.createElement('p');
        listItem.textContent = change;
        listContainer.appendChild(listItem);
    });
}

// Event listener to exit full-screen
document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement) {
        document.getElementById('question-container').classList.add('hide');
        alert("You exited full-screen mode. Please re-enter full screen to continue.");
    }
});
