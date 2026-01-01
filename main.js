// 1. Initial Data Structure
let gameState = {
    lvl: 1,
    writingXP: 10,
    healthXP: 30,
    activities: [
        { time: "System", text: "Welcome, Hunter. System initialized." }
    ]
};

// 2. Load Data from Phone Storage on Startup
window.onload = function() {
    const saved = localStorage.getItem('soloLevelingData');
    if (saved) {
        gameState = JSON.parse(saved);
        updateUI();
    }
};

// 3. Logic to Add XP and Level Up
function addXP(skill) {
    const xpGain = 10;
    
    if (skill === 'writing') {
        gameState.writingXP += xpGain;
        addLog(`Gained ${xpGain} XP in Writing`);
    } else if (skill === 'health') {
        gameState.healthXP += xpGain;
        addLog(`Gained ${xpGain} XP in Health`);
    }

    // Simple Level Up: Every 100 total XP = +1 Level
    gameState.lvl = Math.floor((gameState.writingXP + gameState.healthXP) / 100) + 1;
    
    updateUI();
    saveData();
}

// 4. Update the Screen (UI)
function updateUI() {
    // Update Text
    document.getElementById('p-lvl').innerText = gameState.lvl;
    
    // Update Progress Bars (Max 100 for this example)
    document.getElementById('writing-bar').style.width = (gameState.writingXP % 100) + "%";
    document.getElementById('health-bar').style.width = (gameState.healthXP % 100) + "%";

    // Refresh Activity Log
    const logContainer = document.getElementById('log');
    logContainer.innerHTML = ''; // Clear old log
    gameState.activities.forEach(item => {
        const p = document.createElement('p');
        p.className = 'log-entry';
        p.innerHTML = `<small>${item.time}:</small> ${item.text}`;
        logContainer.prepend(p); // Newest at the top
    });
}

// 5. Helper: Add to Activity Log
function addLog(message) {
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    gameState.activities.push({ time: now, text: message });
    
    // Keep only the last 5 activities to save space
    if (gameState.activities.length > 5) {
        gameState.activities.shift();
    }
}

// 6. Save to Local Device Storage
function saveData() {
    localStorage.setItem('soloLevelingData', JSON.stringify(gameState));
}
