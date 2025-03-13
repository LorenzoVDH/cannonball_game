export class Sprite {
    constructor(imagePath) {
        this.image = new Image();
        this.loaded = false;
        this.width = 0;
        this.height = 0; 

        this.image.src = imagePath;
        this.image.onload = () => {
            this.loaded = true;
            this.width = this.image.width;
            this.height = this.image.height;
        };
    }

    _degreesToRadians(deg) {
        return (deg % 360) * (Math.PI / 180);
    }

    draw(ctx, x, y, scale, angle = 0) {
        if (!this.loaded) return;
        const width = this.width * scale;
        const height = this.height * scale;
        if (angle) {
            const angleRad = this._degreesToRadians(angle);
            ctx.save();
            ctx.translate(x + width / 2, y + height / 2);
            ctx.rotate(angleRad);
            ctx.drawImage(this.image, -width / 2, -height / 2, width, height);
            ctx.restore();
        } else {
            ctx.drawImage(this.image, x, y, width, height);
        }
    }

    drawWithOrigin(ctx, pivotWorldX, pivotWorldY, scale, angle = 0, originX = 0.5, originY = 0.5) {
        if (!this.loaded) return;
        const width = this.width * scale;
        const height = this.height * scale;
        const ox = width * originX;
        const oy = height * originY;
        const angleRad = this._degreesToRadians(angle);
        ctx.save();
        ctx.translate(pivotWorldX, pivotWorldY);
        ctx.rotate(angleRad);
        ctx.drawImage(this.image, -ox, -oy, width, height);
        ctx.restore();
    }
}
