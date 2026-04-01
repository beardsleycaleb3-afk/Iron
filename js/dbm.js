export class DBM {
    constructor(rails) {
        this.rails = rails;
        this.accumulator = 0;
        this.stack = [];
    }

    execute(strand) {
        if (!strand) return;
        const glyphs = strand.match(/[a-zA-Z0-9()+\-]/g) || [];
        for (const glyph of glyphs) {
            switch (glyph) {
                case 'o1': this.accumulator = 1; break;
                case 'O9': this.accumulator ^= 9; break; // Mirror reflection
                case 'b0': this.triggerShunt(); break;   // Combat Shunt
                case 't': this.rails.triggerAbility('turbo'); break;
                case 'j': this.rails.triggerAbility('juke'); break;
                case 's': this.rails.triggerAbility('spin'); break;
                case '0': this.accumulator = 0; this.stack = []; break;
            }
        }
    }

    triggerShunt() {
        this.rails.speed *= 0.65;
        this.rails.generateSteak(
            this.rails.getLaneCenterX(this.rails.currentLane, this.rails.runnerY * 600),
            this.rails.runnerY * 600, 55, 0.85
        );
    }
}
