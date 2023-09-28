import { Instance } from "../instance.js";
export class ButtonGroup extends Instance {
    constructor() {
        super();
        this._disabled = false;
    }
    get disabled() {
        return this._disabled;
    }
    set disabled(value) {
        this._disabled = value;
        for (const child of this.children) {
            child.disabled = value;
        }
    }
}
//# sourceMappingURL=buttonGroup.js.map