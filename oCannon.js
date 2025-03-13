import { GameObject } from "./gameObject.js"
import { Sprite } from "./sprite.js"
import { oCannonball } from "./oCannonball.js"

export class oCannon extends GameObject {
  _angle = 45
  constructor(x, y, scale, spriteData) {
    super(x, y, scale, spriteData)
    this.baseSprite = new Sprite("img/cannon.png")
    this.originX = 0.5
    this.originY = 0.7
    this.baseOffsetX = 0
    this.baseOffsetY = -50
    this.power = 10
  }
  setAngle(angle) {
    if (angle >= 0 && angle <= 135) this._angle = angle
  }
  getAngle() {
    return this._angle
  }
  setPower(newPower) {
    this.power = Math.min(20, Math.max(1, newPower))
    return this.power
  }
  shoot(strength) {
    const turret = this.sprites[this.currentSpriteKey]
    if (!turret || !turret.loaded) return null
    const turretWidth = turret.width * this.scale
    const turretHeight = turret.height * this.scale
    const centerX = this.x + turretWidth / 2
    const centerY = this.y + turretHeight / 2
    const pivotX = centerX + this.baseOffsetX
    const pivotY = centerY + this.baseOffsetY
    const rad = this._angle * (Math.PI / 180)
    const shootOffset = 70
    const spawnX = pivotX + shootOffset * Math.sin(rad)
    const spawnY = pivotY - shootOffset * Math.cos(rad)
    const vx = 2 * strength * Math.sin(rad)
    const vy = -2 * strength * Math.cos(rad)
    return new oCannonball(spawnX, spawnY, vx, vy)
  }
  update() {
    super.update()
  }
  draw(ctx) {
    const turret = this.sprites[this.currentSpriteKey]
    if (turret && turret.loaded && this.baseSprite.loaded) {
      const turretWidth = turret.width * this.scale
      const turretHeight = turret.height * this.scale
      const centerX = this.x + turretWidth / 2
      const centerY = this.y + turretHeight / 2
      const pivotX = centerX + this.baseOffsetX
      const pivotY = centerY + this.baseOffsetY
      this.baseSprite.drawWithOrigin(ctx, pivotX, pivotY, this.scale, this._angle, this.originX, this.originY)
      turret.draw(ctx, this.x, this.y, this.scale)
    }
  }
}
