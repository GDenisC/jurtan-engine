import { Instance } from "./instance.js";

/**
 * A scene is a collection of instances
 * Scene always is a child of Canvas
 */
export class Scene extends Instance {
    constructor() {
        super();
        this.addToMain();
    }
}