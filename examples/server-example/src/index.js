import { Canvas } from '../je/index.js';
import { Socket } from '../je/advanced/index.js';

const cv = new Canvas({
    width: 1366,
    height: 768,
    ratio: true
});

const socket = new Socket('ws://localhost:3000');

cv.start();
socket.connect();