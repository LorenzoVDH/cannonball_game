import { GameObject } from "./gameObject.js"
import { Sprite } from "./sprite.js"

export class oTarget extends GameObject {
  constructor(x, y, scale, spriteData) {
    super(x, y, scale, spriteData)
    this.sprite = new Sprite(spriteData[0]?.path || "img/target.png")
    this.active = true
  }
  static spawn(canvasWidth, canvasHeight, scale = 1) {
    const x = Math.floor(canvasWidth * 0.75)
    const y = Math.floor(Math.random() * (canvasHeight - 128))
    return new oTarget(x, y, scale, [{ name: "target", path: "img/target.png" }])
  }
  draw(ctx) {
    if (this.active && this.sprite.loaded)
      this.sprite.draw(ctx, this.x, this.y, this.scale)
  }
  checkCollision(cannonball) {
    if (!cannonball) return false
    const centerX = this.x + (this.sprite.width * this.scale) / 2
    const centerY = this.y + (this.sprite.height * this.scale) / 2
    const dx = centerX - cannonball.x
    const dy = centerY - cannonball.y
    return Math.hypot(dx, dy) < ((this.sprite.width * this.scale) / 2) * 0.3 + (cannonball.radius || 5)
  }
  destroy() {
    this.active = false
  }
}
