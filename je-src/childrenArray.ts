import { Instance } from "./instance.js";

export class ChildrenArray<T extends ChildrenArray<T>> {
    private _parent: T | null = null;
    children: Array<T> = [];

    add(child: T) {
        if (child.parent != null) throw new Error('Child already has a parent');
        child._parent = this as unknown as T;
        this.children.push(child);
    }

    /**
     * @deprecated Use `add` instead
     */
    addChild(child: T) {
        this.add(child);
    }

    removeChild(child: T, cleanup = true) {
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