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

    // Show quiz questions and hide warnings
    document.getElementById('question-container').classList.remove('hide');
    document.getElementById('tab-warning').classList.add('hide');
}

// Event listener for tab switching detection
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Record the tab change with timestamp
        tabChangeCount++;
        const timestamp = new Date().toLocaleTimeString();
        const tabChangeMessage = `Tab Change ${tabChangeCount}: Left at ${timestamp}`;
        
        // Add message to tabChangeList array
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
    listContainer.innerHTML = '';  // Clear previous log entries
    tabChangeList.forEach(change => {
        const listItem = document.createElement('p');
        listItem.textContent = change;
        listContainer.appendChild(listItem);
    });
}

// Event listener to handle exiting full-screen
document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement) {
        document.getElementById('question-container').classList.add('hide');
        alert("You exited full-screen mode. Please re-enter full screen to continue the quiz.");
    }
});

// Disable right-click, copy-paste, and keyboard shortcuts (Ctrl+C, Ctrl+V)
document.addEventListener('contextmenu', event => event.preventDefault());
document.addEventListener('copy', event => event.preventDefault());
document.addEventListener('keydown', event => {
    if (event.ctrlKey && (event.key === 'c' || event.key === 'v')) {
        event.preventDefault();
    }
    // Detect "Print Screen" key press
    if (event.key === "PrintScreen" || event.keyCode === 44) {
        alert("Screenshots are not allowed during the quiz!");
        // Optional: Clear the clipboard to prevent saving the screenshot
        navigator.clipboard.writeText(""); // Requires HTTPS
    }
});

// Detect Developer Tools open event (simple detection)
window.addEventListener('devtoolschange', event => {
    if (event.detail.isOpen) {
        alert("Developer tools are not allowed during the quiz.");
    }
});

// Polyfill for detecting Developer Tools (add devtools-detect library)
(function() {
    const devtools = { isOpen: false };
    const threshold = 160;

    const check = () => {
        const widthThreshold = window.outerWidth - window.innerWidth > threshold;
        const heightThreshold = window.outerHeight - window.innerHeight > threshold;
        if (!(heightThreshold && widthThreshold) && ((widthThreshold && heightThreshold) || devtools.isOpen)) {
            if (!devtools.isOpen) {
                alert("Developer tools are not allowed during the quiz.");
            }
            devtools.isOpen = true;
        } else devtools.isOpen = false;
    };
    
    setInterval(check, 1000);
})();
