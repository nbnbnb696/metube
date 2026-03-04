const shorts = [
    { id: 1, title: "Quick CSS Tip", channel: "Design Pro", likes: "1.2K", comments: 45 },
    { id: 2, title: "JavaScript Trick", channel: "Code Master", likes: "2.5K", comments: 89 },
    { id: 3, title: "React Hook Explained", channel: "Dev Channel", likes: "3.1K", comments: 120 }
];

let currentShort = 0;

function loadShort(index) {
    if (typeof document === 'undefined') return;
    const short = shorts[index];
    const titleEl = document.getElementById('shortTitle');
    const channelEl = document.getElementById('shortChannel');
    if (titleEl) titleEl.textContent = short.title;
    if (channelEl) channelEl.textContent = short.channel;
}

function nextShort() {
    currentShort = (currentShort + 1) % shorts.length;
    loadShort(currentShort);
    return currentShort;
}

function prevShort() {
    currentShort = (currentShort - 1 + shorts.length) % shorts.length;
    loadShort(currentShort);
    return currentShort;
}

if (typeof document !== 'undefined') {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowUp') {
            prevShort();
        } else if (e.key === 'ArrowDown') {
            nextShort();
        }
    });
    loadShort(0);
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { shorts, loadShort, nextShort, prevShort, getCurrentShort: () => currentShort };
}
