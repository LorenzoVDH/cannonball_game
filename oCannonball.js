import { Sprite } from "./sprite.js"

export class oCannonball {
  constructor(x, y, vx, vy) {
    this.x = x
    this.y = y
    this.vx = vx
    this.vy = vy
    this.gravity = 0.2
    this.sprite = new Sprite("img/cannon_ball.png")
  }
  update() {
    this.x += this.vx
    this.y += this.vy
    this.vy += this.gravity
  }
  draw(ctx) {
    if (this.sprite.loaded)
      this.sprite.draw(ctx, this.x - this.sprite.width / 4, this.y - this.sprite.height / 4, 0.5)
  }
}
