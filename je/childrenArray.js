import { Instance } from "./instance.js";
export class ChildrenArray {
    constructor() {
        this._parent = null;
        this.children = [];
    }
    add(child) {
        if (child.parent != null)
            throw new Error('Child already has a parent');
        child._parent = this;
        this.children.push(child);
    }
    /**
     * @deprecated Use `add` instead
     */
    addChild(child) {
        this.add(child);
    }
    removeChild(child, cleanup = true) {
        if (cleanup && child instanceof Instance) {
            child.destroy();
        }
        child._parent = null;
        this.children.splice(this.children.indexOf(child), 1);
    }
    get parent() {
        return this._parent;
    }
}
//# sourceMappingURL=childrenArray.js.map