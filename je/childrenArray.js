import { Instance } from "./instance.js";
export class ChildrenArray {
    constructor() {
        this.parent = null;
        this.children = [];
    }
    addChild(child) {
        if (child.parent != null)
            throw new Error('Child already has a parent');
        child.parent = this;
        this.children.push(child);
    }
    removeChild(child, cleanup = true) {
        if (cleanup && child instanceof Instance) {
            child.destroy();
        }
        child.parent = null;
        this.children.splice(this.children.indexOf(child), 1);
    }
}
//# sourceMappingURL=childrenArray.js.map