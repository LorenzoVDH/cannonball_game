import { Sprite } from "./sprite.js"

export class GameObject {
  constructor(x, y, scale, spriteData) {
    this.x = x
    this.y = y
    this.scale = scale
    this.sprites = {}
    this.currentSpriteKey = null
    spriteData.forEach(({ name, path }, index) => {
      this.sprites[name] = new Sprite(path)
      if (index === 0) this.currentSpriteKey = name
    })
  }
  update() {}
  draw(ctx) {
    const currentSprite = this.sprites[this.currentSpriteKey]
    if (currentSprite && currentSprite.loaded)
      ctx.drawImage(currentSprite.image, this.x, this.y, currentSprite.width * this.scale, currentSprite.height * this.scale)
  }
}
