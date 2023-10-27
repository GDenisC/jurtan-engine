import { Instance } from "../instance";

export default abstract class Module {
    private _instance: Instance | null = null;

    load(instance: Instance) {
        this._instance = instance;
    }

    /**
     * You can't use it in constructor
     */
    get instance() {
        return this._instance!;
    }
}