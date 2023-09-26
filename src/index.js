import { Canvas } from '../je/index.js';
import MainMenu from './mainmenu.js';
// font: https://github.com/IdreesInc/Minecraft-Font

const cv = new Canvas({
    width: 1366,
    height: 768,
    ratio: true
});

new MainMenu();

cv.start();