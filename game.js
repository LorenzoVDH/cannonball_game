const TARGET_HEIGHT_MAX = 720;
const FIXED_POWER = 10;

import { oCannon } from "./oCannon.js";
import { oTarget } from "./oTarget.js";
import { addDataPoint } from "./trainingGraph.js";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const angleSlider = document.getElementById("angleSlider");
const angleDisplay = document.getElementById("angleDisplay");

const weightAngleSlider = document.getElementById("weightAngleSlider");
const weightAngleDisplay = document.getElementById("weightAngleDisplay");

const targetHeightSlider = document.getElementById("targetHeightSlider");
const targetHeightDisplay = document.getElementById("targetHeightDisplay");
targetHeightDisplay.textContent = targetHeightSlider.value;

const cannonSprites = [{ name: "cannon_base", path: "img/cannon_base.png" }];
const cannon = new oCannon(130, 550, 0.4, cannonSprites);
let target = oTarget.spawn(canvas.width, canvas.height, 0.4);

const randomAngle = Math.random() * 135;
cannon.setAngle(randomAngle);
angleSlider.value = randomAngle;
angleDisplay.textContent = randomAngle.toFixed(2);

let cannonball = null;

function computeControls() {
    const weightAngle = parseFloat(weightAngleSlider.value);
    const targetHeight = parseFloat(targetHeightSlider.value);
    const normalizedTarget = targetHeight / TARGET_HEIGHT_MAX;
    const computedAngle = weightAngle * 135 + 0.5 * normalizedTarget * 100;
    const computedPower = FIXED_POWER;
    angleDisplay.textContent = computedAngle.toFixed(2);
    angleSlider.value = computedAngle;
    weightAngleDisplay.textContent = weightAngle.toFixed(3);
    return { computedAngle, computedPower };
}

[weightAngleSlider, targetHeightSlider].forEach(slider => {
    slider.addEventListener('input', () => {
        const { computedAngle, computedPower } = computeControls();
        cannon.setAngle(computedAngle);
        cannon.setPower(computedPower);
        if (slider === targetHeightSlider) targetHeightDisplay.textContent = targetHeightSlider.value;
    });
});

let keys = { shoot: false };
document.addEventListener('keydown', e => { if (e.key === ' ') keys.shoot = true; });
document.addEventListener('keyup', e => { if (e.key === ' ') keys.shoot = false; });

function update() {
  const { computedAngle, computedPower } = computeControls();
  const targetHeight = parseFloat(targetHeightSlider.value);
  cannon.setAngle(computedAngle);
  cannon.setPower(computedPower);
  if (keys.shoot && !cannonball) {
    cannonball = cannon.shoot(computedPower);
  }
  cannon.update();
  if (cannonball) {
    cannonball.update();
    if (target.active && target.checkCollision(cannonball)) {
        target.destroy();
        console.log("Target hit!");
        addDataPoint(computedAngle, targetHeight);
        cannonball = null;
    }
    else if (cannonball.x > target.x + (target.sprite.width * target.scale) / 2) {
        console.log("Shot processed (miss).");
        addDataPoint(computedAngle, targetHeight);
        cannonball = null;
    }
    if (cannonball && cannonball.y > canvas.height) {
      console.log("Shot out of bounds.");
      addDataPoint(computedAngle, targetHeight);
      cannonball = null;
    }
  }
  if (!target.active) {
    target = oTarget.spawn(canvas.width, canvas.height, 0.4);
    targetHeightSlider.value = target.y;
    targetHeightDisplay.textContent = target.y;
  }
  target.update();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (target.active) target.draw(ctx);
  if (cannonball) cannonball.draw(ctx);
  cannon.draw(ctx);
}

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

gameLoop();