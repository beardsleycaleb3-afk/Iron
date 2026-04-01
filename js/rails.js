export const RAILS = {
    NUM_LANES: 5,
    HORIZON_Y: 100,
    SCREEN_HEIGHT: window.innerHeight,
    SCREEN_WIDTH: window.innerWidth,
    GROUNDING: 14.4
};

export class FrequencyRails {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.currentLane = 2;
        this.runnerY = 0.85;
        this.speed = 1.0;
        this.frame = 0;
        this.trails = [];
        this.obstacles = [];
        this.gridPoints = this.initGrid();
    }

    initGrid() {
        let pts = [];
        for (let i = 0; i < 67; i++) {
            pts.push({ lane: i % 5, y: (i / 67) * RAILS.SCREEN_HEIGHT, active: false });
        }
        return pts;
    }

    getLaneCenterX(lane, y) {
        const progress = (y - RAILS.HORIZON_Y) / (RAILS.SCREEN_HEIGHT - RAILS.HORIZON_Y);
        const widthAtY = RAILS.SCREEN_WIDTH * progress;
        const startX = (RAILS.SCREEN_WIDTH - widthAtY) / 2;
        return startX + (lane + 0.5) * (widthAtY / RAILS.NUM_LANES);
    }

    generateSteak(x, y, w, a) {
        this.trails.push({ x, y, width: w, alpha: a, life: 28 });
    }

    update() {
        this.frame++;
        this.trails = this.trails.filter(t => {
            t.alpha *= 0.144; // 14.4 Law
            return t.alpha > 0.05;
        });
        // Obstacle and AI logic would iterate here
    }

    draw() {
        this.ctx.clearRect(0, 0, RAILS.SCREEN_WIDTH, RAILS.SCREEN_HEIGHT);
        // Render Steaks
        this.trails.forEach(t => {
            this.ctx.globalAlpha = t.alpha;
            this.ctx.fillStyle = '#0af';
            this.ctx.fillRect(t.x - t.width/2, t.y, t.width, 10);
        });
        this.ctx.globalAlpha = 1.0;
    }
}
