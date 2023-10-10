import { Canvas } from '../je/index.js';
import { Request } from '../je/advanced/index.js';

const cv = new Canvas({
    width: 1366,
    height: 768
});

Request.get('http://httpbin.org/get').then(data => {
    console.log(data);
});

cv.start();