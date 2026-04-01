import { FrequencyRails, RAILS } from './rails.js';
import { DBM } from './dbm.js';

const canvas = document.getElementById('gameCanvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const iron = new FrequencyRails(canvas);
iron.dbm = new DBM(iron);

function loop() {
    iron.update();
    iron.draw();
    
    // Minimal Runner Render
    const rx = iron.getLaneCenterX(iron.currentLane, iron.runnerY * RAILS.SCREEN_HEIGHT);
    const ry = iron.runnerY * RAILS.SCREEN_HEIGHT;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#0f0';
    ctx.fillRect(rx - 15, ry - 25, 30, 50);

    requestAnimationFrame(loop);
}

// Simple Touch Control for Mobile
window.addEventListener('touchstart', (e) => {
    const touchX = e.touches[0].clientX;
    if (touchX < window.innerWidth / 2) {
        if (iron.currentLane > 0) iron.currentLane--;
    } else {
        if (iron.currentLane < 4) iron.currentLane++;
    }
    iron.dbm.execute('j'); // Trigger Juke Glyph
});

loop();
