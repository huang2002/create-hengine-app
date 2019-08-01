import { engine } from "./common.js";

export const menuScene = engine.createScene({
    background: '#FFF',
    fps: 1,
});

menuScene.attach(
    new HE.Text({
        content: 'Hello, world!',
    })
);
