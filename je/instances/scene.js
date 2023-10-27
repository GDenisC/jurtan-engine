import { Instance } from "./instance";
/**
 * A scene is a collection of instances
 * Scene always is a child of `Canvas`
 */
export class Scene extends Instance {
    constructor() {
        super();
        this.addToMain();
    }
}
//# sourceMappingURL=scene.js.map