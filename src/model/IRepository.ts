export interface IRepository {
    //setItems(collName: string, items: Record<string, any>[]): void;
    addItem(item?: Record<string, any>): Promise<Record<string, any>>;
    addItems(param: Record<string, any>[], collName?: string): void;
    readItem(collName?: string): Promise<Record<string, any>>;
    readItems(collNane?: string, params?: string[], op?: Record<string, any>): Promise<Record<string, any>[]>;
    updateItem(docId: any, param: Record<string, any>, collName?: string): void;
    deleteItem(docId: any,  collName?: string): void;
    //setChild(subPath: string, item: Record<string, any>): void;
    find(params?: string[], filters?: Record<string, any>): void
}