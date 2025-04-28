class CanvasElement {
    constructor() {
        if (this.constructor == CanvasElement) {
            throw new Error("Cannot instantiate CanvasElement.");
        }
    }
    present() {
        return 'I have a ' + this.carname;
    }
}
  
export class Ripple extends CanvasElement {
    constructor(x, y, radius, alpha) {
        super();
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.alpha = alpha;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = "rgba(255,255,255," + this.alpha + ")";
        ctx.fill();
    }

    update(objects) {
        this.radius += 3;
        this.alpha -= 0.015;
        if (this.alpha < 0)
            objects.splice(objects.indexOf(this), 1)
    }
}

export class FloatingText extends CanvasElement {
    constructor(text) {
        super();
        this.text = text;
        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * window.innerHeight;
        this.dx = Math.random() * 2 - 1;
        this.dy = Math.random() * 2 - 1;
        this.fontsize = Math.round(Math.random() * 40 + 20);
        this.alpha = Math.random() * 0.2 + 0.6;
    }

    draw(ctx) {
        ctx.font = "bold small-caps " + this.fontsize + "px \"Lexend\"";
        ctx.fillStyle = "rgba(255,255,255," + this.alpha + ")";
        ctx.fillText(this.text, this.x, this.y);
    }

    update(objects) {
        this.x += this.dx;
        this.y += this.dy;
        this.alpha -= 0.005;
        if (this.alpha < 0)
            objects.splice(objects.indexOf(this), 1)
    }
}