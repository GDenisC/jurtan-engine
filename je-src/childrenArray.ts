import { Instance } from "./instance.js";

export class ChildrenArray<T extends ChildrenArray<T>> {
    parent: T | null = null;
    children: Array<T> = [];

    addChild(child: T) {
        if (child.parent != null) throw new Error('Child already has a parent');
        child.parent = this as unknown as T;
        this.children.push(child);
    }

    removeChild(child: T, cleanup = true) {
        if (cleanup && child instanceof Instance) {
            child.destroy();
        }
        child.parent = null;
        this.children.splice(this.children.indexOf(child), 1);
    }
}