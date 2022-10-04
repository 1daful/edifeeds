export interface IRepository {
    //setItems(collName: string, items: Record<string, any>[]): void;
    addItem(item?: Record<string, any>): void;
    addItems(param: Record<string, any>[], collName?: string): void;
    readItem(collName?: string): Promise<Record<string, any>>;
    readItems(collName?: string, params?: string[], op?: Record<string, any>): Promise<Record<string, any>[]>;
    updateItem(docId: any, param: Record<string, any>, collName?: string): void;
    deleteItem(docId: any,  collName?: string): void;
    //setChild(subPath: string, item: Record<string, any>): void;
    find(filters?: Record<string, any>, collName?: string): Promise<any>
    search(field: string, query: string, collName?: string): Promise<any>
}