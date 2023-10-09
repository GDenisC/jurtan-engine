import { Canvas } from '../je/index.js';
import MainMenu from './mainmenu.js';
// font: https://github.com/IdreesInc/Minecraft-Font

const cv = new Canvas({
    width: 1366,
    height: 768,
    ratio: true
});

// WARN: MADE IN VERSION BETA v1.1.1, UPDATED TO v1.2

new MainMenu();

cv.start();