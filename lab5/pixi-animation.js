const PIXI = require('pixi.js');

const app = new PIXI.Application({
    width: 800,
    height: 600,
    backgroundColor: 0x1099bb
});
document.body.appendChild(app.view);

const rect = new PIXI.Graphics();
rect.beginFill(0xFF0000);
rect.drawRect(0, 0, 100, 100);
rect.endFill();
rect.x = app.screen.width / 2;
rect.y = app.screen.height / 2;
rect.pivot.set(50, 50);

app.stage.addChild(rect);

app.ticker.add((delta) => {
    rect.rotation += 0.01 * delta;
});