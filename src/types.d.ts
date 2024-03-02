

type Action = "get_ids" | "filter" | "get_items" | "get_fields";
export type Field = "brand" | "price" | "product";

export type RequestBody<T> = {
    action: Action;
    params: T;
}

export type ResponseData<T> = {
    result: T;
}

export interface PaginationType {
    offset: number;
    limit: number;
}

export interface ItemType {
    id: string;
    brand?: string | null;
    price?: number | null;
    product?: string;
}