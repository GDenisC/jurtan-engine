import { Instance } from "../instance.js";

export class ButtonGroup extends Instance {
    protected _disabled = false;

    constructor() {
        super();
    }

    get disabled() {
        return this._disabled;
    }

    set disabled(value: boolean) {
        this._disabled = value;
        for (const child of this.children) {
            (child as any).disabled = value;
        }
    }
}