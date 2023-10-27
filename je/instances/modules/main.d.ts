import { Instance } from "../instance";
export default abstract class Module {
    private _instance;
    load(instance: Instance): void;
    /**
     * You can't use it in constructor
     */
    get instance(): Instance;
}
