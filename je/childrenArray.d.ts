export declare class ChildrenArray<T extends ChildrenArray<T>> {
    private _parent;
    children: Array<T>;
    add(child: T): void;
    /**
     * @deprecated Use `add` instead
     */
    addChild(child: T): void;
    removeChild(child: T, cleanup?: boolean): void;
    get parent(): T | null;
}
