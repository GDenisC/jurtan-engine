export default class Module {
    constructor() {
        this._instance = null;
    }
    load(instance) {
        this._instance = instance;
    }
    /**
     * You can't use it in constructor
     */
    get instance() {
        return this._instance;
    }
}
//# sourceMappingURL=main.js.map