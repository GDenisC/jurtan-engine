export declare class ChildrenArray<T extends ChildrenArray<T>> {
    parent: T | null;
    children: Array<T>;
    addChild(child: T): void;
    removeChild(child: T, cleanup?: boolean): void;
}
